// =================================================================
//  LIVE TEASER  —  a small WebGL loss landscape for teaching cards
//  -----------------------------------------------------------------
//  Mounts on any element carrying [data-live-teaser]. The <img> already
//  inside stays as the poster/fallback and is hidden once the first
//  frame draws, so cards degrade gracefully with no WebGL and no JS.
//
//  Deliberately cheap: a coarse grid, capped DPR, 30 fps, and the loop
//  is parked whenever the card is off-screen or the tab is hidden.
//  The surface undulates on a periodic function (no solver, no state);
//  hovering nudges the camera.
// =================================================================
(function () {
  var DOM_X = 9, DOM_Y = 4;

  function mount(host) {
    if (host.__liveTeaser) return;      // renderers may re-run
    host.__liveTeaser = true;
    var img = host.querySelector('img');
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .5s ease';
    canvas.setAttribute('aria-hidden', 'true');
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.appendChild(canvas);

    var gl;
    try {
      gl = canvas.getContext('webgl', {antialias: true, alpha: false})
        || canvas.getContext('experimental-webgl', {antialias: true, alpha: false});
    } catch (e) { return; }
    if (!gl) return;

    // ---------------------------------------------------- terrain
    function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;var t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
    var rnd = mulberry32((Math.random() * 4294967296) >>> 0), B = [];
    for (var bi = 0; bi < 70; bi++)
      B.push(-9.5 + rnd()*19, -4.5 + rnd()*9, 0.35 + rnd()*0.70, 0.30 + rnd()*0.55,
             (0.9 + rnd()*1.7) * (rnd() < 0.52 ? -1 : 1), rnd()*Math.PI);

    var NX = 150, NY = 74, N = NX * NY;
    var xs = new Float32Array(NX), ys = new Float32Array(NY);
    for (var i = 0; i < NX; i++) xs[i] = -DOM_X + 2*DOM_X*i/(NX-1);
    for (var j = 0; j < NY; j++) ys[j] = -DOM_Y + 2*DOM_Y*j/(NY-1);

    var base = new Float32Array(N);
    for (var j2 = 0; j2 < NY; j2++) { var y = ys[j2];
      for (var i2 = 0; i2 < NX; i2++) { var x = xs[i2], z = 0;
        for (var b = 0; b < 70; b++) { var o = b*6;
          var ct = Math.cos(B[o+5]), st = Math.sin(B[o+5]);
          var dx = x - B[o], dy = y - B[o+1];
          var xr = dx*ct + dy*st, yr = -dx*st + dy*ct;
          z += B[o+4] * Math.exp(-(xr*xr/(2*B[o+2]*B[o+2]) + yr*yr/(2*B[o+3]*B[o+3])));
        }
        z += 0.22*Math.sin(1.7*x+0.5*y)*Math.cos(2.1*y-0.3*x);
        z += 0.11*Math.sin(3.9*x-1.1*y)*Math.cos(3.4*y+0.7*x);
        z += 0.05*Math.sin(7.7*x+2.6*y)*Math.cos(6.9*y);
        base[j2*NX+i2] = z;
      }}
    var mn = Infinity; for (var k = 0; k < N; k++) if (base[k] < mn) mn = base[k];
    for (var k2 = 0; k2 < N; k2++) base[k2] -= mn;
    var ZMAX = 0; for (var k3 = 0; k3 < N; k3++) if (base[k3] > ZMAX) ZMAX = base[k3];
    var SX = 4.2/(2*DOM_X), SY = 1.9/(2*DOM_Y), SZ = 0.80/ZMAX;

    // periodic undulation: no solver, no per-frame state to go unstable
    var WV = [[0.40, 0.62, 0.35, 0.0, 0.62],
              [0.28,-0.44, 0.71, 1.7, 0.91],
              [0.18, 0.95,-0.28, 3.1, 1.33]];

    var aXY = new Float32Array(N*2), aH = new Float32Array(N), aNn = new Float32Array(N*3);
    var hgt = new Float32Array(N);
    for (var j3 = 0; j3 < NY; j3++) for (var i3 = 0; i3 < NX; i3++) {
      aXY[(j3*NX+i3)*2] = xs[i3]; aXY[(j3*NX+i3)*2+1] = ys[j3]; }
    var dxu = xs[1]-xs[0], dyu = ys[1]-ys[0];

    function setTime(t) {
      for (var j = 0; j < NY; j++) { var y = ys[j], row = j*NX;
        for (var i = 0; i < NX; i++) { var x = xs[i], d = 0;
          for (var w = 0; w < WV.length; w++) { var W = WV[w];
            d += W[0]*Math.sin(W[4]*t + W[1]*x + W[2]*y + W[3]); }
          hgt[row+i] = base[row+i] + d;
        }}
      aH.set(hgt);
      for (var jj = 0; jj < NY; jj++) { var r2 = jj*NX;
        var jm = (jj > 0 ? r2-NX : r2), jp = (jj < NY-1 ? r2+NX : r2);
        var fy = (jj > 0 && jj < NY-1) ? 2 : 1;
        for (var ii = 0; ii < NX; ii++) { var id = r2+ii;
          var im = (ii > 0 ? id-1 : id), ip = (ii < NX-1 ? id+1 : id);
          var fx = (ii > 0 && ii < NX-1) ? 2 : 1;
          var ddx = (hgt[ip]-hgt[im])/(fx*dxu)*(SZ/SX);
          var ddy = (hgt[jp+ii]-hgt[jm+ii])/(fy*dyu)*(SZ/SY);
          var inv = 1/Math.sqrt(ddx*ddx+ddy*ddy+1);
          aNn[id*3] = -ddx*inv; aNn[id*3+1] = -ddy*inv; aNn[id*3+2] = inv;
        }}
    }

    var idx = [];
    for (var jr = 0; jr < NY-1; jr++) for (var ir = 0; ir < NX-1; ir++) {
      var a0 = jr*NX+ir; idx.push(a0, a0+NX, a0+1, a0+1, a0+NX, a0+NX+1); }
    var idxArr = new Uint16Array(idx);   // 150x74 keeps us under 65535 verts

    var VS = ['attribute vec2 aXY; attribute float aH; attribute vec3 aN;',
      'uniform vec2 uS; uniform float uSZ,uAz,uEl,uDepth;',
      'uniform vec2 uHalf,uPan,uDom,uEdge;',
      'varying float vT; varying vec3 vN; varying float vF;',
      'void main(){',
      ' float ex=clamp((uDom.x-abs(aXY.x))/uEdge.x,0.0,1.0);',
      ' float ey=clamp((uDom.y-abs(aXY.y))/uEdge.y,0.0,1.0);',
      ' float f=ex*ey; f=f*f*(3.0-2.0*f); vF=f;',
      ' float X=aXY.x*uS.x,Y=aXY.y*uS.y,Z=aH*uSZ*f;',
      ' float ca=cos(uAz),sa=sin(uAz),ce=cos(uEl),se=sin(uEl);',
      ' float Xc=-X*sa+Y*ca; float d=X*ca+Y*sa;',
      ' float Yc=-d*se+Z*ce; float Zc=d*ce+Z*se;',
      ' vT=clamp(aH*uSZ/0.80,0.0,1.0); vN=aN;',
      ' gl_Position=vec4((Xc-uPan.x)/uHalf.x,(Yc-uPan.y)/uHalf.y,-Zc/uDepth,1.0);}'].join('\n');
    var FS = ['precision mediump float;',
      'varying float vT; varying vec3 vN; varying float vF;',
      'uniform vec3 uLight,uBG; uniform vec2 uShade;',
      'vec3 ramp(float t){',
      ' vec3 c0=vec3(0.1059,0.0431,0.2275),c1=vec3(0.2392,0.0706,0.4078);',
      ' vec3 c2=vec3(0.4196,0.1137,0.5020),c3=vec3(0.7020,0.1725,0.4078);',
      ' vec3 c4=vec3(0.8902,0.3333,0.2627),c5=vec3(0.9686,0.6275,0.1255);',
      ' vec3 c6=vec3(1.0,0.9059,0.6392); float s=t*6.0; vec3 c=c0;',
      ' c=mix(c,c1,clamp(s,0.0,1.0)); c=mix(c,c2,clamp(s-1.0,0.0,1.0));',
      ' c=mix(c,c3,clamp(s-2.0,0.0,1.0)); c=mix(c,c4,clamp(s-3.0,0.0,1.0));',
      ' c=mix(c,c5,clamp(s-4.0,0.0,1.0)); c=mix(c,c6,clamp(s-5.0,0.0,1.0));',
      ' return c;}',
      'void main(){ vec3 bs=ramp(vT); vec3 n=normalize(vN);',
      ' float lam=max(dot(n,normalize(uLight)),0.0);',
      ' float it=clamp((lam-uShade.x)/max(uShade.y-uShade.x,1e-3),0.0,1.0);',
      ' vec3 col=2.0*it*bs+(1.0-2.0*it)*bs*bs;',
      ' col=mix(uBG,col,vF);',
      ' gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);}'].join('\n');

    function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o);
      return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    function U(n) { return gl.getUniformLocation(prog, n); }
    var locXY = gl.getAttribLocation(prog, 'aXY'),
        locH  = gl.getAttribLocation(prog, 'aH'),
        locN  = gl.getAttribLocation(prog, 'aN');
    var bXY = gl.createBuffer(), bH = gl.createBuffer(),
        bN = gl.createBuffer(), bI = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bXY); gl.bufferData(gl.ARRAY_BUFFER, aXY, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bI); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idxArr, gl.STATIC_DRAW);
    gl.enable(gl.DEPTH_TEST); gl.clearColor(1, 1, 1, 1);
    gl.uniform2f(U('uS'), SX, SY); gl.uniform1f(U('uSZ'), SZ);
    gl.uniform3f(U('uLight'), -0.700, 0.405, 0.588);
    gl.uniform1f(U('uDepth'), 4.0); gl.uniform2f(U('uShade'), 0.0, 0.70);
    gl.uniform2f(U('uDom'), DOM_X, DOM_Y); gl.uniform2f(U('uEdge'), 2.6, 1.5);
    gl.uniform3f(U('uBG'), 1, 1, 1);
    var uAz = U('uAz'), uEl = U('uEl'), uHalf = U('uHalf'), uPan = U('uPan');

    // Frame by the VERTICAL extent and derive the horizontal half-width, so the
    // landscape fills any card aspect (like object-fit: cover) while keeping the
    // same horizontal stretch as the course page. Fixing HALFX instead makes the
    // terrain shrink to nothing on a card that is relatively tall.
    var HALFY_FIX = 1.16, ANISO = 2.00;
    var az = -62, el = 26, azT = 0, elT = 0, cw = 0, ch = 0;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.round(host.clientWidth * dpr), h = Math.round(host.clientHeight * dpr);
      if (!w || !h) return false;
      if (w !== cw || h !== ch) {
        cw = w; ch = h; canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uHalf, HALFY_FIX * (w / h) / ANISO, HALFY_FIX);
        gl.uniform2f(uPan, 0.0, 0.243);
      }
      return true;
    }

    host.addEventListener('pointermove', function (ev) {
      var r = host.getBoundingClientRect();
      azT = (((ev.clientX - r.left) / r.width) * 2 - 1) * 16;
      elT = -((1 - ((ev.clientY - r.top) / r.height) * 2)) * 7;
    });
    host.addEventListener('pointerleave', function () { azT = 0; elT = 0; });

    var visible = true, running = false, last = 0, acc = 0, T = 0, shown = false;
    var STEP = 1 / 30;                       // the card does not need 60 fps
    if ('IntersectionObserver' in window)
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; wake(); },
        {threshold: 0.01}).observe(host);
    document.addEventListener('visibilitychange', wake);
    function wake() { if (!running && visible && !document.hidden) { running = true; last = 0; requestAnimationFrame(frame); } }

    function frame(now) {
      if (!visible || document.hidden) { running = false; return; }
      if (!resize()) { requestAnimationFrame(frame); return; }
      var dt = last ? Math.min((now - last) / 1000, 0.1) : STEP;
      last = now; acc += dt;
      if (acc >= STEP) {
        acc = 0; T += STEP;
        var ease = Math.min(1, STEP * 3.5);
        az += (-62 + 9 * Math.sin(T * 0.16) + azT - az) * ease;
        el += (26 + 2.2 * Math.sin(T * 0.21 + 1.1) + elT - el) * ease;
        setTime(T);
        gl.uniform1f(uAz, az * Math.PI / 180); gl.uniform1f(uEl, el * Math.PI / 180);
        gl.bindBuffer(gl.ARRAY_BUFFER, bH); gl.bufferData(gl.ARRAY_BUFFER, aH, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(locH); gl.vertexAttribPointer(locH, 1, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, bN); gl.bufferData(gl.ARRAY_BUFFER, aNn, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(locN); gl.vertexAttribPointer(locN, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, bXY); gl.enableVertexAttribArray(locXY);
        gl.vertexAttribPointer(locXY, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bI);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, idxArr.length, gl.UNSIGNED_SHORT, 0);
        if (!shown) { shown = true; canvas.style.opacity = '1'; if (img) img.style.opacity = '0'; }
      }
      requestAnimationFrame(frame);
    }
    setTime(0); wake();
  }

  function init() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var hosts = document.querySelectorAll('[data-live-teaser]');
    for (var i = 0; i < hosts.length; i++) mount(hosts[i]);
  }
  window.LIVE_TEASER = {init: init, mount: mount};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
