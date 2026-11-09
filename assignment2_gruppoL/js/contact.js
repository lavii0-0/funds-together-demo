document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;

  var ROUTES = {
    payment: { who: { en: 'Ginger support answers this', it: 'Risponde l’assistenza Ginger' },
      why: { en: 'Ginger is the platform that manages payments, refunds and donation certificates.', it: 'Ginger è la piattaforma che gestisce pagamenti, rimborsi e attestati di donazione.' },
      time: { en: 'Usually within 1 working day.', it: 'Di solito entro 1 giorno lavorativo.' }, to: 'Ginger' },
    project: { who: { en: 'The project team answers this', it: 'Risponde il gruppo del progetto' },
      why: { en: 'Only the researchers can answer about their work and send the rewards.', it: 'Solo i ricercatori possono rispondere sul loro lavoro e inviare le ricompense.' },
      time: { en: 'Usually within 3 working days.', it: 'Di solito entro 3 giorni lavorativi.' }, to: 'team' },
    programme: { who: { en: 'The Funds TOgether office answers this', it: 'Risponde l’ufficio Funds TOgether' },
      why: { en: 'The University runs the programme and pays the match, and also answers questions from press and communication offices.', it: 'L’Ateneo gestisce il programma e versa il raddoppio, e risponde anche alle domande di stampa e uffici comunicazione.' },
      time: { en: 'Usually within 3 working days.', it: 'Di solito entro 3 giorni lavorativi.' }, to: 'office' },
    apply: { who: { en: 'The Funds TOgether office answers this', it: 'Risponde l’ufficio Funds TOgether' },
      why: { en: 'Applications go through the University, not through a Ginger account.', it: 'Le candidature passano dall’Ateneo, non da un account Ginger.' },
      time: { en: 'Usually within 3 working days.', it: 'Di solito entro 3 giorni lavorativi.' }, to: 'office', link: true }
  };

  var topicBox = document.querySelector('.route');
  var result = document.getElementById('route-result');
  var form = document.getElementById('contact-form');
  var projSel = document.getElementById('c-project');
  var topic = null;

  projSel.innerHTML = '<option value="" data-en="Choose a project…" data-it="Scegli un progetto…">Choose a project…</option>' +
    FT.projects.map(function (p) { return '<option value="' + p.id + '">' + p.short + '</option>'; }).join('');

  function recipient() {
    var r = ROUTES[topic];
    if (r.to === 'Ginger') return { en: 'Ginger support', it: 'all’assistenza Ginger' };
    if (r.to === 'office') return { en: 'the Funds TOgether office', it: 'all’ufficio Funds TOgether' };
    var p = FT.getProject(projSel.value);
    return p ? { en: 'the ' + p.short + ' team', it: 'al gruppo ' + p.short } : { en: 'the project team', it: 'al gruppo del progetto' };
  }

  function show() {
    var r = ROUTES[topic];
    result.innerHTML = '<h2 style="font-size:1.25rem">' + L(r.who) + '</h2><p>' + L(r.why) + ' ' + L(r.time) + '</p>' +
      (r.link ? '<p style="margin:0"><a href="propose.html">' + L('First read how the call works', 'Prima leggi come funziona il bando') + '</a></p>' : '');
    result.hidden = false;
    form.hidden = false;
    document.getElementById('project-field').hidden = topic !== 'project';
    document.getElementById('ref-field').hidden = topic !== 'payment';
    var to = recipient();
    document.getElementById('form-h').innerHTML = L('Write to ' + to.en, 'Scrivi ' + to.it);
    document.getElementById('c-submit').innerHTML = L('Send to ' + to.en, 'Invia ' + to.it);
    FT.refresh();
  }

  topicBox.addEventListener('change', function (e) { topic = e.target.value; show(); });
  projSel.addEventListener('change', function () { if (topic) show(); if (projSel.getAttribute('aria-invalid')) FT.setError(projSel); });

  var pre = FT.params.get('topic');
  if (pre && ROUTES[pre]) {
    topic = pre;
    topicBox.querySelector('input[value="' + pre + '"]').checked = true;
    if (FT.params.get('id')) projSel.value = FT.params.get('id');
    show();
  }

  var name = document.getElementById('c-name');
  var email = document.getElementById('c-email');
  var msg = document.getElementById('c-msg');
  FT.counter(msg);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var errs = [];
    if (topic === 'project' && !projSel.value) { FT.setError(projSel, 'Choose the project your question is about.', 'Scegli il progetto a cui si riferisce la domanda.'); errs.push({ id: 'c-project', en: 'Choose a project', it: 'Scegli un progetto' }); } else FT.setError(projSel);
    if (name.value.trim().length < 2) { FT.setError(name, 'Enter your name.', 'Inserisci il tuo nome.'); errs.push({ id: 'c-name', en: 'Enter your name', it: 'Inserisci il tuo nome' }); } else FT.setError(name);
    if (!FT.isEmail(email.value.trim())) { FT.setError(email, 'Enter a valid email address, so we can reply.', 'Inserisci un indirizzo email valido, per poterti rispondere.'); errs.push({ id: 'c-email', en: 'Enter a valid email address', it: 'Inserisci un indirizzo email valido' }); } else FT.setError(email);
    var len = msg.value.trim().length;
    if (len < 10) { FT.setError(msg, 'Write your question (at least 10 characters).', 'Scrivi la tua domanda (almeno 10 caratteri).'); errs.push({ id: 'c-msg', en: 'Write your question', it: 'Scrivi la tua domanda' }); }
    else if (len > 1000) { FT.setError(msg, 'Shorten the message to 1,000 characters.', 'Riduci il messaggio a 1.000 caratteri.'); errs.push({ id: 'c-msg', en: 'Message too long', it: 'Messaggio troppo lungo' }); }
    else FT.setError(msg);
    var box = document.getElementById('errors');
    if (errs.length) { FT.showSummary(box, errs); return; }
    box.hidden = true;
    var to = recipient();
    var r = ROUTES[topic];
    form.hidden = true;
    var ok = document.getElementById('c-success');
    ok.innerHTML = '<h2>' + L('Message sent to ' + to.en, 'Messaggio inviato ' + to.it) + '</h2><p>' +
      L('You will receive the reply at <strong>' + email.value.trim() + '</strong>. ', 'Riceverai la risposta a <strong>' + email.value.trim() + '</strong>. ') + L(r.time) + '</p>' +
      '<p class="small" style="margin:0">' + L('This is a simulation: nothing was sent.', 'Questa è una simulazione: non è stato inviato nulla.') + '</p>';
    ok.hidden = false;
    ok.focus();
  });

  FT.refresh();
});
