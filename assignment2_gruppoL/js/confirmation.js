document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;
  var root = document.getElementById('confirm-root');
  var p = FT.getProject(FT.params.get('id'));
  var amount = parseFloat(FT.params.get('amount'));
  if (!p || isNaN(amount)) { location.replace(FT.url('campaigns.html')); return; }

  var donor = {};
  try { donor = JSON.parse(sessionStorage.getItem('ft-donor') || '{}'); } catch (e) {}
  var first = donor.name ? donor.name.split(' ')[0] : '';
  var reward = null;
  p.rewards.forEach(function (r) { if (r.id === FT.params.get('reward')) reward = r; });
  var method = null;
  FT.paymentMethods.forEach(function (m) { if (m.id === FT.params.get('method')) method = m; });
  var reached = p.raised >= p.goal;
  var ref = 'FT26-' + p.short.replace(/[^A-Z]/gi, '').slice(0, 3).toUpperCase() + '-' + (1000 + Math.round(amount * 7) % 9000);

  var next = reached
    ? '<li><time>' + FT.date(p.end) + '</time><h3>' + L('The campaign closes', 'La campagna si chiude') + '</h3><p>' +
        L(p.stretchActive
            ? 'The first goal is already reached, so your donation is confirmed and the University match is guaranteed. The team starts the research and sends your reward.'
            : 'The goal is already reached, so your donation is confirmed and the University match is guaranteed. The team starts the research and sends your reward.',
          p.stretchActive
            ? 'Il primo obiettivo è già raggiunto: la tua donazione è confermata e il raddoppio dell’Ateneo è garantito. Il gruppo avvia la ricerca e ti invia la ricompensa.'
            : 'L’obiettivo è già raggiunto: la tua donazione è confermata e il raddoppio dell’Ateneo è garantito. Il gruppo avvia la ricerca e ti invia la ricompensa.') + '</p></li>'
    : '<li><time>' + FT.date(p.end) + '</time><h3>' + L('The campaign closes', 'La campagna si chiude') + '</h3><p>' +
        L('If the goal of ', 'Se l’obiettivo di ') + FT.money(p.goal) + L(' is reached, the University adds ', ' viene raggiunto, l’Ateneo aggiunge ') + FT.money(Math.min(p.goal, 10000)) +
        L(' and the research starts. If it is not reached, you get your donation back, minus the payment fees. We tell you by email in both cases.', ' e la ricerca parte. Se non viene raggiunto, ti restituiamo la donazione al netto delle commissioni. In entrambi i casi ti avvisiamo via email.') + '</p></li>';

  root.innerHTML = '' +
    '<div>' +
      '<div class="confirm-head">' +
        '<span class="confirm-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>' +
        '<div><h1 style="font-size:2.4rem">' + (first ? L('Thank you, ' + first + '!', 'Grazie, ' + first + '!') : L('Thank you!', 'Grazie!')) + '</h1>' +
        '<p class="lead">' + L('Your donation of ', 'La tua donazione di ') + '<strong>' + FT.money(amount) + '</strong>' + L(' to ', ' a ') + '<strong>' + p.short + '</strong>' + L(' is recorded.', ' è registrata.') + '</p></div>' +
      '</div>' +
      '<p class="note note--info small" style="margin:20px 0 34px">' + L('This is a simulation: no money was taken and no email is sent.', 'Questa è una simulazione: non è stato addebitato nulla e non viene inviata alcuna email.') + '</p>' +

      '<h2>' + L('What happens next', 'Cosa succede adesso') + '</h2>' +
      '<ol class="timeline" style="margin-top:18px">' +
        '<li class="is-now"><time>' + L('Today', 'Oggi') + '</time><h3>' + L('Certificate by email', 'Attestato via email') + '</h3><p>' +
          (donor.email ? L('We send your donation certificate to ', 'Inviamo l’attestato di donazione a ') + '<strong>' + donor.email + '</strong>.' : L('We send your donation certificate to your email address.', 'Inviamo l’attestato di donazione al tuo indirizzo email.')) +
          (method && method.id === 'transfer' ? ' ' + L('You also receive the bank details: the transfer must arrive before ', 'Ricevi anche le coordinate bancarie: il bonifico deve arrivare prima del ') + FT.date(p.end) + '.' : '') + '</p></li>' +
        '<li><time>' + L('Until ', 'Fino al ') + FT.date(p.end) + '</time><h3>' + L('Follow the campaign', 'Segui la campagna') + '</h3><p>' +
          (donor.upd === false ? L('You chose not to receive updates. You can still read them on the project page.', 'Hai scelto di non ricevere aggiornamenti. Puoi comunque leggerli nella pagina del progetto.')
                               : L('You receive the team’s updates by email. They are also on the project page.', 'Ricevi via email gli aggiornamenti del gruppo. Sono anche nella pagina del progetto.')) + '</p></li>' +
        next +
      '</ol>' +

      '<h2 style="margin-top:20px">' + L('Help the project reach more people', 'Aiuta il progetto a raggiungere più persone') + '</h2>' +
      '<p>' + L('Sharing is the second best way to help.', 'Condividere è il secondo modo migliore per aiutare.') + '</p>' +
      '<div class="flow-actions" style="margin-top:0">' +
        '<button type="button" class="btn btn--ghost" id="copy">' + L('Copy the project link', 'Copia il link del progetto') + '</button>' +
        '<span id="copy-status" class="field-ok" role="status"></span>' +
      '</div>' +
      '<div class="flow-actions">' +
        '<a class="btn" href="' + FT.url('project.html', { id: p.id }) + '#updates">' + L('Back to the project', 'Torna al progetto') + '</a>' +
        '<a href="campaigns.html">' + L('Discover the other campaigns', 'Scopri le altre campagne') + '</a>' +
      '</div>' +
    '</div>' +

    '<aside class="panel summary"><h2>' + L('Your donation', 'La tua donazione') + '</h2><dl>' +
      '<dt>' + L('Reference', 'Riferimento') + '</dt><dd>' + ref + '</dd>' +
      '<dt>' + L('Project', 'Progetto') + '</dt><dd>' + p.short + '</dd>' +
      '<dt>' + L('Reward', 'Ricompensa') + '</dt><dd>' + (reward ? L(reward.title) : L('No reward', 'Nessuna ricompensa')) + '</dd>' +
      '<dt>' + L('Payment', 'Pagamento') + '</dt><dd>' + (method ? L(method.en, method.it) : '–') + '</dd>' +
      '<dt>' + L('In the supporters list', 'Nell’elenco sostenitori') + '</dt><dd>' + (donor.pub === false ? L('Anonymous', 'Anonimo') : L('With your name', 'Con il tuo nome')) + '</dd>' +
      '<dt class="total">' + L('Amount', 'Importo') + '</dt><dd class="total">' + FT.money(amount) + '</dd>' +
    '</dl><p class="small muted" style="margin-top:12px">' + L('Questions about this payment? ', 'Domande su questo pagamento? ') + '<a href="contact.html?topic=payment">' + L('Contact Ginger support', 'Contatta l’assistenza Ginger') + '</a></p></aside>';

  document.getElementById('copy').addEventListener('click', function () {
    var link = 'https://www.ideaginger.it/partner-progetti/universita-di-torino.html#' + p.id;
    var status = document.getElementById('copy-status');
    FT.copy(link, status, { success: L('Link copied', 'Link copiato') });
  });

  FT.refresh();
});
