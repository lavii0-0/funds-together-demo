/* Researchers' path: a UniTO pre-registration instead of the generic Ginger sign-up (problem B4),
   with inline errors (B11, B12) and a clear confirmation. */
document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;

  var boxes = document.querySelectorAll('#checklist input');
  var saved = [];
  try { saved = JSON.parse(localStorage.getItem('ft-checklist') || '[]'); } catch (e) {}
  function progress() {
    var done = [];
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done.push(boxes[i].value);
    try { localStorage.setItem('ft-checklist', JSON.stringify(done)); } catch (e) {}
    document.getElementById('check-progress').innerHTML = done.length === boxes.length
      ? L('All ready. You can apply as soon as the call opens.', 'Tutto pronto. Potrai candidarti appena apre il bando.')
      : L(done.length + ' of ' + boxes.length + ' ready', done.length + ' su ' + boxes.length + ' pronti');
  }
  for (var i = 0; i < boxes.length; i++) {
    if (saved.indexOf(boxes[i].value) !== -1) boxes[i].checked = true;
    boxes[i].addEventListener('change', progress);
  }
  progress();

  var name = document.getElementById('r-name');
  var role = document.getElementById('r-role');
  var email = document.getElementById('r-email');
  var dept = document.getElementById('r-dept');
  var idea = document.getElementById('r-idea');
  var consent = document.getElementById('r-consent');
  FT.counter(idea);

  var checks = {
    'r-name': function () {
      return name.value.trim().length >= 2 ? null : ['Enter your full name.', 'Inserisci nome e cognome.'];
    },
    'r-role': function () {
      return role.value ? null : ['Choose your role at the University.', 'Scegli il tuo ruolo in Ateneo.'];
    },
    'r-email': function () {
      var v = email.value.trim().toLowerCase();
      if (!v) return ['Enter your university email.', 'Inserisci la tua email istituzionale.'];
      if (!FT.isEmail(v)) return ['This email address looks incomplete, e.g. name.surname@unito.it.', 'L’indirizzo sembra incompleto, es. nome.cognome@unito.it.'];
      if (!/@(edu\.)?unito\.it$/.test(v)) return ['Use your University of Turin address (@unito.it or @edu.unito.it). The call is only open to UniTO staff.', 'Usa il tuo indirizzo dell’Università di Torino (@unito.it o @edu.unito.it). Il bando è riservato al personale UniTO.'];
      return null;
    },
    'r-dept': function () {
      return dept.value.trim() ? null : ['Enter your department.', 'Inserisci il tuo dipartimento.'];
    },
    'r-idea': function () {
      return idea.value.length > 600 ? ['Shorten your idea to 600 characters (now ' + idea.value.length + ').', 'Riduci l’idea a 600 caratteri (ora ' + idea.value.length + ').'] : null;
    },
    'r-consent': function () {
      return consent.checked ? null : ['Tick the box so we can contact you.', 'Spunta la casella per permetterci di contattarti.'];
    }
  };
  var labels = {
    'r-name': ['Full name', 'Nome e cognome'], 'r-role': ['Role', 'Ruolo'], 'r-email': ['University email', 'Email istituzionale'],
    'r-dept': ['Department', 'Dipartimento'], 'r-idea': ['Project idea', 'Idea di progetto'], 'r-consent': ['Consent', 'Consenso']
  };

  function run(id) {
    var el = document.getElementById(id);
    var m = checks[id]();
    FT.setError(el, m && m[0], m && m[1]);
    return m;
  }
  Object.keys(checks).forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('blur', function () { if (el.value || el.type === 'checkbox') run(id); });
    el.addEventListener(el.tagName === 'SELECT' || el.type === 'checkbox' ? 'change' : 'input', function () { if (el.getAttribute('aria-invalid')) run(id); });
  });

  document.getElementById('interest-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var errs = [];
    Object.keys(checks).forEach(function (id) {
      var m = run(id);
      if (m) errs.push({ id: id, en: labels[id][0] + ': ' + m[0], it: labels[id][1] + ': ' + m[1] });
    });
    var box = document.getElementById('errors');
    if (errs.length) { FT.showSummary(box, errs); return; }
    box.hidden = true;
    var btn = document.getElementById('r-submit');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>' + L('Sending…', 'Invio…');
    setTimeout(function () {
      document.getElementById('interest-form').hidden = true;
      var ok = document.getElementById('r-success');
      ok.innerHTML = '<h2>' + L('Interest registered', 'Interesse registrato') + '</h2>' +
        '<p>' + L('Thank you, ' + name.value.trim().split(' ')[0] + '. We will write to <strong>' + email.value.trim() + '</strong> when the next call opens, with the dates of the training.',
                  'Grazie, ' + name.value.trim().split(' ')[0] + '. Scriveremo a <strong>' + email.value.trim() + '</strong> quando apre il prossimo bando, con le date della formazione.') + '</p>' +
        '<p class="small">' + L('This is a simulation: nothing was sent.', 'Questa è una simulazione: non è stato inviato nulla.') + '</p>' +
        '<p><a href="campaigns.html">' + L('Meanwhile, see how the 2026 teams present their projects', 'Intanto, guarda come i gruppi 2026 presentano i loro progetti') + '</a></p>' +
        '<div class="withdraw">' +
          '<p class="small" style="margin:0 0 8px">' + L('Changed your mind? You can withdraw at any time.', 'Hai cambiato idea? Puoi ritirarti in qualsiasi momento.') + '</p>' +
          '<button class="btn btn--ghost" type="button" id="w-open">' + L('Withdraw my request and erase my data', 'Ritira la richiesta e cancella i miei dati') + '</button>' +
        '</div>';
      ok.hidden = false;
      ok.focus();
      FT.refresh();
    }, 900);
  });

  /* ---------- Am I eligible? check (problems B4, B11, B12) ---------- */
  var eName = document.getElementById('e-name');
  var eRole = document.getElementById('e-role');
  var eEmail = document.getElementById('e-email');
  var eTeam = document.getElementById('e-team');
  var eGoal = document.getElementById('e-goal');
  var eChecks = {
    'e-name': function () { return eName.value.trim().length >= 2 ? null : ['Enter your full name.', 'Inserisci nome e cognome.']; },
    'e-role': function () { return eRole.value ? null : ['Choose your role at the University.', 'Scegli il tuo ruolo in Ateneo.']; },
    'e-email': function () {
      var v = eEmail.value.trim().toLowerCase();
      if (!v) return ['Enter your university email.', 'Inserisci la tua email istituzionale.'];
      if (!FT.isEmail(v)) return ['This email address looks incomplete, e.g. name.surname@unito.it.', 'L’indirizzo sembra incompleto, es. nome.cognome@unito.it.'];
      if (!/@(edu\.)?unito\.it$/.test(v)) return ['Use your University of Turin address (@unito.it or @edu.unito.it).', 'Usa il tuo indirizzo dell’Università di Torino (@unito.it o @edu.unito.it).'];
      return null;
    },
    'e-team': function () { return eTeam.value.trim().length >= 3 ? null : ['Describe your team: at least two people.', 'Descrivi il tuo gruppo: almeno due persone.']; },
    'e-goal': function () {
      var v = eGoal.value.trim();
      if (!v) return ['Enter a rough goal.', 'Inserisci un obiettivo orientativo.'];
      var n = Number(v);
      if (isNaN(n) || n < 4700 || n > 10000) return ['The goal must be between €4,700 and €10,000.', 'L’obiettivo deve essere tra 4.700 e 10.000 €.'];
      return null;
    }
  };
  var eLabels = {
    'e-name': ['Full name', 'Nome e cognome'], 'e-role': ['Role', 'Ruolo'], 'e-email': ['University email', 'Email istituzionale'],
    'e-team': ['Team', 'Gruppo'], 'e-goal': ['Rough goal', 'Obiettivo orientativo']
  };
  function eRun(id) {
    var el = document.getElementById(id);
    var m = eChecks[id]();
    FT.setError(el, m && m[0], m && m[1]);
    return m;
  }
  Object.keys(eChecks).forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('blur', function () { if (el.value || el.type === 'textarea') eRun(id); });
    el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', function () { if (el.getAttribute('aria-invalid')) eRun(id); });
  });
  document.getElementById('eligibility-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var errs = [];
    Object.keys(eChecks).forEach(function (id) {
      var m = eRun(id);
      if (m) errs.push({ id: id, en: eLabels[id][0] + ': ' + m[0], it: eLabels[id][1] + ': ' + m[1] });
    });
    var box = document.getElementById('eligibility-errors');
    if (errs.length) { FT.showSummary(box, errs); return; }
    box.hidden = true;
    var eligibleRoles = ['prof', 'researcher', 'fellow', 'staff'];
    var roleOk = eligibleRoles.indexOf(eRole.value) !== -1;
    var emailOk = /@(edu\.)?unito\.it$/.test(eEmail.value.trim().toLowerCase());
    var teamOk = eTeam.value.trim().length >= 3;
    var goalNum = Number(eGoal.value);
    var goalOk = goalNum >= 4700 && goalNum <= 10000;
    var allOk = roleOk && emailOk && teamOk && goalOk;
    var result = document.getElementById('e-result');
    result.className = allOk ? 'success-box' : 'note';
    result.hidden = false;
    var rows = [
      { ok: roleOk, en: 'Role: UniTO staff, researchers, professors or fellows can apply.', it: 'Ruolo: possono candidarsi personale, ricercatori, docenti o assegnisti UniTO.' },
      { ok: emailOk, en: 'Email: a @unito.it or @edu.unito.it address.', it: 'Email: un indirizzo @unito.it o @edu.unito.it.' },
      { ok: teamOk, en: 'Team: at least two people, including who runs the campaign.', it: 'Gruppo: almeno due persone, compreso chi segue la campagna.' },
      { ok: goalOk, en: 'Goal: between €4,700 and €10,000.', it: 'Obiettivo: tra 4.700 e 10.000 €.' }
    ];
    var html = '<h2>' + FT.L(allOk ? 'You look eligible for the next call' : 'Not yet eligible', allOk ? 'Sembri in regola per il prossimo bando' : 'Non ancora in regola') + '</h2>';
    html += '<ul style="margin:8px 0 12px;padding-left:20px">';
    for (var i = 0; i < rows.length; i++) {
      html += '<li>' + (rows[i].ok ? '✓ ' : '✗ ') + FT.L(rows[i].en, rows[i].it) + '</li>';
    }
    html += '</ul>';
    html += '<p class="small muted">' + FT.L('This is an indicative check, not an official decision. Applications are closed now and the next call has no announced date.',
                                              'È una verifica indicativa, non una decisione ufficiale. Le candidature sono chiuse e il prossimo bando non ha ancora una data.') + '</p>';
    if (allOk) {
      html += '<p>' + FT.L('Next step: register your interest below and tick the checklist. We will write to you when the call opens, with the training dates.',
                            'Prossimo passo: registra il tuo interesse qui sotto e spunta la lista. Ti scriveremo all’apertura del bando, con le date della formazione.') + '</p>';
      if (eRole.value === 'fellow') {
        html += '<p>' + FT.L('As a research fellow or PhD student, you apply together with a senior colleague (a professor or researcher) named in your team.',
                              'Come assegnista o dottorando/a, ti candidi insieme a un collega senior (docente o ricercatore) indicato nel gruppo.') + '</p>';
      }
      html += '<div class="flow-actions" style="margin-top:12px"><button class="btn btn--ghost" type="button" id="e-register">' + FT.L('Go to the interest form', 'Vai al modulo di interesse') + '</button></div>';
    } else {
      html += '<p>' + FT.L('Fix the points marked with ✗ and check again. PhD students and research fellows should apply together with a senior colleague.',
                            'Correggi i punti segnati con ✗ e verifica di nuovo. Assegnisti e dottorandi devono candidarsi insieme a un collega senior.') + '</p>';
      if (eRole.value === 'fellow') {
        html += '<p>' + FT.L('As a research fellow or PhD student, you apply together with a senior colleague (a professor or researcher) named in your team.',
                              'Come assegnista o dottorando/a, ti candidi insieme a un collega senior (docente o ricercatore) indicato nel gruppo.') + '</p>';
      }
      html += '<p style="margin-top:12px"><a class="btn btn--ghost" href="contact.html?topic=apply">' + FT.L('Contact the office about applying', 'Contatta l’ufficio per candidarti') + '</a></p>';
    }
    result.innerHTML = html;
    var regBtn = document.getElementById('e-register');
    if (regBtn) {
      regBtn.addEventListener('click', function () {
        document.getElementById('r-name').value = eName.value.trim();
        var allowedRoles = ['prof', 'researcher', 'fellow', 'staff'];
        document.getElementById('r-role').value = (allowedRoles.indexOf(eRole.value) !== -1) ? eRole.value : '';
        document.getElementById('r-email').value = eEmail.value.trim();
        var target = document.getElementById('register');
        if (target) target.scrollIntoView({ block: 'start' });
        var nf = document.getElementById('r-name');
        if (nf) nf.focus();
      });
    }
    result.focus();
    FT.refresh();
  });

  /* ---------- live preview of a campaign card (problem A3) ---------- */
  var pName = document.getElementById('p-name');
  var pTagline = document.getElementById('p-tagline');
  var pTheme = document.getElementById('p-theme');
  var pGoal = document.getElementById('p-goal');
  var pColor = document.getElementById('p-color');
  function updatePreview() {
    var name = (pName.value.trim() || (FT.lang() === 'it' ? 'Il tuo progetto' : 'Your project'));
    var tagline = (pTagline.value.trim() || (FT.lang() === 'it' ? 'Una riga che spiega il progetto a chi non è esperto.' : 'One line that explains the project to a non-expert.'));
    var rawGoal = pGoal.value.trim();
    var goal = rawGoal === '' ? 7000 : Number(rawGoal);
    if (rawGoal !== '' && (isNaN(goal) || goal < 4700 || goal > 10000)) {
      FT.setError(pGoal, 'The goal must be between €4,700 and €10,000.', 'L’obiettivo deve essere tra 4.700 e 10.000 €.');
      FT.refresh();
      return;
    }
    FT.setError(pGoal, null, null);
    if (isNaN(goal) || goal <= 0) goal = 7000;
    var proj = {
      id: 'preview', short: name, theme: pTheme.value, color: pColor.value, end: '2027-06-01',
      title: { en: name, it: name }, tagline: { en: tagline, it: tagline },
      by: (FT.lang() === 'it' ? 'Il tuo gruppo – UniTo' : 'Your team – UniTo'),
      dept: { en: '', it: '' }, goal: goal, raised: 0, donors: 0
    };
    document.getElementById('p-preview').innerHTML = FT.card(proj);
    FT.refresh();
  }
  [pName, pTagline, pGoal].forEach(function (el) { el.addEventListener('input', updatePreview); });
  [pTheme, pColor].forEach(function (el) { el.addEventListener('change', updatePreview); });
  updatePreview();

  /* ---------- withdraw and erase data (problem B10, H3) ---------- */
  document.getElementById('r-success').addEventListener('click', function (e) {
    var ok = document.getElementById('r-success');
    var id = e.target.closest('button') && e.target.closest('button').id;
    if (id === 'w-open') {
      ok.querySelector('.withdraw').innerHTML =
        '<div class="confirm-box" role="alertdialog" aria-labelledby="w-title" tabindex="-1" id="w-box">' +
          '<h3 id="w-title">' + L('Erase your data?', 'Cancellare i tuoi dati?') + '</h3>' +
          '<p>' + L('We will delete your name, email, department and idea. You will not be told when the call opens. This cannot be undone.',
                    'Cancelleremo nome, email, dipartimento e idea. Non riceverai l’avviso di apertura del bando. L’operazione non si può annullare.') + '</p>' +
          '<div class="flow-actions">' +
            '<button class="btn btn--danger" type="button" id="w-yes">' + L('Yes, erase my data', 'Sì, cancella i miei dati') + '</button>' +
            '<button class="btn btn--ghost" type="button" id="w-no">' + L('No, keep my request', 'No, mantieni la richiesta') + '</button>' +
          '</div>' +
        '</div>';
      document.getElementById('w-box').focus();
    } else if (id === 'w-no') {
      ok.querySelector('.withdraw').innerHTML =
        '<p class="small" style="margin:0 0 8px">' + L('Your request is still active.', 'La tua richiesta è ancora attiva.') + '</p>' +
        '<button class="btn btn--ghost" type="button" id="w-open">' + L('Withdraw my request and erase my data', 'Ritira la richiesta e cancella i miei dati') + '</button>';
    } else if (id === 'w-yes') {
      ok.innerHTML = '<h2>' + L('Request withdrawn', 'Richiesta ritirata') + '</h2>' +
        '<p>' + L('Your data has been erased. We will not contact you about the call.', 'I tuoi dati sono stati cancellati. Non ti contatteremo per il bando.') + '</p>' +
        '<p class="small">' + L('This is a simulation: nothing was stored.', 'Questa è una simulazione: non è stato salvato nulla.') + '</p>' +
        '<button class="btn btn--ghost" type="button" id="w-again">' + L('Register again', 'Registrati di nuovo') + '</button>';
      ok.focus();
    } else if (id === 'w-again') {
      var form = document.getElementById('interest-form');
      form.reset();
      FT.counter(idea);
      ok.hidden = true;
      form.hidden = false;
      var btn = document.getElementById('r-submit');
      btn.disabled = false;
      btn.innerHTML = L('Register my interest', 'Registra il mio interesse');
      name.focus();
    }
  });

  FT.refresh();
});
