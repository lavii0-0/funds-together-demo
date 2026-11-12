document.addEventListener('ft:ready', function () {
  var FT = window.FT, L = FT.L;
  var root = document.getElementById('project-root');
  var p = FT.getProject(FT.params.get('id') || 'mind-the-climate');

  if (!p) {
    root.innerHTML = '<div class="wrap page-head"><h1>' + L('We could not find this project', 'Non troviamo questo progetto') + '</h1>' +
      '<p class="lead">' + L('The link may be incomplete. All the open campaigns are listed on the Campaigns page.', 'Il link potrebbe essere incompleto. Tutte le campagne aperte sono nella pagina Campagne.') + '</p>' +
      '<a class="btn" href="campaigns.html">' + L('See all campaigns', 'Vedi tutte le campagne') + '</a></div>';
    FT.refresh();
    return;
  }

  document.body.setAttribute('data-title-en', p.short);
  document.body.setAttribute('data-title-it', p.short);
  document.body.style.setProperty('--accent', p.color);

  var st = FT.status(p);
  var reached = p.raised >= p.goal;
  var activeGoal = FT.activeGoal(p);
  var pct = Math.round(p.raised / activeGoal * 100);
  var match = Math.min(p.goal, 10000);
  var days = FT.daysLeft(p);

  /* ---------- funding box: one goal, the match and the conditions in one place (A3, A6, A10) ---------- */
  var goalText = reached
    ? (p.stretch && p.stretchActive
        ? '<strong>' + L('First goal of ', 'Primo obiettivo di ') + FT.money(p.goal) + L(' reached.', ' raggiunto.') + '</strong> ' +
          L('The University adds ', 'L’Ateneo aggiunge ') + FT.money(match) +
          L('. The campaign is now collecting for a new goal of ', '. La campagna ora raccoglie per un nuovo obiettivo di ') + FT.money(activeGoal) +
          L(' and stays open until ', ' e resta aperta fino al ') + FT.date(p.end) + '.'
        : L('<strong>Goal reached.</strong> Donors passed the goal of ', '<strong>Obiettivo raggiunto.</strong> I donatori hanno superato l’obiettivo di ') + FT.money(p.goal) +
          L(', so the University adds ', ', quindi l’Ateneo aggiunge ') + FT.money(match) + L('. The campaign stays open until ', '. La campagna resta aperta fino al ') + FT.date(p.end) + '.')
    : L('<strong>Goal: </strong>', '<strong>Obiettivo: </strong>') + '<strong>' + FT.money(p.goal) + L(' by ', ' entro il ') + FT.date(p.end) + '.</strong> ' +
      L('If donors reach it, the University adds ', 'Se i donatori lo raggiungono, l’Ateneo aggiunge ') + FT.money(match) +
      L(': the research gets ', ': la ricerca riceve ') + FT.money(p.goal + match) + '.';

  var stretchBox = (p.stretch && p.stretchActive)
    ? '<div class="stretch"><strong>' + L('Now collecting for a new goal', 'Ora in raccolta per un nuovo obiettivo') + '</strong><br>' + L(p.stretch) + '</div>' : '';

  var methods = FT.paymentMethods.map(function (m) { return L(m.en, m.it); }).join(', ');

  var box = '' +
    '<aside class="panel funding-box" aria-label="Funding">' +
      '<p class="status status--' + st.cls + '">' + st.html + '</p>' +
      '<div style="margin-top:14px">' + FT.meter(p, true) + '</div>' +
      '<div class="facts-row">' +
        '<div><strong>' + pct + '%</strong><span>' + L('of the goal', 'dell’obiettivo') + '</span></div>' +
        '<div><strong>' + p.donors + '</strong><span>' + L('donors', 'donatori') + '</span></div>' +
        '<div><strong>' + days + '</strong><span>' + L('days left', 'giorni rimasti') + '</span></div>' +
      '</div>' +
      '<p style="margin:16px 0 0;font-size:.97rem">' + goalText + '</p>' +
      stretchBox +
      '<a class="btn btn--block" href="' + FT.url('support.html', { id: p.id }) + '">' + L('Support this project', 'Sostieni questo progetto') + '</a>' +
      '<ul class="conditions">' +
        '<li>' + L('All or nothing. ', 'Tutto o niente. ') + L(FT.refundRule) + '</li>' +
        '<li class="c-match">' + L('The University doubles what donors raise, up to €10,000, once the goal is reached.', 'L’Ateneo raddoppia quanto raccolto dai donatori, fino a 10.000 €, quando l’obiettivo è raggiunto.') + '</li>' +
        '<li>' + L('No account needed. Pay by ', 'Non serve un account. Paghi con ') + methods + '.</li>' +
      '</ul>' +
      '<p class="small" style="margin:12px 0 0"><a href="how-it-works.html#rules">' + L('All the rules in plain words', 'Tutte le regole in parole semplici') + '</a></p>' +
      '<div class="share-box" style="margin-top:16px;padding-top:16px;border-top:1px solid var(--line)">' +
        '<h3 style="font-size:1.05rem;margin:0 0 10px">' + L('Share this campaign', 'Condividi la campagna') + '</h3>' +
        '<div class="field">' +
          '<label for="share-link">' + L('Stable link', 'Link stabile') + '</label>' +
          '<div class="share-row">' +
            '<input id="share-link" type="text" autocomplete="off" readonly value="' + ('project.html?id=' + p.id) + '">' +
            '<button type="button" class="btn btn--ghost" id="copy-link">' + L('Copy link', 'Copia link') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="field">' +
          '<label for="share-text">' + L('Ready-to-paste text', 'Testo pronto da incollare') + '</label>' +
          '<textarea id="share-text" rows="6" autocomplete="off" readonly></textarea>' +
          '<div class="flow-actions" style="margin-top:8px">' +
            '<button type="button" class="btn btn--ghost" id="copy-text">' + L('Copy text', 'Copia testo') + '</button>' +
            '<span id="share-status" class="field-ok" role="status" aria-live="polite"></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</aside>';

  var aboutHtml = p.about.en.map(function (para, i) { return '<p>' + L(para, p.about.it[i]) + '</p>'; }).join('');

  function avail(r) {
    if (r.left === 0) return '<span class="avail avail--none">' + L('Sold out', 'Esaurita') + '</span>';
    if (r.left == null) return '<span class="avail">' + L('Available', 'Disponibile') + '</span>';
    return '<span class="avail' + (r.left <= 5 ? ' avail--few' : '') + '">' + L(r.left + ' left', (r.left === 1 ? '1 rimasta' : r.left + ' rimaste')) + '</span>';
  }
  var rewardsHtml = '' +
    '<div class="reward">' +
      '<span class="reward-amount">' + L('Any', 'Libera') + '</span>' +
      '<div><h3>' + L('Give without a reward', 'Dona senza ricompensa') + '</h3><p>' + L('Choose any amount. Every euro counts towards the goal.', 'Scegli qualsiasi cifra. Ogni euro conta per l’obiettivo.') + '</p></div>' +
      '<a class="btn btn--ghost" href="' + FT.url('support.html', { id: p.id, reward: 'none' }) + '">' + L('Choose', 'Scegli') + '</a>' +
    '</div>' +
    p.rewards.map(function (r) {
      var sold = r.left === 0;
      return '<div class="reward' + (sold ? ' is-soldout' : '') + '">' +
        '<span class="reward-amount">' + FT.money(r.amount) + '</span>' +
        '<div><h3>' + L(r.title) + ' ' + avail(r) + '</h3><p>' + L(r.desc) + '</p>' +
          (r.backers ? '<p class="small">' + L(r.backers + ' supporters chose this', r.backers + ' sostenitori l’hanno scelta') + '</p>' : '') + '</div>' +
        (sold ? '<span class="muted small">' + L('Not available', 'Non disponibile') + '</span>'
              : '<a class="btn btn--ghost" href="' + FT.url('support.html', { id: p.id, reward: r.id }) + '" aria-label="' + (FT.lang() === 'it' ? 'Scegli ' : 'Choose ') + r.amount + ' €">' + L('Choose', 'Scegli') + '</a>') +
      '</div>';
    }).join('');

  var hasAmounts = p.budget.every(function (b) { return b.amount != null; });
  var budgetHtml;
  if (hasAmounts) {
    var base = p.budget.filter(function (b) { return !b.stretch; });
    var total = base.reduce(function (s, b) { return s + b.amount; }, 0);
    budgetHtml = '<div class="table-scroll" role="region" tabindex="0" aria-label="' + (FT.lang() === 'it' ? 'Come verranno usati i fondi (tabella scorrevole)' : 'How the money will be used (scrollable table)') + '"><table class="budget"><thead><tr><th scope="col">' + L('What the money pays for', 'A cosa servono i fondi') + '</th><th scope="col" class="num">' + L('Amount', 'Importo') + '</th><th scope="col">' + L('Share', 'Quota') + '</th></tr></thead><tbody>' +
      p.budget.map(function (b) {
        return '<tr><td>' + L(b.en, b.it) + (b.stretch ? ' <span class="avail avail--few">' + L('new goal', 'nuovo obiettivo') + '</span>' : '') + '</td><td class="num">' + FT.money(b.amount) + '</td>' +
          '<td>' + (b.stretch ? '' : '<div class="share"><span style="width:' + Math.round(b.amount / total * 100) + '%"></span></div>') + '</td></tr>';
      }).join('') +
      '</tbody><tfoot><tr><td>' + L('First goal with the University match', 'Primo obiettivo con il raddoppio dell’Ateneo') + '<br><span class="small muted">' + FT.money(p.goal) + L(' from donors + ', ' dai donatori + ') + FT.money(match) + L(' from the University', ' dall’Ateneo') + '</span></td><td class="num">' + FT.money(total) + '</td><td></td></tr></tfoot></table></div>';
  } else {
    budgetHtml = '<ul>' + p.budget.map(function (b) { return '<li>' + L(b.en, b.it) + '</li>'; }).join('') + '</ul>' +
      '<p class="note note--info small">' + L('The team lists what the funds pay for, but not the amount of each item. With the University match the project gets ', 'Il gruppo indica a cosa servono i fondi, ma non l’importo di ogni voce. Con il raddoppio dell’Ateneo il progetto riceve ') + FT.money(p.goal + match) + '.</p>';
  }
  if (p.stretch && !p.stretchActive) {
    budgetHtml += '<h3 style="margin-top:22px">' + L('If more than the goal is raised', 'Se si raccoglie più dell’obiettivo') + '</h3><p>' + L(p.stretch) + '</p>';
  }

  var teamHtml = '<ul class="team">' + p.team.map(function (m) {
    var ini = m.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
    return '<li><span class="avatar" aria-hidden="true">' + ini + '</span><div><strong>' + m.name + '</strong><span>' + L(m.role) + '</span></div></li>';
  }).join('') + '</ul>' +
  '<p style="margin-top:16px">' + L('Questions for the team?', 'Domande per il gruppo?') + ' <a href="' + FT.url('contact.html', { topic: 'project', id: p.id }) + '">' + L('Write to ' + p.by, 'Scrivi a ' + p.by) + '</a></p>';

  var updatesHtml = p.updates.length
    ? '<ol class="timeline">' + p.updates.map(function (u, i) {
        return '<li' + (i === 0 ? ' class="is-now"' : '') + '><time datetime="' + u.date + '">' + FT.date(u.date) + '</time><h3>' + L(u.title) + '</h3><p>' + L(u.text) + '</p></li>';
      }).join('') + '</ol>'
    : '<div class="empty" style="padding:26px"><p style="margin:0">' + L('No updates yet. When the team posts news, it appears here and supporters receive it by email.', 'Ancora nessun aggiornamento. Quando il gruppo pubblica una notizia, compare qui e i sostenitori la ricevono via email.') + '</p></div>';

  var supHtml = '<p>' + L('<strong>' + p.donors + ' supporters.</strong> People who agreed to show their name are listed; the others are counted in the total but stay anonymous.',
                          '<strong>' + p.donors + ' sostenitori.</strong> Chi ha accettato di mostrare il nome compare nell’elenco; gli altri sono conteggiati nel totale ma restano anonimi.') + '</p>' +
    '<ul class="supporters">' + p.supporters.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '<li class="muted">' + L('and others', 'e altri') + '</li></ul>' +
    '<p class="small muted">' + L('In this prototype, names are replaced by sample initials.', 'In questo prototipo i nomi sono sostituiti da iniziali di esempio.') + '</p>';

  var tabs = [
    ['about', L('About', 'Il progetto')], ['rewards', L('Rewards', 'Ricompense')], ['funds', L('Use of funds', 'Uso dei fondi')],
    ['team', L('Who runs it', 'Chi lo propone')], ['updates', L('Updates', 'Aggiornamenti') + ' (' + p.updates.length + ')'], ['supporters', L('Supporters', 'Sostenitori')]
  ];

  root.innerHTML = '' +
    '<section class="project-hero" style="--accent:' + p.color + '"><div class="wrap">' +
      '<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="index.html">' + L('Home', 'Home') + '</a></li><li><a href="campaigns.html">' + L('Campaigns', 'Campagne') + '</a></li><li aria-current="page">' + p.short + '</li></ol></nav>' +
      '<p class="card-theme">' + L(FT.themes[p.theme]) + '</p>' +
      '<h1>' + L(p.title) + '</h1>' +
      '<p class="lead">' + L(p.tagline) + '</p>' +
      '<p style="margin:0">' + L('Proposed by ', 'Proposto da ') + '<strong>' + p.by + '</strong>, ' + L(p.dept) + '</p>' +
    '</div></section>' +
    '<div class="wrap project-layout">' +
      '<div>' +
        '<nav class="tabs" aria-label="' + (FT.lang() === 'it' ? 'Sezioni del progetto' : 'Project sections') + '">' + tabs.map(function (t) { return '<a href="#' + t[0] + '">' + t[1] + '</a>'; }).join('') + '</nav>' +
        '<section class="project-section" id="about"><h2>' + L('About the project', 'Il progetto') + '</h2>' + aboutHtml + '</section>' +
        '<section class="project-section" id="rewards"><h2>' + L('Rewards', 'Ricompense') + '</h2><p>' + L('You can change your choice later, until you confirm the donation.', 'Puoi cambiare scelta più avanti, fino alla conferma della donazione.') + '</p><div class="rewards">' + rewardsHtml + '</div></section>' +
        '<section class="project-section" id="funds"><h2>' + L('How the money will be used', 'Come verranno usati i fondi') + '</h2>' + budgetHtml + '</section>' +
        '<section class="project-section" id="team"><h2>' + L('Who runs the project', 'Chi propone il progetto') + '</h2>' + teamHtml + '</section>' +
        '<section class="project-section" id="updates"><h2>' + L('Updates', 'Aggiornamenti') + '</h2>' + updatesHtml + '</section>' +
        '<section class="project-section" id="supporters"><h2>' + L('Supporters', 'Sostenitori') + '</h2>' + supHtml + '</section>' +
      '</div>' +
      box +
    '</div>';

  function plainFromBilingual(html) {
    var re = new RegExp('<span data-l="' + FT.lang() + '">(.*?)</span>', 'g');
    var out = '';
    var m;
    while ((m = re.exec(html)) !== null) out += m[1];
    return out || html.replace(/<[^>]*>/g, '');
  }

  function moneyPlain(n) {
    return FT.moneyRaw(n, FT.lang());
  }

  function datePlain(d) {
    return plainFromBilingual(FT.date(d));
  }

  function statusPlain() {
    return plainFromBilingual(FT.status(p).html);
  }

  function updateShareText() {
    var ta = document.getElementById('share-text');
    if (!ta) return;
    var l = FT.lang();
    var raised = moneyPlain(p.raised);
    var reached = p.raised >= p.goal;
    var activeGoal = FT.activeGoal(p);
    var activeGoalStr = moneyPlain(activeGoal);
    var endStr = datePlain(p.end);
    var todayStr = datePlain(FT.today);
    var lines = [];
    lines.push(p.short + '.');
    if (reached && p.stretch && p.stretchActive) {
      lines.push((l === 'it' ? 'Raccolti ' : 'Raised ') + raised + (l === 'it' ? ' su ' : ' of ') + activeGoalStr +
        (l === 'it' ? ' (nuovo obiettivo; primo obiettivo di ' : ' (new goal; first goal of ') + moneyPlain(p.goal) + (l === 'it' ? ' raggiunto). ' : ' reached). ') +
        (l === 'it' ? 'Il raddoppio dell’Ateneo vale solo per il primo obiettivo.' : 'The University match applies to the first goal only.'));
    } else {
      lines.push((l === 'it' ? 'Raccolti ' : 'Raised ') + raised + (l === 'it' ? ' su ' : ' of ') + activeGoalStr + '.');
    }
    lines.push(statusPlain() + '.');
    lines.push((l === 'it' ? 'Scade il ' : 'Ends ') + endStr + '.');
    lines.push((l === 'it' ? 'Dati aggiornati al ' : 'Figures as of ') + todayStr + '.');
    lines.push('project.html?id=' + p.id);
    ta.value = lines.join(' ');
  }

  updateShareText();

  var copyLinkBtn = document.getElementById('copy-link');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function () {
      var input = document.getElementById('share-link');
      FT.copy(input.value, document.getElementById('share-status'), { input: input, success: L('Copied', 'Copiato') });
    });
  }
  var copyTextBtn = document.getElementById('copy-text');
  if (copyTextBtn) {
    copyTextBtn.addEventListener('click', function () {
      var ta = document.getElementById('share-text');
      FT.copy(ta.value, document.getElementById('share-status'), { input: ta, success: L('Copied', 'Copiato') });
    });
  }
  document.addEventListener('ft:lang', updateShareText);

  FT.refresh();
});
