/* FAQ grouped by audience, with search (Assignment 1, problems B1 and B2) */
document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;

  var CATS = [
    { id: 'all', en: 'All questions', it: 'Tutte le domande' },
    { id: 'donate', en: 'Donating', it: 'Donare' },
    { id: 'pay', en: 'Payments and refunds', it: 'Pagamenti e rimborsi' },
    { id: 'unito', en: 'Funds TOgether and the University', it: 'Funds TOgether e l’Ateneo' },
    { id: 'research', en: 'For researchers', it: 'Per i ricercatori' }
  ];

  var methods = FT.paymentMethods.map(function (m) { return m.en; }).join(', ');
  var metodi = FT.paymentMethods.map(function (m) { return m.it; }).join(', ');

  var QA = [
    { c: 'donate', q: { en: 'Do I need an account to donate?', it: 'Serve un account per donare?' },
      a: { en: 'No. You only need your name and an email address, where you receive the certificate and the updates.', it: 'No. Servono solo il tuo nome e un indirizzo email, dove ricevi l’attestato e gli aggiornamenti.' } },
    { c: 'donate', q: { en: 'Can I donate without choosing a reward?', it: 'Posso donare senza scegliere una ricompensa?' },
      a: { en: 'Yes. Choose “No reward” and give any amount from €10.', it: 'Sì. Scegli “Nessuna ricompensa” e dona qualsiasi cifra da 10 €.' } },
    { c: 'donate', q: { en: 'Can I change the reward after choosing it?', it: 'Posso cambiare la ricompensa dopo averla scelta?' },
      a: { en: 'Yes, until you confirm the donation. On the payment step, use “Change reward or amount”: what you entered is kept.', it: 'Sì, fino alla conferma. Nel passaggio del pagamento usa “Cambia ricompensa o cifra”: i dati inseriti restano.' } },
    { c: 'donate', q: { en: 'Can I stay anonymous?', it: 'Posso restare anonimo?' },
      a: { en: 'Yes. Untick “Show my name in the list of supporters”. You are still counted in the total of supporters.', it: 'Sì. Togli la spunta da “Mostra il mio nome nell’elenco dei sostenitori”. Vieni comunque conteggiato nel totale.' } },
    { c: 'donate', q: { en: 'Can I donate after a project has reached its goal?', it: 'Posso donare dopo che un progetto ha raggiunto l’obiettivo?' },
      a: { en: 'Yes, until the end date. Some teams open a new goal: it is shown in the funding box of the project.', it: 'Sì, fino alla scadenza. Alcuni gruppi aprono un nuovo obiettivo: lo trovi nel riquadro della raccolta del progetto.' } },
    { c: 'pay', q: { en: 'Which payment methods can I use?', it: 'Quali metodi di pagamento posso usare?' },
      a: { en: methods + '. The same methods are available for every campaign.', it: metodi + '. Gli stessi metodi valgono per tutte le campagne.' } },
    { c: 'pay', q: { en: 'What happens if the project does not reach its goal?', it: 'Cosa succede se il progetto non raggiunge l’obiettivo?' },
      a: FT.refundRule },
    { c: 'pay', q: { en: 'Are there any fees?', it: 'Ci sono commissioni?' },
      a: { en: 'Ginger keeps no commission. Card and PayPal providers charge the project a small fee; bank transfers have none.', it: 'Ginger non trattiene commissioni. I gestori di carte e PayPal applicano al progetto una piccola commissione; il bonifico no.' } },
    { c: 'pay', q: { en: 'Can I get a certificate for tax purposes?', it: 'Posso avere un attestato per il fisco?' },
      a: { en: 'You receive a donation certificate by email after each donation. Traceable donations to university research may be tax deductible: ask your tax advisor.', it: 'Ricevi un attestato di donazione via email dopo ogni donazione. Le donazioni tracciabili alla ricerca universitaria possono essere deducibili: chiedi al tuo consulente fiscale.' } },
    { c: 'unito', q: { en: 'What does “the University doubles” mean?', it: 'Cosa significa “l’Ateneo raddoppia”?' },
      a: { en: 'When a project reaches 100% of its goal, the University of Turin adds the same amount, up to €10,000 per project. If the goal is not reached, there is no match.', it: 'Quando un progetto raggiunge il 100% dell’obiettivo, l’Università di Torino aggiunge la stessa cifra, fino a 10.000 € per progetto. Se l’obiettivo non viene raggiunto, non c’è raddoppio.' } },
    { c: 'unito', q: { en: 'Who runs Funds TOgether?', it: 'Chi gestisce Funds TOgether?' },
      a: { en: 'The University of Turin selects the projects, trains the teams and pays the match. Ginger, a crowdfunding platform, manages the payments. Each research team runs its own campaign.', it: 'L’Università di Torino seleziona i progetti, forma i gruppi e versa il raddoppio. Ginger, una piattaforma di crowdfunding, gestisce i pagamenti. Ogni gruppo di ricerca gestisce la propria campagna.' } },
    { c: 'unito', q: { en: 'Who do I contact with a question?', it: 'Chi contatto per una domanda?' },
      a: { en: 'For payments and refunds: Ginger support. For the programme, the match or applications: fundstogether@unito.it. For a specific project: its team, from the project page.', it: 'Per pagamenti e rimborsi: l’assistenza Ginger. Per il programma, il raddoppio o le candidature: fundstogether@unito.it. Per un progetto: il suo gruppo, dalla pagina del progetto.' } },
    { c: 'research', q: { en: 'Who can propose a project?', it: 'Chi può proporre un progetto?' },
      a: { en: 'Teams of researchers, professors and staff of the University of Turin.', it: 'Gruppi di ricercatori, docenti e personale dell’Università di Torino.' } },
    { c: 'research', q: { en: 'When is the next call?', it: 'Quando esce il prossimo bando?' },
      a: { en: 'The date has not been announced yet. Register your interest on the “Propose a project” page and we will write to you when it opens.', it: 'La data non è ancora stata annunciata. Registra il tuo interesse nella pagina “Proponi un progetto” e ti scriveremo all’apertura.' } },
    { c: 'research', q: { en: 'Do I need to create a Ginger account to apply?', it: 'Devo creare un account Ginger per candidarmi?' },
      a: { en: 'No. You apply to the University’s call first. Only selected teams open their campaign on Ginger, with the help of a campaign manager.', it: 'No. Prima ti candidi al bando dell’Ateneo. Solo i gruppi selezionati aprono la campagna su Ginger, con l’aiuto di un campaign manager.' } }
  ];

  var cat = 'all';
  var input = document.getElementById('faq-q');
  var listEl = document.getElementById('faq-list');
  var catsEl = document.getElementById('cats');

  catsEl.innerHTML = CATS.map(function (c) {
    var n = c.id === 'all' ? QA.length : QA.filter(function (x) { return x.c === c.id; }).length;
    return '<button type="button" class="chip" data-c="' + c.id + '" aria-pressed="' + (c.id === cat) + '">' + L(c.en, c.it) + ' (' + n + ')</button>';
  }).join('');

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function render() {
    var term = norm(input.value.trim());
    var items = QA.filter(function (x) {
      if (cat !== 'all' && x.c !== cat) return false;
      if (!term) return true;
      return norm(x.q.en + ' ' + x.q.it + ' ' + x.a.en + ' ' + x.a.it).indexOf(term) !== -1;
    });
    var catName = {};
    CATS.forEach(function (c) { catName[c.id] = c; });
    listEl.innerHTML = items.map(function (x) {
      return '<details class="qa"' + (term ? ' open' : '') + '><summary>' + L(x.q) + '<span class="qa-cat">' + L(catName[x.c].en, catName[x.c].it) + '</span></summary><div class="qa-body"><p>' + L(x.a) + '</p></div></details>';
    }).join('');
    document.getElementById('faq-empty').hidden = items.length > 0;
    document.getElementById('faq-count').innerHTML = L(items.length + (items.length === 1 ? ' question' : ' questions'), items.length + (items.length === 1 ? ' domanda' : ' domande'));
    var chips = catsEl.querySelectorAll('.chip');
    for (var i = 0; i < chips.length; i++) chips[i].setAttribute('aria-pressed', chips[i].getAttribute('data-c') === cat ? 'true' : 'false');
    FT.refresh();
  }

  catsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (!b) return;
    cat = b.getAttribute('data-c');
    render();
  });
  input.addEventListener('input', render);
  render();
});
