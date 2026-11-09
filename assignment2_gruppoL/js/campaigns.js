document.addEventListener('ft:ready', function () {
  var FT = window.FT;
  var q = document.getElementById('q');
  var status = document.getElementById('status');
  var sort = document.getElementById('sort');
  var chips = document.querySelectorAll('#theme-chips .chip');
  var list = document.getElementById('list');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var theme = FT.params.get('theme') || 'all';

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function render() {
    var term = norm(q.value.trim());
    var items = FT.projects.filter(function (p) {
      if (theme !== 'all' && p.theme !== theme) return false;
      var reached = p.raised >= p.goal;
      if (status.value === 'open' && reached) return false;
      if (status.value === 'reached' && !reached) return false;
      if (term) {
        var hay = norm([p.short, p.title.en, p.title.it, p.tagline.en, p.tagline.it, p.dept.en, p.dept.it, FT.themes[p.theme].en, FT.themes[p.theme].it].join(' '));
        if (hay.indexOf(term) === -1) return false;
      }
      return true;
    });
    items.sort(function (a, b) {
      var ra = a.raised / FT.activeGoal(a), rb = b.raised / FT.activeGoal(b);
      if (sort.value === 'close') return rb - ra;
      if (sort.value === 'far') return ra - rb;
      if (sort.value === 'donors') return b.donors - a.donors;
      return a.short.localeCompare(b.short);
    });
    list.innerHTML = items.map(FT.card).join('');
    empty.hidden = items.length > 0;
    count.innerHTML = FT.L('Showing ' + items.length + ' of ' + FT.projects.length + ' campaigns',
                           items.length + ' campagne su ' + FT.projects.length);
    for (var i = 0; i < chips.length; i++) chips[i].setAttribute('aria-pressed', chips[i].getAttribute('data-theme') === theme ? 'true' : 'false');
    FT.refresh();
  }

  for (var i = 0; i < chips.length; i++) {
    chips[i].addEventListener('click', function () { theme = this.getAttribute('data-theme'); render(); });
  }
  q.addEventListener('input', render);
  status.addEventListener('change', render);
  sort.addEventListener('change', render);
  document.getElementById('reset').addEventListener('click', function () {
    q.value = ''; status.value = 'all'; theme = 'all'; render(); q.focus();
  });
  render();
});
