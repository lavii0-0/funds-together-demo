document.addEventListener('ft:ready', function () {
  var FT = window.FT;

  document.getElementById('home-cards').innerHTML = FT.projects.map(FT.card).join('');

  /* One figure, computed from the campaign data, with its date (problem C1) */
  var raised = 0, donors = 0;
  FT.projects.forEach(function (p) { raised += p.raised; donors += p.donors; });
  document.getElementById('home-raised').innerHTML = FT.money(raised);
  document.getElementById('home-raised-detail').innerHTML = FT.L(
    'raised by ' + donors + ' donors for the 5 projects of 2026. Figure updated on ',
    'raccolti da ' + donors + ' donatori per i 5 progetti del 2026. Dato aggiornato al ') + FT.date(FT.today) + '.';

  var range = document.getElementById('sim-range');
  var out = document.getElementById('sim-out');
  var you = document.getElementById('sim-you');
  var match = document.getElementById('sim-match');
  var total = document.getElementById('sim-total');
  function upd() {
    var v = parseInt(range.value, 10);
    out.innerHTML = FT.money(v);
    var w = (v / 200 * 100) + '%';
    you.style.width = w;
    match.style.width = w;
    total.innerHTML = FT.L('The research gets ', 'La ricerca riceve ') + '<strong>' + FT.money(v * 2) + '</strong>' +
      FT.L(', once the project reaches its goal.', ', quando il progetto raggiunge l’obiettivo.');
  }
  range.addEventListener('input', upd);
  upd();
});
