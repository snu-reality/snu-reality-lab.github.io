/* Click tracking for Google Analytics (G-L7781B19XD).
   Sends one event, `site_click`, with:
     click_label  – what was clicked ("Paper", "Code", "Project Page", "Card", "Teaser", nav item …)
     click_target – which paper / course / page it belongs to (short title)
     click_area   – where on the site (pub_card, project_header, project_sidebar, related, nav, teaching_card …)
     link_url     – destination, if any */
(function () {
  function send(params) {
    if (typeof window.gtag !== 'function') return;
    params.transport_type = 'beacon';
    window.gtag('event', 'site_click', params);
  }
  function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim().slice(0, 100); }
  function titleForCard(card) {
    var id = card.dataset.pubId;
    var pubs = window.HOME_PUBLICATIONS || [];
    for (var i = 0; i < pubs.length; i++) if (pubs[i].id === id) return pubs[i].shortTitle;
    var t = card.querySelector('.pub-title, .pub-title-short, .font-semibold');
    return clean(t ? t.textContent : id);
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target : null;
    if (!el) return;
    var a = el.closest('a, button');
    var href = a && a.getAttribute('href') || '';

    // Publication / teaching cards (home, /publications/, /teaching/)
    var card = el.closest('.pub-card, .teach-card');
    if (card) {
      var isTeach = !!card.dataset.teachId || card.classList.contains('teach-card') || /\/class\//.test(href);
      var label = a ? clean(a.textContent) : '';
      if (!label || (a && a.querySelector('img, video'))) label = el.closest('.pub-teaser, .teach-teaser') ? 'Teaser' : 'Card';
      send({ click_label: label, click_target: isTeach ? clean((card.querySelector('.pub-title-short, .font-semibold') || card).textContent) : titleForCard(card),
             click_area: isTeach ? 'teaching_card' : 'pub_card', link_url: href });
      return;
    }

    // Project pages
    var D = window.PROJECT_TITLE || '';
    if (el.closest('.pp-side-links') && a) { send({ click_label: clean(a.textContent), click_target: D, click_area: 'project_sidebar', link_url: href }); return; }
    if (el.closest('.pp-buttons-inline') && a) { send({ click_label: clean(a.textContent), click_target: D, click_area: 'project_header', link_url: href }); return; }
    if (el.closest('.pp-related') && a) { send({ click_label: 'Related: ' + clean(a.querySelector('span') ? a.querySelector('span').textContent : a.textContent), click_target: D, click_area: 'related', link_url: href }); return; }
    if (el.closest('.pp-teaser') && a) { send({ click_label: 'Hero image', click_target: D, click_area: 'project_hero', link_url: href }); return; }
    if (el.closest('.pp-tabs') && el.closest('button')) { send({ click_label: 'Tab: ' + clean(el.closest('button').textContent), click_target: D, click_area: 'project_results' }); return; }
    if (el.closest('.pp-bib button')) { send({ click_label: 'Copy BibTeX', click_target: D, click_area: 'project_citation' }); return; }

    // Site navigation
    if (el.closest('.site-nav') && a) { send({ click_label: clean(a.textContent) || 'Logo', click_target: location.pathname, click_area: 'nav', link_url: href }); return; }

    // Anything else that leaves the site
    if (a && /^https?:/i.test(href) && a.hostname !== location.hostname) {
      send({ click_label: clean(a.textContent) || 'Link', click_target: location.pathname, click_area: 'other', link_url: href });
    }
  }, true);
})();
