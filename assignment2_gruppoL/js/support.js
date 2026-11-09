/* Step 1 of the donation: reward and amount.
   The reward can be changed at any time (A7) and the conditions are recalled next to the decision (A6). */
document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;
  var p = FT.getProject(FT.params.get('id'));
  if (!p) { location.replace(FT.url('campaigns.html')); return; }

  document.getElementById('back-project').setAttribute('href', 'project.html?id=' + p.id);
  document.getElementById('flow-title').innerHTML = L('Support ' + p.short, 'Sostieni ' + p.short);
  document.body.setAttribute('data-title-en', 'Support ' + p.short);
  document.body.setAttribute('data-title-it', 'Sostieni ' + p.short);

  var list = document.getElementById('reward-list');
  var amount = document.getElementById('amount');
  var hint = document.getElementById('amount-hint');
  var summary = document.getElementById('summary');
  var errors = document.getElementById('errors');
  var MIN_FREE = 10, MAX = 10000;

  var options = [{ id: 'none', amount: MIN_FREE, title: { en: 'No reward', it: 'Nessuna ricompensa' }, desc: { en: 'Give any amount from €10.', it: 'Dona qualsiasi cifra da 10 €.' }, left: null }]
    .concat(p.rewards);

  list.innerHTML = options.map(function (r) {
    var sold = r.left === 0;
    var tag = sold ? L('Sold out', 'Esaurita') : (r.left ? L(r.left + ' left', r.left + ' rimaste') : '');
    return '<label class="choice">' +
      '<input type="radio" name="reward" value="' + r.id + '"' + (sold ? ' disabled' : '') + '>' +
      '<span><span class="choice-title">' + L(r.title) + (tag ? ' <span class="avail' + (sold ? ' avail--none' : (r.left <= 5 ? ' avail--few' : '')) + '">' + tag + '</span>' : '') + '</span>' +
      '<span class="choice-desc">' + L(r.desc) + '</span></span>' +
      '<span class="choice-amount">' + (r.id === 'none' ? L('Any', 'Libera') : L('from ', 'da ') + FT.money(r.amount)) + '</span>' +
    '</label>';
  }).join('');

  function current() {
    var c = list.querySelector('input:checked');
    if (!c) return null;
    for (var i = 0; i < options.length; i++) if (options[i].id === c.value) return options[i];
    return null;
  }
  function parseAmount() {
    var v = amount.value.trim().replace(/€/g, '').replace(/\s/g, '');
    if (!v) return NaN;
    v = v.replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
    return /^\d+(\.\d{1,2})?$/.test(v) ? parseFloat(v) : NaN;
  }

  function validate(showEmpty) {
    var r = current();
    var v = parseAmount();
    var msg = null;
    if (!r) msg = ['Choose a reward, or “No reward”.', 'Scegli una ricompensa, oppure “Nessuna ricompensa”.'];
    else if (amount.value.trim() === '') { if (showEmpty) msg = ['Enter the amount you want to give, for example 25.', 'Inserisci la cifra che vuoi donare, per esempio 25.']; }
    else if (isNaN(v)) msg = ['Use numbers only, for example 25 or 25,50.', 'Usa solo numeri, per esempio 25 oppure 25,50.'];
    else if (v < r.amount) msg = r.id === 'none'
      ? ['The minimum donation is €' + MIN_FREE + '.', 'La donazione minima è di ' + MIN_FREE + ' €.']
      : ['The reward “' + r.title.en + '” needs at least €' + r.amount + '. Raise the amount or choose another reward.', 'La ricompensa “' + r.title.it + '” richiede almeno ' + r.amount + ' €. Aumenta la cifra o scegli un’altra ricompensa.'];
    else if (v > MAX) msg = ['For donations over €10,000, please write to the Funds TOgether office first.', 'Per donazioni oltre 10.000 €, scrivi prima all’ufficio Funds TOgether.'];
    FT.setError(amount, msg && msg[0], msg && msg[1]);
    return msg;
  }

  function renderSummary() {
    var r = current();
    var v = parseAmount();
    var ok = r && !isNaN(v) && v >= r.amount && v <= MAX;
    var reached = p.raised >= p.goal;
    var matchLine = reached
      ? L(p.stretchActive
            ? 'The first goal is already reached and the University match is confirmed. Your donation goes to the new goal.'
            : 'The goal is already reached and the University match is confirmed. Your donation goes to the project.',
          p.stretchActive
            ? 'Il primo obiettivo è già raggiunto e il raddoppio dell’Ateneo è confermato. La tua donazione va al nuovo obiettivo.'
            : 'L’obiettivo è già raggiunto e il raddoppio dell’Ateneo è confermato. La tua donazione va al progetto.')
      : L('If the goal is reached, the University adds the same amount: the research gets ', 'Se l’obiettivo viene raggiunto, l’Ateneo aggiunge la stessa cifra: la ricerca riceve ') + (ok ? '<strong>' + FT.money(v * 2) + '</strong>' : L('twice your donation', 'il doppio della tua donazione')) + '.';
    summary.innerHTML = '<h2>' + L('Summary', 'Riepilogo') + '</h2>' +
      '<dl>' +
        '<dt>' + L('Project', 'Progetto') + '</dt><dd>' + p.short + '</dd>' +
        '<dt>' + L('Reward', 'Ricompensa') + '</dt><dd>' + (r ? L(r.title) : '–') + '</dd>' +
        '<dt class="total">' + L('Your donation', 'La tua donazione') + '</dt><dd class="total">' + (ok ? FT.money(v) : '–') + '</dd>' +
      '</dl>' +
      '<p class="small" style="margin:14px 0">' + matchLine + '</p>' +
      '<ul class="conditions small">' +
        '<li>' + L('Campaign ends on ', 'La campagna scade il ') + FT.date(p.end) + '.</li>' +
        '<li>' + L('All or nothing. ', 'Tutto o niente. ') + L(FT.refundRule) + '</li>' +
      '</ul>';
  }

  function onReward() {
    var r = current();
    if (!r) return;
    var v = parseAmount();
    if (isNaN(v) || v < r.amount) amount.value = r.id === 'none' ? (amount.value && !isNaN(v) ? amount.value : '') : String(r.amount);
    hint.innerHTML = r.id === 'none'
      ? L('Minimum €10.', 'Minimo 10 €.')
      : L('At least €' + r.amount + ' for “' + r.title.en + '”.', 'Almeno ' + r.amount + ' € per “' + r.title.it + '”.');
    var q = r.id === 'none' ? [10, 25, 50, 100] : [r.amount, r.amount * 2];
    document.getElementById('quick').innerHTML = q.map(function (n) {
      return '<button type="button" class="chip" data-v="' + n + '">' + FT.money(n) + '</button>';
    }).join('');
    if (amount.getAttribute('aria-invalid')) validate(false);
    renderSummary();
  }

  list.addEventListener('change', onReward);
  amount.addEventListener('input', function () { if (amount.getAttribute('aria-invalid')) validate(false); renderSummary(); });
  amount.addEventListener('blur', function () { validate(false); });
  document.getElementById('quick').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    amount.value = b.getAttribute('data-v');
    validate(false); renderSummary();
  });

  document.getElementById('support-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = validate(true);
    if (msg) {
      FT.showSummary(errors, [{ id: current() ? 'amount' : list.querySelector('input:not(:disabled)').id || 'amount', en: msg[0], it: msg[1] }]);
      return;
    }
    errors.hidden = true;
    location.href = FT.url('payment.html', { id: p.id, reward: current().id, amount: parseAmount() });
  });

  var pre = FT.params.get('reward');
  var preAmount = FT.params.get('amount');
  var radios = list.querySelectorAll('input');
  for (var i = 0; i < radios.length; i++) {
    radios[i].id = 'reward-' + radios[i].value;
    if (radios[i].value === pre && !radios[i].disabled) radios[i].checked = true;
  }
  if (preAmount) amount.value = preAmount;
  onReward();
  renderSummary();
  document.addEventListener('ft:lang', renderSummary);
  FT.refresh();
});
