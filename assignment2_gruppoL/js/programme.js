document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;
  var raised = 0, donors = 0, reached = 0;
  FT.projects.forEach(function (p) { raised += p.raised; donors += p.donors; if (p.raised >= p.goal) reached++; });
  document.getElementById('ed-raised').innerHTML = FT.money(raised);
  document.getElementById('ed-detail').innerHTML = L(
    'raised by ' + donors + ' donors for 5 projects. ' + reached + ' of them have already reached their goal. Updated on ',
    'raccolti da ' + donors + ' donatori per 5 progetti. ' + reached + ' hanno già raggiunto l’obiettivo. Aggiornato al ') + FT.date(FT.today) + '.';

  document.getElementById('past').innerHTML = '<thead><tr><th>' + L('Project', 'Progetto') + '</th><th class="num">' + L('Goal', 'Obiettivo') + '</th><th class="num">' + L('Raised', 'Raccolti') + '</th><th class="num">' + L('Donors', 'Donatori') + '</th></tr></thead><tbody>' +
    FT.past.map(function (x) {
      return '<tr><td><strong>' + x.name + '</strong><br><span class="small muted">' + L(x.en, x.it) + '</span></td><td class="num">' + FT.money(x.goal) + '</td><td class="num"><strong>' + FT.money(x.raised) + '</strong> <span class="small muted">(' + Math.round(x.raised / x.goal * 100) + '%)</span></td><td class="num">' + x.donors + '</td></tr>';
    }).join('') + '</tbody>';
  FT.refresh();
});
