/* Step 2 of the donation: details, payment method, conditions.
   Errors are shown under each field and summarised at the top with links (B11, B12). */
document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;
  var p = FT.getProject(FT.params.get('id'));
  var rewardId = FT.params.get('reward') || 'none';
  var amount = parseFloat(FT.params.get('amount'));
  if (!p || isNaN(amount)) { location.replace(FT.url('campaigns.html')); return; }

  var reward = null;
  p.rewards.forEach(function (r) { if (r.id === rewardId) reward = r; });
  var rewardTitle = reward ? reward.title : { en: 'No reward', it: 'Nessuna ricompensa' };

  var backHref = 'support.html?id=' + p.id + '&reward=' + rewardId + '&amount=' + amount;
  document.getElementById('back-step').setAttribute('href', backHref);
  document.getElementById('back-link-2').setAttribute('href', backHref);

  /* One list of payment methods (A8) */
  document.getElementById('methods').innerHTML = FT.paymentMethods.map(function (m) {
    var panel = '';
    if (m.id === 'card') panel = L('After you confirm, the card payment opens in a secure window of the payment provider. In this prototype, that step is skipped.', 'Dopo la conferma, il pagamento con carta si apre in una finestra sicura del gestore dei pagamenti. In questo prototipo il passaggio viene saltato.');
    if (m.id === 'paypal') panel = L('After you confirm, you log in to PayPal to approve the payment. In this prototype, that step is skipped.', 'Dopo la conferma, accedi a PayPal per approvare il pagamento. In questo prototipo il passaggio viene saltato.');
    if (m.id === 'satispay') panel = L('After you confirm, you approve the payment in the Satispay app. In this prototype, that step is skipped.', 'Dopo la conferma, approvi il pagamento nell’app Satispay. In questo prototipo il passaggio viene saltato.');
    if (m.id === 'transfer') panel = L('You receive the bank details by email. The transfer must arrive before ', 'Ricevi le coordinate bancarie via email. Il bonifico deve arrivare prima del ') + FT.date(p.end) + L(', otherwise it does not count for the goal.', ', altrimenti non conta per l’obiettivo.');
    return '<label class="choice" style="grid-template-columns:auto 1fr"><input type="radio" name="method" value="' + m.id + '">' +
      '<span><span class="choice-title">' + L(m.en, m.it) + '</span><span class="choice-desc">' + L(m.note) + '</span></span></label>' +
      '<div class="pay-panel small" id="panel-' + m.id + '" hidden>' + panel + '</div>';
  }).join('');

  /* The key conditions, in plain words, before the confirm button (A6, A9, A10) */
  document.getElementById('key-terms').innerHTML = '' +
    '<li>' + L('The campaign ends on ', 'La campagna scade il ') + FT.date(p.end) + '. ' + L('All or nothing: ', 'Tutto o niente: ') + L(FT.refundRule) + '</li>' +
    '<li class="c-match">' + (p.raised >= p.goal
      ? L(p.stretchActive
            ? 'The first goal is already reached: the University match is confirmed.'
            : 'The goal is already reached: the University match is confirmed.',
          p.stretchActive
            ? 'Il primo obiettivo è già raggiunto: il raddoppio dell’Ateneo è confermato.'
            : 'L’obiettivo è già raggiunto: il raddoppio dell’Ateneo è confermato.')
      : L('If the goal is reached, the University adds the same amount as the donors, up to €10,000.', 'Se l’obiettivo viene raggiunto, l’Ateneo aggiunge la stessa cifra dei donatori, fino a 10.000 €.')) + '</li>' +
    '<li>' + L('Your donation goes to the project team through Ginger, the platform that manages the payments. Ginger keeps no commission; payment providers charge a small fee (bank transfers have none).', 'La donazione arriva al gruppo del progetto tramite Ginger, la piattaforma che gestisce i pagamenti. Ginger non trattiene commissioni; i sistemi di pagamento applicano una piccola commissione (il bonifico no).') + '</li>' +
    '<li>' + L('You receive a donation certificate by email. Donations to university research may be tax deductible.', 'Ricevi un attestato di donazione via email. Le donazioni alla ricerca universitaria possono essere deducibili.') + '</li>';

  document.getElementById('pay-btn').innerHTML = L('Donate ', 'Dona ') + FT.money(amount) + L(' (simulation)', ' (simulazione)');

  document.getElementById('summary').innerHTML = '<h2>' + L('Summary', 'Riepilogo') + '</h2><dl>' +
    '<dt>' + L('Project', 'Progetto') + '</dt><dd>' + p.short + '</dd>' +
    '<dt>' + L('Reward', 'Ricompensa') + '</dt><dd>' + L(rewardTitle) + '</dd>' +
    '<dt class="total">' + L('Your donation', 'La tua donazione') + '</dt><dd class="total">' + FT.money(amount) + '</dd></dl>' +
    '<p class="small" style="margin-top:12px"><a href="' + backHref + '">' + L('Change', 'Modifica') + '</a></p>';

  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var terms = document.getElementById('terms');
  var methodsBox = document.getElementById('methods');
  var methodErr = document.getElementById('method-error');
  var termsErr = document.getElementById('terms-error');

  methodsBox.addEventListener('change', function () {
    var v = methodsBox.querySelector('input:checked').value;
    FT.paymentMethods.forEach(function (m) { document.getElementById('panel-' + m.id).hidden = m.id !== v; });
    methodErr.innerHTML = '';
  });
  terms.addEventListener('change', function () { if (terms.checked) termsErr.innerHTML = ''; });

  function checkName() {
    var v = name.value.trim();
    if (!v) { FT.setError(name, 'Enter your name, as you want it on the certificate.', 'Inserisci il tuo nome, come vuoi che compaia sull’attestato.'); return false; }
    if (v.length < 2) { FT.setError(name, 'The name must have at least 2 characters.', 'Il nome deve avere almeno 2 caratteri.'); return false; }
    FT.setError(name); return true;
  }
  function checkEmail() {
    var v = email.value.trim();
    if (!v) { FT.setError(email, 'Enter your email address, so we can send you the certificate.', 'Inserisci il tuo indirizzo email, per ricevere l’attestato.'); return false; }
    if (!FT.isEmail(v)) { FT.setError(email, 'This email address looks incomplete. Check it has a form like name@example.com.', 'Questo indirizzo sembra incompleto. Controlla che sia nella forma nome@esempio.it.'); return false; }
    FT.setError(email); return true;
  }
  name.addEventListener('blur', function () { if (name.value) checkName(); });
  email.addEventListener('blur', function () { if (email.value) checkEmail(); });
  name.addEventListener('input', function () { if (name.getAttribute('aria-invalid')) checkName(); });
  email.addEventListener('input', function () { if (email.getAttribute('aria-invalid')) checkEmail(); });

  document.getElementById('pay-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var list = [];
    if (!checkName()) list.push({ id: 'name', en: 'Enter your name', it: 'Inserisci il tuo nome' });
    if (!checkEmail()) list.push({ id: 'email', en: 'Enter a valid email address', it: 'Inserisci un indirizzo email valido' });
    var m = methodsBox.querySelector('input:checked');
    if (!m) {
      methodErr.innerHTML = L('Choose how you want to pay.', 'Scegli come vuoi pagare.');
      var first = methodsBox.querySelector('input');
      first.id = 'method-first';
      list.push({ id: 'method-first', en: 'Choose a payment method', it: 'Scegli un metodo di pagamento' });
    }
    if (!terms.checked) {
      termsErr.innerHTML = L('Tick the box to confirm you have read the conditions.', 'Spunta la casella per confermare di aver letto le condizioni.');
      list.push({ id: 'terms', en: 'Confirm you have read the conditions', it: 'Conferma di aver letto le condizioni' });
    }
    var box = document.getElementById('errors');
    if (list.length) { FT.showSummary(box, list); return; }
    box.hidden = true;

    var btn = document.getElementById('pay-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>' + L('Recording your donation…', 'Registrazione della donazione…');
    try {
      sessionStorage.setItem('ft-donor', JSON.stringify({ name: name.value.trim(), email: email.value.trim(), pub: document.getElementById('public').checked, upd: document.getElementById('updates').checked }));
    } catch (err) {}
    setTimeout(function () {
      location.href = FT.url('confirmation.html', { id: p.id, reward: rewardId, amount: amount, method: m.value });
    }, 1200);
  });

  FT.refresh();
});
