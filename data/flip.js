// =================================================================
//  Tiny FLIP helper for cross-page card transitions.
//  -----------------------------------------------------------------
//  Pattern:
//    Source page (on link click):
//      FLIP.store('flip-pubs-from-home',
//                 FLIP.captureMany('#publicationCards .pub-card', 'pubId'));
//
//    Destination page (after rendering its cards):
//      FLIP.play('.pub-card', 'pubId', FLIP.consume('flip-pubs-from-home'));
//
//  `idDatasetKey` is the camelCase dataset key (data-pub-id → "pubId").
// =================================================================
(function () {
  function rectOf(el) {
    var r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return null;
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  }

  window.FLIP = {
    captureMany: function (selector, idDatasetKey) {
      var rects = {};
      var els = document.querySelectorAll(selector);
      Array.prototype.forEach.call(els, function (el) {
        var id = el.dataset[idDatasetKey];
        if (!id) return;
        var r = rectOf(el);
        if (r) rects[id] = r;
      });
      return rects;
    },

    store: function (key, rects) {
      try { sessionStorage.setItem(key, JSON.stringify(rects)); } catch (e) {}
    },

    consume: function (key) {
      var val = null;
      try {
        val = JSON.parse(sessionStorage.getItem(key) || 'null');
        if (val) sessionStorage.removeItem(key);
      } catch (e) {}
      return val;
    },

    play: function (selector, idDatasetKey, stored, options) {
      if (!stored) return;
      options = options || {};
      var durationMs = options.durationMs || 540;
      var els = Array.prototype.slice.call(document.querySelectorAll(selector));
      var active = [];
      els.forEach(function (el) {
        var id = el.dataset[idDatasetKey];
        if (!id) return;
        var from = stored[id];
        if (!from) return;
        var to = rectOf(el);
        if (!to) return;
        var dx = from.x - to.x;
        var dy = from.y - to.y;
        var sx = from.w / to.w;
        var sy = from.h / to.h;
        el.style.transition = 'none';
        el.style.transformOrigin = 'top left';
        el.style.transform =
          'translate(' + dx + 'px, ' + dy + 'px) scale(' + sx + ', ' + sy + ')';
        active.push(el);
      });
      if (!active.length) return;
      // Force layout flush so the "from" transform is the starting state.
      void document.body.offsetHeight;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          active.forEach(function (el) {
            el.style.transition =
              'transform ' + durationMs + 'ms cubic-bezier(0.22, 1, 0.36, 1)';
            el.style.transform = '';
          });
        });
      });
    }
  };
})();
