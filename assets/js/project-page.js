/* =====================================================================
   SNU Reality Lab — project page renderer
   ---------------------------------------------------------------------
   A project page is /publications/<slug>/index.html that defines
   window.PROJECT and loads data/publications.js + this file.
   Title, authors, venue, links and BibTeX come from publications.js
   (matched by PROJECT.pubId) so there is one source of truth; the page
   itself only adds the long-form content (teaser, abstract, sections).
   See /publications/_template/index.html for every supported block.
   ===================================================================== */
(function () {
  'use strict';

  var ROOT = window.SITE_ROOT || '../../';
  var P = window.PROJECT || {};
  var PUBS = Array.isArray(window.HOME_PUBLICATIONS) ? window.HOME_PUBLICATIONS : [];
  var pub = PUBS.filter(function (p) { return p.id === P.pubId; })[0] || {};
  // Page-level fields override the shared publication record.
  var D = {};
  Object.keys(pub).forEach(function (k) { D[k] = pub[k]; });
  Object.keys(P).forEach(function (k) { if (P[k] != null && P[k] !== '') D[k] = P[k]; });

  // Known co-author homepages. A page can extend this with PROJECT.authorLinks.
  var PEOPLE = {
    'Suyeon Choi': ROOT + 'team/suyeon/',
    'Gordon Wetzstein': 'https://stanford.edu/~gordonwz/',
    'Brian Chao': 'https://bchao1.github.io/',
    'Manu Gopakumar': 'https://manugopa.github.io/',
    'Gun-Yeal Lee': 'https://gunyeal.github.io/',
    'Liang Shi': 'https://people.csail.mit.edu/liangs/',
    'Jonghyun Kim': 'https://research.nvidia.com/person/jonghyun-kim',
    'Yifan Peng': 'https://www.eee.hku.hk/~evanpeng/',
    'Seung-Woo Nam': 'https://nseungwoo.github.io/',
    "Matthew O'Toole": 'https://www.cs.cmu.edu/~motoole2/',
    'Nitish Padmanaban': 'https://nitish.me/',
    'Seungjae Lee': 'http://sleehub.com',
    'Dongyeon Kim': 'https://dongyeon93.github.io/',
    'Byoungho Lee': 'http://oeqelab.snu.ac.kr/PROF'
  };
  Object.keys(P.authorLinks || {}).forEach(function (k) { PEOPLE[k] = P.authorLinks[k]; });

  var ICONS = {
    paper: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    arxiv: '<path d="M4 4l16 16M20 4L4 20"/>',
    code: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
    video: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 10l5-3v10l-5-3z"/>',
    data: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    slides: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/>',
    link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    quote: '<path d="M7 7h4v6H5V9a2 2 0 0 1 2-2zM15 7h4v6h-6V9a2 2 0 0 1 2-2zM5 13c0 3 1 4 4 4M13 13c0 3 1 4 4 4"/>'
  };
  function icon(label) {
    var l = String(label).toLowerCase(), k = 'link';
    if (/bibtex|cite/.test(l)) k = 'quote';
    else if (/arxiv/.test(l)) k = 'arxiv';
    else if (/code|github/.test(l)) k = 'code';
    else if (/video|talk|youtube/.test(l)) k = 'video';
    else if (/data/.test(l)) k = 'data';
    else if (/slide|poster/.test(l)) k = 'slides';
    else if (/paper|article|pdf|supp|dissertation|abstract/.test(l)) k = 'paper';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[k] + '</svg>';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  /* ------------------------------ header ------------------------------ */
  function renderAuthors() {
    var names = String(D.authors || '').split(/\s*,\s*/).filter(Boolean);
    var html = names.map(function (raw) {
      var name = raw.replace(/\*$/, ''), star = raw.length !== name.length;
      var inner = esc(name);
      if (PEOPLE[name]) inner = '<a href="' + esc(PEOPLE[name]) + '"' + (/^https?:/.test(PEOPLE[name]) ? ' target="_blank" rel="noopener"' : '') + '>' + inner + '</a>';
      return '<span>' + inner + (star ? '*' : '') + '</span>';
    }).join(', ');
    return '<div class="pp-authors">' + html + '</div>' +
      (/\*/.test(D.authors || '') ? '<div class="pp-note">* Equal contribution</div>' : '');
  }

  function pageLinks() {
    return (Array.isArray(P.links) ? P.links : (D.links || [])).filter(function (l) {
      return !/^project page$/i.test(l.label);
    });
  }
  function renderButtons(longLabels) {
    var html = pageLinks().map(function (l) {
      var label = /^supp\.?$/i.test(l.label) ? (longLabels ? 'Supplement' : 'Supp.') : l.label;
      if (!l.url) return '<span class="pp-btn is-disabled">' + icon(l.label) + esc(label) + '</span>';
      return '<a class="pp-btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + icon(l.label) + esc(label) + '</a>';
    }).join('');
    if (D.bibtex) html += '<a class="pp-btn" href="#citation">' + icon('BibTeX') + 'BibTeX</a>';
    return html;
  }

  function media(src, attrs) {
    attrs = attrs || '';
    if (/\.(mp4|webm|mov)$/i.test(src)) return '<video src="' + esc(src) + '" autoplay muted loop playsinline preload="metadata" ' + attrs + '></video>';
    return '<img src="' + esc(src) + '" loading="lazy" alt="" ' + attrs + '>';
  }

  /* ------------------------------ blocks ------------------------------ */
  var B = {
    text: function (b) { return '<div class="pp-text">' + b.html + '</div>'; },
    figure: function (b) {
      return '<figure class="pp-fig' + (b.wide ? ' is-wide' : '') + (b.plain ? ' is-plain' : '') + (b.narrow ? ' is-narrow' : '') + '">' + media(b.src) +
        (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>';
    },
    video: function (b) { return B.figure(b); },
    youtube: function (b) {
      return '<figure class="pp-fig' + (b.wide ? ' is-wide' : '') + '"><div class="pp-embed"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(b.id) + '" allowfullscreen loading="lazy" title="Video"></iframe></div>' +
        (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>';
    },
    compare: function (b) {
      var start = b.start != null ? b.start : 0.5;
      if (b.scenes && b.scenes.length) {
        b.a = { src: b.scenes[0].a, label: b.a ? b.a.label : '' };
        b.b = { src: b.scenes[0].b, label: b.b ? b.b.label : '' };
      }
      var tabs = (b.scenes && b.scenes.length > 1) ? '<div class="pp-tabs pp-cmp-tabs" data-scenes="' + esc(JSON.stringify(b.scenes)) + '">' +
        b.scenes.map(function (sc, i) { return '<button type="button" data-i="' + i + '"' + (i === 0 ? ' class="is-active"' : '') + '>' + esc(sc.label) + '</button>'; }).join('') + '</div>' : '';
      return '<figure class="pp-fig' + (b.wide ? ' is-wide' : '') + '">' + tabs + '<div class="pp-compare" style="--pos:' + (start * 100) + '%">' +
        media(b.a.src, 'class="pp-cmp-a"') + media(b.b.src, 'class="pp-cmp-b"') +
        '<div class="pp-cmp-handle"></div>' +
        '<span class="pp-cmp-label l">' + esc(b.a.label || '') + '</span><span class="pp-cmp-label r">' + esc(b.b.label || '') + '</span>' +
        '</div>' + (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>';
    },
    scrub: function (b) {
      return '<figure class="pp-fig' + (b.wide ? ' is-wide' : '') + '"><div class="pp-scrub" data-autoplay="' + (b.autoplay !== false) + '">' +
        '<video src="' + esc(b.src) + '" muted playsinline preload="auto"></video></div>' +
        '<div class="pp-scrub-ctrl"><span>' + esc(b.min || '') + '</span><input type="range" min="0" max="1000" value="0" aria-label="' + esc(b.label || 'Scrub') + '"><span>' + esc(b.max || '') + '</span><button type="button">Pause</button></div>' +
        (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>';
    },
    gallery: function (b) {
      var tabs = b.items.map(function (it, i) {
        return '<button type="button" data-i="' + i + '"' + (i === 0 ? ' class="is-active"' : '') + '>' + esc(it.label) + '</button>';
      }).join('');
      var data = esc(JSON.stringify(b.items));
      return '<figure class="pp-fig pp-gallery' + (b.wide ? ' is-wide' : '') + '" data-items="' + data + '"><div class="pp-tabs">' + tabs + '</div>' +
        '<div class="pp-gallery-stage">' + media(b.items[0].src) + '</div>' +
        '<figcaption class="pp-gallery-cap">' + (b.items[0].caption || b.caption || '') + '</figcaption></figure>';
    },
    grid: function (b) {
      // `ratios` (width/height of each item) sizes the columns so every item ends up the same height.
      var style = b.ratios ? 'grid-template-columns:' + b.ratios.map(function (r) { return r + 'fr'; }).join(' ') : '--cols:' + (b.cols || 2);
      return '<div class="pp-fig pp-grid' + (b.wide ? ' is-wide' : '') + '" style="' + style + '">' + b.items.map(function (it) {
        return '<figure>' + media(it.src) + (it.caption ? '<figcaption>' + it.caption + '</figcaption>' : '') + '</figure>';
      }).join('') + '</div>' + (b.caption ? '<p class="pp-caption">' + b.caption + '</p>' : '');
    }
  };

  function renderSection(s) {
    var id = s.id || slugify(s.title || 'section');
    return '<section class="pp-section" id="' + esc(id) + '">' + (s.title ? '<h2>' + esc(s.title) + '</h2>' : '') +
      (s.blocks || []).map(function (b) { return (B[b.type] || B.text)(b); }).join('') + '</section>';
  }

  /* ------------------------------ page ------------------------------ */
  var sections = [];
  if (P.abstract) sections.push({ id: 'abstract', title: 'Abstract', blocks: [{ type: 'text', html: '<p>' + P.abstract + '</p>' }] });
  (P.sections || []).forEach(function (s) { sections.push(s); });
  if (P.acknowledgements) sections.push({ id: 'acknowledgements', title: 'Acknowledgements', blocks: [{ type: 'text', html: '<p>' + P.acknowledgements + '</p>' }] });

  var head =
    '<header>' +
      '<span class="pp-venue">' + esc(D.venue || '') + (/\d{4}/.test(D.venue || '') ? '' : ' ' + (D.year || '')) + '</span>' +
      (D.award ? '<span class="pp-award">' + esc(D.award) + '</span>' : '') +
      '<h1 class="pp-title">' + esc(D.longTitle || D.shortTitle || '') + '</h1>' +
      renderAuthors() +
      '<div class="pp-buttons pp-buttons-inline">' + renderButtons() + '</div>' +
    '</header>';
  var teaser = '';
  if (P.youtube) {
    teaser = '<figure class="pp-teaser"><div class="pp-embed"><iframe src="https://www.youtube.com/embed/' + esc(P.youtube) +
      '?rel=0" title="Video" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></figure>';
  } else if (P.teaser) {
    var paper = pageLinks().filter(function (l) { return /^(paper|arxiv)$/i.test(l.label) && l.url; })[0];
    var heroMedia = media(P.teaser.src);
    if (paper && !/\.(mp4|webm|mov)$/i.test(P.teaser.src)) {
      heroMedia = '<a href="' + esc(paper.url) + '" target="_blank" rel="noopener" title="Paper">' + heroMedia + '</a>';
    }
    teaser = '<figure class="pp-teaser' + (P.teaser.plain ? ' is-plain' : '') + '">' + heroMedia + '</figure>' +
      (P.teaser.caption ? '<p class="pp-caption">' + P.teaser.caption + '</p>' : '');
  }
  var tldr = P.tldr ? '<p class="pp-tldr">' + P.tldr + '</p>' : '';
  var cite = D.bibtex ? '<section class="pp-section" id="citation"><h2>Citation</h2><div class="pp-bib"><pre>' + esc(D.bibtex) + '</pre><button type="button">Copy</button></div></section>' : '';

  var main = document.getElementById('pp-main');
  main.innerHTML = head + teaser + tldr + sections.map(renderSection).join('') + cite;

  // Side index: other project pages + table of contents for this page.
  var side = document.getElementById('pp-side');
  if (side) {
    var byId = {};
    PUBS.forEach(function (p) { byId[p.id] = p; });
    var related = (P.related || []).map(function (id) { return byId[id]; }).filter(Boolean);
    side.innerHTML =
      '<div class="pp-side-links">' + renderButtons(true) + '</div>' +

      (related.length ? '<h4>Related Projects</h4><ul class="pp-related">' + related.map(function (p) {
        var href = p.slug ? ROOT + 'publications/' + p.slug + '/' : (p.projectLink || '#');
        return '<li><a href="' + esc(href) + '"><span>' + esc(p.shortTitle) + '</span><small>' + esc(p.venue) + (/\d{4}/.test(p.venue) ? '' : ' ' + p.year) + '</small></a></li>';
      }).join('') + '</ul>' : '') +
      '<ul><li><a href="' + ROOT + 'publications/">← All publications</a></li></ul>';
  }

  if (!document.title || /TEMPLATE/.test(document.title)) document.title = (D.shortTitle || 'Project') + ' — SNU Reality Lab';

  // Grow the hero out of the card the visitor clicked on the home / publications page.
  (function () {
    var ft = null;
    try { ft = JSON.parse(sessionStorage.getItem('flip-teaser') || 'null'); sessionStorage.removeItem('flip-teaser'); } catch (e) {}
    var hero = main.querySelector('.pp-teaser');
    if (!ft || ft.id !== D.id || !hero) return;
    if (window.CSSViewTransitionRule) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var to = hero.getBoundingClientRect();
    if (!to.width) return;
    var s = ft.w / to.width;
    var dx = ft.x - to.left;
    var dy = (ft.y + ft.h / 2) - (to.top + to.height * s / 2);
    var others = Array.prototype.filter.call(main.children, function (el) { return el !== hero; });
    hero.style.transformOrigin = '0 0';
    hero.style.transition = 'none';
    hero.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
    hero.style.position = 'relative';
    hero.style.zIndex = '5';
    others.forEach(function (el) { el.style.transition = 'none'; el.style.opacity = '0'; });
    hero.getBoundingClientRect();
    requestAnimationFrame(function () {
      hero.style.transition = 'transform 620ms cubic-bezier(.22,1,.36,1)';
      hero.style.transform = 'none';
      others.forEach(function (el) { el.style.transition = 'opacity 480ms ease 200ms'; el.style.opacity = '1'; });
      setTimeout(function () { hero.style.zIndex = ''; hero.style.transform = ''; hero.style.transition = ''; }, 720);
    });
  })();

  // On leaving (back button or nav links), remember the hero so the list page can shrink it back into its card.
  window.addEventListener('pagehide', function () {
    var hero = main.querySelector('.pp-teaser');
    if (!hero) return;
    var r = hero.getBoundingClientRect();
    if (!r.width || r.bottom < 0 || r.top > window.innerHeight) return;
    try { sessionStorage.setItem('flip-teaser-back', JSON.stringify({ id: D.id, t: Date.now(), x: r.left, y: r.top, w: r.width, h: r.height })); } catch (e) {}
  });

  /* --------------------------- interactions --------------------------- */
  // Compare slider (works for image or video pairs; videos are kept in sync).
  main.querySelectorAll('.pp-compare').forEach(function (el) {
    function setPos(clientX) {
      var r = el.getBoundingClientRect();
      var x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      el.style.setProperty('--pos', (x * 100) + '%');
    }
    var dragging = false;
    el.addEventListener('pointerdown', function (e) { dragging = true; el.setPointerCapture(e.pointerId); setPos(e.clientX); });
    el.addEventListener('pointermove', function (e) { if (dragging || e.pointerType === 'mouse') setPos(e.clientX); });
    el.addEventListener('pointerup', function () { dragging = false; });
    var a = el.querySelector('video.pp-cmp-a'), b = el.querySelector('video.pp-cmp-b');
    if (a && b) {
      (function sync() {
        if (a.duration && b.duration) {
          var t = a.currentTime / a.duration * b.duration;
          if (Math.abs(b.currentTime - t) > 0.08) b.currentTime = t;
        }
        requestAnimationFrame(sync);
      })();
    }
  });

  // Scene tabs on compare blocks: swap both sources together.
  main.querySelectorAll('.pp-cmp-tabs').forEach(function (bar) {
    var scenes = JSON.parse(bar.dataset.scenes);
    var cmp = bar.parentNode.querySelector('.pp-compare');
    var va = cmp.querySelector('.pp-cmp-a'), vb = cmp.querySelector('.pp-cmp-b');
    bar.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sc = scenes[+btn.dataset.i];
        va.src = sc.a; vb.src = sc.b;
        [va, vb].forEach(function (v) { if (v.play) { v.load(); v.play().catch(function () {}); } });
        bar.querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-active', x === btn); });
      });
    });
  });

  // Scrubber: slider drives video.currentTime; ping-pongs until touched.
  main.querySelectorAll('.pp-scrub').forEach(function (wrap) {
    var v = wrap.querySelector('video');
    var ctrl = wrap.parentNode.querySelector('.pp-scrub-ctrl');
    var range = ctrl.querySelector('input'), btn = ctrl.querySelector('button');
    var playing = wrap.dataset.autoplay === 'true', dir = 1, last = 0, pending = false;
    function seek(val) {
      if (!v.duration) return;
      v.currentTime = Math.min(v.duration - 0.04, val / 1000 * v.duration);
    }
    function tick(ts) {
      if (playing && v.duration) {
        var dt = last ? (ts - last) : 16; last = ts;
        var val = +range.value + dir * dt * 0.25;
        if (val >= 1000) { val = 1000; dir = -1; }
        if (val <= 0) { val = 0; dir = 1; }
        range.value = val;
        if (!pending) { pending = true; seek(val); }
      } else { last = 0; }
      requestAnimationFrame(tick);
    }
    v.addEventListener('seeked', function () { pending = false; });
    range.addEventListener('input', function () { playing = false; btn.textContent = 'Play'; seek(+range.value); });
    btn.textContent = playing ? 'Pause' : 'Play';
    btn.addEventListener('click', function () { playing = !playing; btn.textContent = playing ? 'Pause' : 'Play'; });
    v.addEventListener('loadedmetadata', function () { seek(0); });
    requestAnimationFrame(tick);
  });

  // Tabbed gallery.
  main.querySelectorAll('.pp-gallery').forEach(function (g) {
    var items = JSON.parse(g.dataset.items);
    var stage = g.querySelector('.pp-gallery-stage'), cap = g.querySelector('.pp-gallery-cap');
    g.querySelectorAll('.pp-tabs button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var it = items[+btn.dataset.i];
        stage.innerHTML = media(it.src);
        cap.innerHTML = it.caption || '';
        g.querySelectorAll('.pp-tabs button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      });
    });
  });

  // BibTeX copy.
  var copyBtn = main.querySelector('.pp-bib button');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var txt = main.querySelector('.pp-bib pre').textContent;
    var done = function () { copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1300); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
  });

  /* ---------------------------- theme/year ---------------------------- */
  var rootEl = document.documentElement;
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) rootEl.classList.add('dark');
  } catch (e) {}
  var toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', function () {
    rootEl.classList.toggle('dark');
    try { localStorage.setItem('theme', rootEl.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
  });
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
