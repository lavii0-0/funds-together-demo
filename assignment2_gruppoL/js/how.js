document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;
  document.getElementById('refund-rule').innerHTML = L(FT.refundRule);
  document.getElementById('methods').innerHTML = FT.paymentMethods.map(function (m) {
    return '<li><strong>' + L(m.en, m.it) + '</strong>. ' + L(m.note) + '.</li>';
  }).join('');
  document.getElementById('example-meter').innerHTML = '<p class="small muted" style="margin-top:0">' + L('Example: Mind the Climate today', 'Esempio: Mind the Climate oggi') + '</p>' + FT.meter(FT.getProject('mind-the-climate'), true);
  FT.refresh();
});
