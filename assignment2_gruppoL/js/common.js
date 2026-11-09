(function () {
  var FT = window.FT;

  FT.lang = function () { return document.documentElement.lang === 'it' ? 'it' : 'en'; };

  FT.L = function (en, it) {
    if (en && typeof en === 'object') { it = en.it; en = en.en; }
    return '<span data-l="en">' + en + '</span><span data-l="it">' + (it == null ? en : it) + '</span>';
  };
  FT.t = function (obj) { return obj[FT.lang()] || obj.en; };

  FT.url = function (path, params) {
    var q = new URLSearchParams(params || {});
    q.set('lang', FT.lang());
    return path + '?' + q.toString();
  };

  function rewriteLinks() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href) || href.indexOf('.html') === -1) continue;
      var parts = href.split('#');
      var base = parts[0].split('?');
      var q = new URLSearchParams(base[1] || '');
      q.set('lang', FT.lang());
      a.setAttribute('href', base[0] + '?' + q.toString() + (parts[1] ? '#' + parts[1] : ''));
    }
  }

  function applyLangAttributes() {
    var l = FT.lang();
    var title = document.body.getAttribute('data-title-' + l);
    if (title) document.title = title + ' | Funds TOgether';
    var ph = document.querySelectorAll('[data-ph-en]');
    for (var i = 0; i < ph.length; i++) ph[i].setAttribute('placeholder', ph[i].getAttribute('data-ph-' + l));
    var ar = document.querySelectorAll('[data-aria-en]');
    for (var j = 0; j < ar.length; j++) ar[j].setAttribute('aria-label', ar[j].getAttribute('data-aria-' + l));
    var btns = document.querySelectorAll('.lang-switch button');
    for (var k = 0; k < btns.length; k++) btns[k].setAttribute('aria-pressed', btns[k].value === l ? 'true' : 'false');
    var opts = document.querySelectorAll('option[data-en]');
    for (var m = 0; m < opts.length; m++) opts[m].textContent = opts[m].getAttribute('data-' + l);
  }

  FT.setLang = function (l) {
    document.documentElement.lang = l;
    try { localStorage.setItem('ft-lang', l); } catch (e) {}
    try {
      var u = new URL(location.href);
      u.searchParams.set('lang', l);
      history.replaceState(null, '', u.toString());
    } catch (e) {}
    rewriteLinks();
    applyLangAttributes();
    document.dispatchEvent(new CustomEvent('ft:lang'));
  };

  FT.moneyRaw = function (n, l) {
    var s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, l === 'it' ? '.' : ',');
    return l === 'it' ? s + ' €' : '€' + s;
  };
  FT.money = function (n) { return FT.L(FT.moneyRaw(n, 'en'), FT.moneyRaw(n, 'it')); };

  var MONTHS = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    it: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
  };
  FT.date = function (d) {
    if (typeof d === 'string') d = new Date(d + 'T12:00:00');
    return FT.L(d.getDate() + ' ' + MONTHS.en[d.getMonth()] + ' ' + d.getFullYear(),
                d.getDate() + ' ' + MONTHS.it[d.getMonth()] + ' ' + d.getFullYear());
  };
  FT.endDate = function (p) { return new Date(p.end + 'T00:00:00'); };
  FT.daysLeft = function (p) { return Math.ceil((FT.endDate(p) - FT.today) / 86400000); };

  /* The goal currently being collected for: the first goal, or the new total once a stretch goal is active. */
  FT.activeGoal = function (p) {
    return (p.stretch && p.stretchActive && p.raised >= p.goal) ? p.stretch.amount : p.goal;
  };

  /* Status in plain words, never a negative count (problem A11) */
  FT.status = function (p) {
    var d = FT.daysLeft(p);
    var reached = p.raised >= p.goal;
    if (d < 0) return { cls: 'closed', html: FT.L('Ended on ', 'Conclusa il ') + FT.date(p.end) };
    var left = FT.L(d + ' days left', d === 1 ? 'manca 1 giorno' : 'mancano ' + d + ' giorni');
    return reached
      ? { cls: 'reached', html: (p.stretch && p.stretchActive
          ? FT.L('First goal reached, still open: ', 'Primo obiettivo raggiunto, ancora aperta: ')
          : FT.L('Goal reached, still open: ', 'Obiettivo raggiunto, ancora aperta: ')) + left }
      : { cls: 'open', html: FT.L('Open: ', 'Aperta: ') + left };
  };

  FT.meter = function (p, big) {
    var goal = FT.activeGoal(p);
    var pct = Math.round(p.raised / goal * 100);
    var fill = Math.min(pct, 100);
    var reached = p.raised >= p.goal;
    var match = Math.min(p.goal, 10000);
    var label = FT.L(pct + '% of the goal raised by donors', pct + '% dell’obiettivo raccolto dai donatori');
    return '' +
      '<div class="meter' + (big ? ' meter--big' : '') + (reached ? ' is-reached' : '') + '">' +
        '<div class="meter-track" role="img" aria-label="' + (FT.lang() === 'it' ? pct + '% dell’obiettivo raccolto' : pct + '% of goal raised') + '">' +
          '<div class="meter-donors"><span style="width:' + fill + '%"></span></div>' +
          '<div class="meter-match"><span></span></div>' +
        '</div>' +
        '<div class="meter-legend">' +
          '<p class="meter-raised"><strong>' + FT.money(p.raised) + '</strong> ' + FT.L('raised of', 'raccolti su') + ' ' + FT.money(goal) + '</p>' +
          '<p class="meter-match-label">' + (reached
            ? FT.L('+ ', '+ ') + FT.money(match) + ' ' + FT.L('from the University, confirmed', 'dall’Ateneo, confermati')
            : FT.L('+ ', '+ ') + FT.money(match) + ' ' + FT.L('from the University if the goal is reached', 'dall’Ateneo se si raggiunge l’obiettivo')) +
          '</p>' +
        '</div>' +
        '<p class="sr-only">' + label + '</p>' +
      '</div>';
  };

  FT.card = function (p) {
    var st = FT.status(p);
    var pct = Math.round(p.raised / FT.activeGoal(p) * 100);
    return '' +
      '<article class="card" style="--accent:' + p.color + '" data-theme="' + p.theme + '" data-status="' + st.cls + '">' +
        '<div class="card-band"><span class="card-short">' + p.short + '</span></div>' +
        '<div class="card-body">' +
          '<p class="status status--' + st.cls + '">' + st.html + '</p>' +
          '<h3 class="card-title"><a href="' + FT.url('project.html', { id: p.id }) + '">' + FT.L(p.title) + '</a></h3>' +
          '<p class="card-theme">' + FT.L(FT.themes[p.theme]) + '</p>' +
          '<p class="card-tagline">' + FT.L(p.tagline) + '</p>' +
          FT.meter(p) +
          '<p class="card-facts"><span>' + pct + '%</span><span>' + p.donors + ' ' + FT.L('donors', 'donatori') + '</span><span>' + FT.L('ends ', 'scade il ') + FT.date(p.end) + '</span></p>' +
        '</div>' +
      '</article>';
  };

  var NAV = [
    { href: 'campaigns.html', page: 'campaigns', en: 'Campaigns', it: 'Campagne' },
    { href: 'how-it-works.html', page: 'how', en: 'How it works', it: 'Come funziona' },
    { href: 'propose.html', page: 'propose', en: 'Propose a project', it: 'Proponi un progetto' },
    { href: 'programme.html', page: 'programme', en: 'The programme', it: 'Il programma' },
    { href: 'faq.html', page: 'faq', en: 'FAQ', it: 'FAQ' },
    { href: 'contact.html', page: 'contact', en: 'Contact', it: 'Contatti' }
  ];

  function header() {
    var page = document.body.getAttribute('data-page');
    var items = NAV.map(function (n) {
      var cur = (n.page === page || (page === 'project' && n.page === 'campaigns')) ? ' aria-current="page"' : '';
      return '<li><a href="' + n.href + '"' + cur + '>' + FT.L(n.en, n.it) + '</a></li>';
    }).join('');
    return '' +
      '<a class="skip" href="#main">' + FT.L('Skip to content', 'Vai al contenuto') + '</a>' +
      '<div class="edition-bar" role="region" aria-label="2026 edition"><div class="wrap">' +
        '<p>' + FT.L('<strong>2026 edition:</strong> 5 campaigns are open, closing between 10 and 18 November 2026. Applications for researchers are closed.',
                     '<strong>Edizione 2026:</strong> 5 campagne aperte, chiudono tra il 10 e il 18 novembre 2026. Le candidature per i ricercatori sono chiuse.') +
        ' <a href="programme.html#timeline">' + FT.L('See the timeline', 'Vedi il calendario') + '</a></p>' +
      '</div></div>' +
      '<header class="site-header"><div class="wrap header-inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-mark" aria-hidden="true"><i></i><i></i></span>' +
          '<span class="brand-text"><span class="brand-name">Funds TOgether</span>' +
          '<span class="brand-sub">' + FT.L('Research crowdfunding, University of Turin', 'Crowdfunding per la ricerca, Università di Torino') + '</span></span>' +
        '</a>' +
        '<nav aria-label="Main"><ul class="nav">' + items + '</ul></nav>' +
        '<div class="lang-switch" role="group" aria-label="Language / Lingua">' +
          '<button type="button" value="en" lang="en">EN</button><button type="button" value="it" lang="it">IT</button>' +
        '</div>' +
      '</div></header>';
  }

  function footer() {
    return '' +
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div><h2>' + FT.L('Support research', 'Sostieni la ricerca') + '</h2><ul>' +
            '<li><a href="campaigns.html">' + FT.L('All campaigns', 'Tutte le campagne') + '</a></li>' +
            '<li><a href="how-it-works.html">' + FT.L('How it works', 'Come funziona') + '</a></li>' +
            '<li><a href="faq.html">FAQ</a></li></ul></div>' +
          '<div><h2>' + FT.L('For UniTO researchers', 'Per chi fa ricerca in UniTO') + '</h2><ul>' +
            '<li><a href="propose.html">' + FT.L('Propose a project', 'Proponi un progetto') + '</a></li>' +
            '<li><a href="programme.html">' + FT.L('The programme', 'Il programma') + '</a></li></ul></div>' +
          '<div><h2>' + FT.L('Who to contact', 'Chi contattare') + '</h2>' +
            '<p>' + FT.L('Programme, applications and University match:', 'Programma, candidature e cofinanziamento:') + '<br><a href="mailto:fundstogether@unito.it">fundstogether@unito.it</a></p>' +
            '<p>' + FT.L('Payments and refunds:', 'Pagamenti e rimborsi:') + ' <a href="contact.html">' + FT.L('Ginger support', 'assistenza Ginger') + '</a></p></div>' +
        '</div>' +
      '</div></footer>';
  }

  FT.params = new URLSearchParams(location.search);

  document.addEventListener('DOMContentLoaded', function () {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
    var btns = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () { FT.setLang(this.value); });
    }
    document.dispatchEvent(new CustomEvent('ft:ready'));
    rewriteLinks();
    applyLangAttributes();
  });

  /* Copy text to the clipboard with a small status message (used by project share and confirmation). */
  FT.copy = function (text, statusEl, opts) {
    opts = opts || {};
    var success = opts.success || FT.L('Copied', 'Copiato');
    var fallback = opts.fallback || FT.L('Press Ctrl+C to copy', 'Premi Ctrl+C per copiare');
    var input = opts.input || null;
    function show(msg, ok) {
      if (!statusEl) return;
      statusEl.innerHTML = msg;
      if (ok) setTimeout(function () { statusEl.innerHTML = ''; }, 3000);
    }
    function fallbackCopy() {
      if (input) { try { input.focus(); input.select(); } catch (e) {} }
      show(fallback, false);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { show(success, true); }, fallbackCopy);
    } else {
      fallbackCopy();
    }
  };

  FT.refresh = function () { rewriteLinks(); applyLangAttributes(); };
})();
