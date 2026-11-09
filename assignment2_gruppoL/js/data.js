
var FT = window.FT || {};

FT.today = new Date('2026-11-02T12:00:00');

FT.themes = {
  health:      { en: 'Health',             it: 'Salute' },
  environment: { en: 'Environment',        it: 'Ambiente' },
  society:     { en: 'Society and cities', it: 'Società e città' }
};

/* One list of payment methods, reused everywhere (problem A8 of Assignment 1) */
FT.paymentMethods = [
  { id: 'card',     en: 'Credit or debit card', it: 'Carta di credito o di debito', note: { en: 'Visa, Mastercard, Maestro and others', it: 'Visa, Mastercard, Maestro e altre' } },
  { id: 'paypal',   en: 'PayPal',               it: 'PayPal',                       note: { en: 'You confirm in a PayPal window', it: 'Confermi in una finestra PayPal' } },
  { id: 'satispay', en: 'Satispay',             it: 'Satispay',                     note: { en: 'You confirm in the Satispay app', it: 'Confermi nell’app Satispay' } },
  { id: 'transfer', en: 'Bank transfer',        it: 'Bonifico bancario',            note: { en: 'No fees. It must arrive before the campaign ends', it: 'Nessuna commissione. Deve arrivare prima della fine della campagna' } }
];

/* One refund sentence, reused everywhere (problem A10) */
FT.refundRule = {
  en: 'If the goal is not reached by the end date, you get your donation back, minus the payment fees.',
  it: 'Se l’obiettivo non viene raggiunto entro la scadenza, la donazione ti viene restituita, al netto delle commissioni di pagamento.'
};

FT.projects = [
  {
    id: 'mind-the-climate',
    short: 'Mind the Climate',
    theme: 'environment',
    color: '#BFE3D0',
    end: '2026-11-18',
    title: { en: 'Mind the Climate', it: 'Mind the Climate' },
    tagline: {
      en: 'Who measures what climate change does to our mental health? A participatory observatory, built with citizens.',
      it: 'Chi misura gli effetti del cambiamento climatico sulla nostra salute mentale? Un osservatorio partecipativo, costruito con i cittadini.'
    },
    by: 'Mind the Climate – UniTO',
    dept: { en: 'Dept. of Clinical and Biological Sciences and Dept. of Psychology', it: 'Dip. di Scienze Cliniche e Biologiche e Dip. di Psicologia' },
    goal: 7000, raised: 3200, donors: 114,
    about: {
      en: [
        'Heatwaves, droughts and floods do not only change the environment: they can also change how we sleep, how stressed we feel and how safe we feel about the future. Very little data exists on this link.',
        'The team will build a simple app where citizen scientists answer short, anonymous questions about their sleep, mood and stress. Answers are then compared with public weather and environmental data for the area where they live.',
        'Results go back to the community as interactive maps, short reports and meetings with schools, associations and municipalities, to guide prevention and support where climate events hit hardest. The app should be ready about four months after the campaign.'
      ],
      it: [
        'Ondate di calore, siccità e alluvioni non cambiano solo l’ambiente: possono cambiare anche come dormiamo, quanto stress proviamo e quanto ci sentiamo sicuri del futuro. Su questo legame esistono pochissimi dati.',
        'Il gruppo svilupperà un’app semplice in cui i cittadini-ricercatori rispondono a brevi domande anonime su sonno, umore e stress. Le risposte vengono poi confrontate con i dati meteo e ambientali pubblici della zona in cui vivono.',
        'I risultati tornano alla comunità con mappe interattive, brevi report e incontri con scuole, associazioni e comuni, per orientare prevenzione e supporto dove gli eventi climatici colpiscono di più. L’app dovrebbe essere pronta circa quattro mesi dopo la campagna.'
      ]
    },
    budget: [
      { en: 'Web app for citizens, automatic link to weather data, dashboard for the researchers', it: 'Web app per i cittadini, collegamento automatico ai dati meteo, dashboard per i ricercatori', amount: 12500 },
      { en: '10 public outreach events in Piedmont at the end of the project (plus 10 free online meetings)', it: '10 eventi divulgativi in Piemonte a fine progetto (più 10 incontri online gratuiti)', amount: 1500 }
    ],
    stretch: {
      en: 'Above €14,000: €750 more pays for one extra year of the app; €4,000 more hires a young researcher for three months to work with municipalities and emergency psychologists.',
      it: 'Oltre i 14.000 €: altri 750 € coprono un anno in più di gestione dell’app; altri 4.000 € permettono di assumere per tre mesi un giovane ricercatore che lavori con comuni e psicologi dell’emergenza.'
    },
    stretchActive: false,
    team: [
      { name: 'Alessia Visconti', role: { en: 'Researcher, Clinical and Biological Sciences. Worked on the ZOE Covid Study app', it: 'Ricercatrice, Scienze Cliniche e Biologiche. Ha lavorato all’app dello ZOE Covid Study' } },
      { name: 'Barbara Sini', role: { en: 'Researcher, Psychology, psychotherapist. Writes the questionnaires', it: 'Ricercatrice, Psicologia, psicoterapeuta. Scrive i questionari' } },
      { name: 'Matteo Bracco', role: { en: 'PhD student, statistician. In charge of outreach', it: 'Dottorando, statistico. Si occupa della divulgazione' } },
      { name: 'Paola Berchialla', role: { en: 'Full professor, biostatistics. Leads the data analysis', it: 'Professoressa ordinaria, biostatistica. Guida l’analisi dei dati' } }
    ],
    rewards: [
      { id: 'r10',   amount: 10,   backers: 52, left: null, title: { en: 'Citizen scientist', it: 'Cittadino ricercatore' }, desc: { en: 'Donation certificate by email, early access to the app, your name on the project website if you want.', it: 'Attestato di donazione via email, app in anteprima, il tuo nome sul sito del progetto se lo desideri.' } },
      { id: 'r25',   amount: 25,   backers: 20, left: null, title: { en: 'Friend', it: 'Amico' }, desc: { en: 'All of the above, plus an exclusive newsletter with behind-the-scenes updates.', it: 'Tutto quanto sopra, più una newsletter esclusiva con aggiornamenti dietro le quinte.' } },
      { id: 'r50',   amount: 50,   backers: 14, left: 35,   title: { en: 'Collaborator', it: 'Collaboratore' }, desc: { en: 'You and a guest are invited to the results presentation, online or in Turin.', it: 'Tu e un accompagnatore siete invitati alla presentazione dei risultati, online o a Torino.' } },
      { id: 'r75',   amount: 75,   backers: 3,  left: 48,   title: { en: 'Ally', it: 'Alleato' }, desc: { en: 'A handmade, photocopied fanzine about the project, sent to your home.', it: 'Una fanzine fatta a mano e fotocopiata, spedita a casa tua.' } },
      { id: 'r125',  amount: 125,  backers: 4,  left: 24,   title: { en: 'Experimenter', it: 'Sperimentatore' }, desc: { en: 'A 50-minute group mindfulness session for you and a guest, in Turin or online.', it: 'Una sessione di mindfulness di gruppo di 50 minuti per te e un accompagnatore, a Torino o online.' } },
      { id: 'r250',  amount: 250,  backers: 0,  left: 10,   title: { en: 'Community partner', it: 'Partner civico' }, desc: { en: 'The team presents the results at a school or association you choose.', it: 'Il gruppo presenta i risultati in una scuola o associazione che scegli tu.' } },
      { id: 'r400',  amount: 400,  backers: 0,  left: 3,    title: { en: 'Technical partner', it: 'Partner tecnico' }, desc: { en: 'Take part in a co-design session of the app.', it: 'Partecipa a una sessione di co-design dell’app.' } },
      { id: 'r500',  amount: 500,  backers: 0,  left: 2,    title: { en: 'Patron', it: 'Promotore' }, desc: { en: 'Your name or logo in the app, on the website and in the presentations.', it: 'Il tuo nome o logo nell’app, sul sito e nelle presentazioni.' } },
      { id: 'r1000', amount: 1000, backers: 0,  left: 3,    title: { en: 'Benefactor', it: 'Mecenate' }, desc: { en: 'Also thanked in all the scientific publications from the project.', it: 'Ringraziato anche in tutte le pubblicazioni scientifiche del progetto.' } }
    ],
    updates: [
      { date: '2026-09-17', title: { en: 'English version of the project', it: 'Versione inglese del progetto' }, text: { en: 'The full project description is now available in English.', it: 'La descrizione completa del progetto è ora disponibile in inglese.' } }
    ],
    supporters: ['C. B.', 'L. M.', 'E. R.', 'A. P.', 'F. G.', 'M. S.', 'P. V.', 'S. D.']
  },
  {
    id: 'repatch',
    short: 'RePatch',
    theme: 'health',
    color: '#F6C6C1',
    end: '2026-11-17',
    title: { en: 'RePatch: a patch for the heart', it: 'RePatch: il cerotto per il cuore' },
    tagline: {
      en: 'A bioartificial patch that helps the heart repair itself after a heart attack, then dissolves.',
      it: 'Un cerotto bioartificiale che aiuta il cuore a ripararsi dopo un infarto, e poi si dissolve.'
    },
    by: 'Team RePatch – UniTo',
    dept: { en: 'University of Turin, with CNR and the University of Pisa', it: 'Università di Torino, con CNR e Università di Pisa' },
    goal: 10000, raised: 14035, donors: 83,
    stretch: {
      amount: 30000,
      en: 'New goal: €20,000 more to develop a way to place the patch through a small incision on the side of the chest, without open-heart surgery. The University match applies to the first goal only.',
      it: 'Nuovo obiettivo: altri 20.000 € per sviluppare un modo di applicare il cerotto attraverso una piccola incisione laterale del torace, senza chirurgia a cuore aperto. Il raddoppio dell’Ateneo vale solo per il primo obiettivo.'
    },
    stretchActive: true,
    about: {
      en: [
        'Every year in Italy about 120,000 people survive a heart attack, but the damaged tissue becomes a stiff scar that reduces the heart’s ability to pump blood.',
        'RePatch, the result of more than ten years of research, is a resorbable patch that reproduces the structure of the heart muscle and helps it repair while it slowly dissolves. Laboratory tests have shown it is safe and effective, and a first prototype already exists.',
        'The first goal was reached in less than two weeks and paid for 20 new prototypes. The new goal aims at a less invasive way to place the patch, so that more fragile patients can receive it.'
      ],
      it: [
        'Ogni anno in Italia circa 120.000 persone sopravvivono a un infarto, ma il tessuto danneggiato diventa una cicatrice rigida che riduce la capacità del cuore di pompare il sangue.',
        'RePatch, frutto di oltre dieci anni di ricerca, è un cerotto riassorbibile che riproduce la struttura del muscolo cardiaco e lo aiuta a ripararsi mentre si dissolve gradualmente. I test di laboratorio ne hanno dimostrato sicurezza ed efficacia, e un primo prototipo esiste già.',
        'Il primo obiettivo è stato raggiunto in meno di due settimane e ha finanziato 20 nuovi prototipi. Il nuovo obiettivo punta a un modo meno invasivo di applicare il cerotto, perché possano riceverlo anche i pazienti più fragili.'
      ]
    },
    budget: [
      { en: 'First goal (reached): €10,000 from donors + €10,000 University match. Production and testing of 20 new prototypes', it: 'Primo obiettivo (raggiunto): 10.000 € dai donatori + 10.000 € di raddoppio dell’Ateneo. Produzione e test di 20 nuovi prototipi', amount: 20000 },
      { en: 'New goal: €20,000 more (€30,000 in total). First prototypes of the minimally invasive delivery system', it: 'Nuovo obiettivo: altri 20.000 € (30.000 € in totale). Primi prototipi del sistema di applicazione mini-invasivo', amount: 20000, stretch: true }
    ],
    team: [
      { name: 'Team RePatch', role: { en: 'Multidisciplinary group from the University of Turin, CNR and the University of Pisa', it: 'Gruppo multidisciplinare di Università di Torino, CNR e Università di Pisa' } }
    ],
    rewards: [
      { id: 'r10',   amount: 10,   backers: 21, left: null, title: { en: 'First heartbeat', it: 'Primo battito' }, desc: { en: 'The “A heart of supporters” newsletter and your piece of the collective digital patch.', it: 'La newsletter “Un cuore di sostenitori” e il tuo frammento del cerotto digitale collettivo.' } },
      { id: 'r25',   amount: 25,   backers: 15, left: null, title: { en: 'Inside RePatch', it: 'Dentro il cuore di RePatch' }, desc: { en: 'All updates, plus you personalise your piece of the digital heart.', it: 'Tutti gli aggiornamenti, più personalizzi il tuo frammento del cuore digitale.' } },
      { id: 'r50',   amount: 50,   backers: 25, left: null, title: { en: 'Research worth framing', it: 'Ricerca da incorniciare' }, desc: { en: 'A personalised certificate and an illustrated poster of the project.', it: 'Un attestato personalizzato e un poster illustrato del progetto.' } },
      { id: 'r100',  amount: 100,  backers: 6,  left: null, title: { en: 'Heart of the community', it: 'Cuore della community' }, desc: { en: 'Webinars and exclusive meetings with the researchers.', it: 'Webinar e incontri esclusivi con i ricercatori.' } },
      { id: 'r300',  amount: 300,  backers: 3,  left: 2,    title: { en: 'At the heart of research', it: 'Al cuore della ricerca' }, desc: { en: 'A day at the lab bench with the team.', it: 'Una giornata al bancone del laboratorio con il gruppo.' } },
      { id: 'r500',  amount: 500,  backers: 6,  left: 4,    title: { en: 'Braveheart', it: 'Braveheart' }, desc: { en: 'A private event with the scientific team and your name among the main supporters.', it: 'Un evento riservato con il gruppo scientifico e il tuo nome tra i principali sostenitori.' } },
      { id: 'r1500', amount: 1500, backers: 0,  left: null, title: { en: 'Golden heart', it: 'Golden heart' }, desc: { en: 'For companies and foundations: your logo among the official partners.', it: 'Per aziende e fondazioni: il tuo logo tra i partner ufficiali.' } }
    ],
    updates: [
      { date: '2026-10-27', title: { en: 'RePatch at an innovation evening in Bra', it: 'RePatch a una serata sull’innovazione a Bra' }, text: { en: 'The local press told the story of the project and of the team.', it: 'La stampa locale ha raccontato il progetto e il gruppo.' } },
      { date: '2026-10-23', title: { en: 'Tax deduction and donation certificate', it: 'Deducibilità fiscale e attestazione' }, text: { en: 'Traceable donations to research can benefit from tax deductions. How to get your certificate.', it: 'Le donazioni tracciabili alla ricerca possono beneficiare di agevolazioni fiscali. Come ottenere l’attestazione.' } },
      { date: '2026-10-20', title: { en: 'La Stampa on the next steps', it: 'La Stampa sui prossimi passi' }, text: { en: 'From the first 20 prototypes to the minimally invasive challenge.', it: 'Dai primi 20 prototipi alla sfida mini-invasiva.' } },
      { date: '2026-09-29', title: { en: 'Over 85%: the journey continues', it: 'Oltre l’85%: il viaggio continua' }, text: { en: 'Thank you to the first supporters.', it: 'Grazie ai primi sostenitori.' } }
    ],
    supporters: ['G. F.', 'V. N.', 'R. C.', 'L. M.', 'F. R.', 'I. S.']
  },
  {
    id: 'milk-act',
    short: 'MILK-ACT',
    theme: 'health',
    color: '#DCCFF2',
    end: '2026-11-17',
    title: { en: 'MILK-ACT: protecting the youngest from tomorrow’s viruses', it: 'MILK-ACT: proteggere i più piccoli dai virus di domani' },
    tagline: {
      en: 'Can human milk protect babies from Enterovirus D68, a virus the WHO lists as a research priority?',
      it: 'Il latte umano può proteggere i neonati dall’Enterovirus D68, un virus che l’OMS considera prioritario?'
    },
    by: 'VIRMOLAB – UniTo',
    dept: { en: 'Virologists, neonatologists and biochemists, University of Turin and CNR', it: 'Virologi, neonatologi e biochimici, Università di Torino e CNR' },
    goal: 8000, raised: 16017, donors: 203,
    stretch: {
      amount: 18000,
      en: 'New goal: €10,000 more to test two more enteroviruses that affect children (A71 and echovirus 11) and to study whether the milk’s molecules are absorbed by the gut.',
      it: 'Nuovo obiettivo: altri 10.000 € per testare altri due enterovirus pediatrici (A71 ed echovirus 11) e studiare se le molecole del latte vengono assorbite dall’intestino.'
    },
    stretchActive: true,
    about: {
      en: [
        'Enterovirus D68 causes respiratory infections in children that can become severe, with neurological complications. Today there is no specific prevention or treatment.',
        'The team tests donated human milk against the virus in cell cultures, simulates how a newborn digests it, and looks for the molecules that block the infection. The project lasts 12 months.'
      ],
      it: [
        'L’Enterovirus D68 causa nei bambini infezioni respiratorie che possono diventare gravi, con complicazioni neurologiche. Oggi non esistono strumenti specifici di prevenzione o cura.',
        'Il gruppo testa il latte umano donato contro il virus in colture cellulari, simula la digestione del neonato e cerca le molecole che bloccano l’infezione. Il progetto dura 12 mesi.'
      ]
    },
    budget: [
      { en: 'Collection of milk samples and clinical data', it: 'Raccolta dei campioni di latte e dei dati clinici', amount: 1000 },
      { en: 'Antiviral tests on human cell cultures', it: 'Test antivirali su colture cellulari umane', amount: 7000 },
      { en: 'Simulation of newborn digestion and tests on digested milk', it: 'Simulazione della digestione neonatale e test sul latte digerito', amount: 6000 },
      { en: 'Advanced molecular analysis', it: 'Analisi molecolari avanzate', amount: 2000 },
      { en: 'New goal: €10,000 more (€18,000 in total). Tests on two more enteroviruses that affect children (A71 and echovirus 11) and study of whether the milk’s molecules are absorbed by the gut', it: 'Nuovo obiettivo: altri 10.000 € (18.000 € in totale). Test su altri due enterovirus pediatrici (A71 ed echovirus 11) e studio dell’assorbimento delle molecole del latte da parte dell’intestino', amount: 10000, stretch: true }
    ],
    team: [
      { name: 'VIRMOLAB', role: { en: 'Virology research infrastructure of the University of Turin, with CNR', it: 'Infrastruttura di ricerca in virologia dell’Università di Torino, con il CNR' } }
    ],
    rewards: [
      { id: 'r15',   amount: 15,   backers: 85, left: null, title: { en: 'Personal certificate', it: 'Attestato personalizzato' }, desc: { en: 'A thank-you email and an official MILK-ACT supporter certificate.', it: 'Una mail di ringraziamento e un attestato ufficiale di sostenitore MILK-ACT.' } },
      { id: 'r30',   amount: 30,   backers: 35, left: null, title: { en: 'Thanks on the VIRMOLAB website', it: 'Ringraziamento sul sito VIRMOLAB' }, desc: { en: 'Your name on a permanent supporters page.', it: 'Il tuo nome in una pagina permanente dei sostenitori.' } },
      { id: 'r50',   amount: 50,   backers: 34, left: null, title: { en: 'MILK-ACT micro-guide', it: 'Microguida MILK-ACT' }, desc: { en: 'A brochure on ten years of research on human milk.', it: 'Una brochure su dieci anni di ricerca sul latte umano.' } },
      { id: 'r100',  amount: 100,  backers: 9,  left: 19,   title: { en: 'Online Q&A with the team', it: 'Q&A online con il gruppo' }, desc: { en: 'A 30-minute online meeting with the researchers.', it: 'Un incontro online di 30 minuti con i ricercatori.' } },
      { id: 'r200',  amount: 200,  backers: 8,  left: 11,   title: { en: 'Lab tour', it: 'Tour del laboratorio' }, desc: { en: 'Visit the virology lab, in person or virtually.', it: 'Visita il laboratorio di virologia, di persona o virtualmente.' } },
      { id: 'r500',  amount: 500,  backers: 0,  left: 10,   title: { en: 'Personal updates', it: 'Aggiornamenti personalizzati' }, desc: { en: 'Updates every three months and the final online seminar.', it: 'Aggiornamenti ogni tre mesi e il seminario online finale.' } },
      { id: 'r1000', amount: 1000, backers: 3,  left: 6,    title: { en: 'Thanks in the scientific paper', it: 'Ringraziamento nella pubblicazione' }, desc: { en: 'Your name in the acknowledgements of the future publication.', it: 'Il tuo nome nei ringraziamenti della futura pubblicazione.' } }
    ],
    updates: [
      { date: '2026-09-16', title: { en: 'English version of the project', it: 'Versione inglese del progetto' }, text: { en: 'The project description is now available in English.', it: 'La descrizione del progetto è ora disponibile in inglese.' } }
    ],
    supporters: ['M. P.', 'G. L.', 'C. A.', 'F. R.', 'V. S.']
  },
  {
    id: 'nanostop',
    short: 'NanoStop',
    theme: 'environment',
    color: '#C3DFF3',
    end: '2026-11-17',
    title: { en: 'NanoStop: stopping invisible plastics', it: 'NanoStop: fermiamo le plastiche invisibili' },
    tagline: {
      en: 'Can natural substances catch nanoplastics before they enter the cells of our mouth and gut?',
      it: 'Le sostanze naturali possono catturare le nanoplastiche prima che entrino nelle cellule di bocca e intestino?'
    },
    by: 'NanoStop – UniTo',
    dept: { en: 'University of Turin', it: 'Università di Torino' },
    goal: 6000, raised: 5740, donors: 46,
    about: {
      en: [
        'Plastic breaks down into ever smaller particles. Nanoplastics are invisible, are found in food, water and air, and have been detected in human organs.',
        'In the lab, the team studies how they interact with cells of the mouth and gut, whether they cause damage, and whether some natural compounds can bind to them and limit their absorption. In the future this could lead to oral products or formulations that help eliminate them.'
      ],
      it: [
        'La plastica si frammenta in particelle sempre più piccole. Le nanoplastiche sono invisibili, si trovano in cibo, acqua e aria, e sono state rilevate negli organi umani.',
        'In laboratorio il gruppo studia come interagiscono con le cellule di bocca e intestino, se provocano danni e se alcuni composti naturali possono legarsi a loro e limitarne l’assorbimento. In futuro potrebbero nascerne prodotti per il cavo orale o formulazioni che ne favoriscono l’eliminazione.'
      ]
    },
    budget: [
      { en: 'Traceable nanoplastics and laboratory materials', it: 'Nanoplastiche tracciabili e materiali di laboratorio', amount: null },
      { en: 'Cell cultures of the mouth and gut, 3D cell models', it: 'Colture cellulari di bocca e intestino, modelli cellulari 3D', amount: null },
      { en: 'Selection and preparation of natural compounds', it: 'Selezione e preparazione dei composti naturali', amount: null },
      { en: 'Exposure tests and analysis; public event with the results', it: 'Test di esposizione e analisi; evento pubblico con i risultati', amount: null }
    ],
    team: [
      { name: 'Team NanoStop', role: { en: 'Researchers of the University of Turin', it: 'Ricercatori dell’Università di Torino' } }
    ],
    rewards: [
      { id: 'r10',  amount: 10,  backers: 11, left: null, title: { en: 'Digital postcard', it: 'Cartolina digitale' }, desc: { en: 'An artwork created for NanoStop by Lorenza Boisi, by email.', it: 'Un’opera creata per NanoStop da Lorenza Boisi, via email.' } },
      { id: 'r20',  amount: 20,  backers: 17, left: null, title: { en: 'Artist’s postcard', it: 'Cartolina d’artista' }, desc: { en: 'The A5 printed postcard, sent to your home.', it: 'La cartolina stampata in formato A5, spedita a casa.' } },
      { id: 'r35',  amount: 35,  backers: 6,  left: null, title: { en: 'Experiment diary', it: 'Diario dell’esperimento' }, desc: { en: 'Exclusive behind-the-scenes updates on the experiment.', it: 'Aggiornamenti esclusivi dietro le quinte dell’esperimento.' } },
      { id: 'r50',  amount: 50,  backers: 0,  left: 29,   title: { en: 'Science breakfast', it: 'Colazione scientifica' }, desc: { en: 'Meet the team, who explain the project in plain words.', it: 'Incontra il gruppo, che racconta il progetto in parole semplici.' } },
      { id: 'r100', amount: 100, backers: 3,  left: 21,   title: { en: 'NanoStop lab experience', it: 'NanoStop lab experience' }, desc: { en: 'Visit the lab and meet the team.', it: 'Visita il laboratorio e incontra il gruppo.' } },
      { id: 'r150', amount: 150, backers: 0,  left: 9,    title: { en: 'Adopt a step of the experiment', it: 'Adotta un passaggio dell’esperimento' }, desc: { en: 'A personalised certificate for a real step of the lab work.', it: 'Un attestato personalizzato per una fase reale del lavoro.' } }
    ],
    updates: [],
    supporters: ['A. R.', 'R. E.', 'A. N.', 'E. S.']
  },
  {
    id: 'vibe',
    short: 'VIBE',
    theme: 'society',
    color: '#F5E3B0',
    end: '2026-11-10',
    title: { en: 'VIBE: virtual immersion for better environments', it: 'VIBE: immersione virtuale per ambienti migliori' },
    tagline: {
      en: 'Young people of Barriera di Milano visit their future youth centre in virtual reality, before it is built.',
      it: 'I ragazzi di Barriera di Milano visitano in realtà virtuale il loro futuro centro giovani, prima che venga costruito.'
    },
    by: 'Team VIBE – UniTo',
    dept: { en: 'HST research centre, University of Turin, with Fondazione Mamre', it: 'Centro di ricerca HST, Università di Torino, con Fondazione Mamre' },
    goal: 4700, raised: 3770, donors: 83,
    about: {
      en: [
        'In Barriera di Milano, a former carpentry workshop is becoming the “Spazio Giovani”, a cultural centre for young people. Fondazione Mamre leads the project, and students of the Politecnico di Torino design the spaces.',
        'The research team creates an immersive virtual version of the building. Young people from the neighbourhood explore it before it opens, and their reactions help design spaces that feel welcoming and inclusive.'
      ],
      it: [
        'A Barriera di Milano, un’ex falegnameria sta diventando lo “Spazio Giovani”, un centro culturale per i ragazzi. Il progetto è guidato dalla Fondazione Mamre e gli studenti del Politecnico di Torino ne progettano gli spazi.',
        'Il gruppo di ricerca crea una versione virtuale immersiva dell’edificio. I ragazzi del quartiere la esplorano prima dell’apertura e le loro reazioni aiutano a progettare spazi accoglienti e inclusivi.'
      ]
    },
    budget: [
      { en: 'Work of the young researchers in the team', it: 'Lavoro dei giovani ricercatori del gruppo', amount: null },
      { en: 'Immersive virtual model and data collection sessions', it: 'Modello virtuale immersivo e sessioni di raccolta dati', amount: null }
    ],
    team: [
      { name: 'Team VIBE', role: { en: 'Human Science & Technologies centre (HST), University of Turin', it: 'Centro Human Science & Technologies (HST), Università di Torino' } },
      { name: 'Fondazione Mamre', role: { en: 'Partner in Barriera di Milano', it: 'Partner a Barriera di Milano' } }
    ],
    rewards: [
      { id: 'r10',  amount: 10,  backers: 30, left: null, title: { en: 'Every brick counts', it: 'Ogni mattoncino conta' }, desc: { en: 'A weekly newsletter with all the updates.', it: 'Una newsletter settimanale con tutti gli aggiornamenti.' } },
      { id: 'r25',  amount: 25,  backers: 18, left: null, title: { en: 'Make it real', it: 'RENDilo Reale!' }, desc: { en: 'The newsletter and a digital postcard.', it: 'La newsletter e una cartolina digitale.' } },
      { id: 'r35',  amount: 35,  backers: 5,  left: null, title: { en: 'Leave your mark', it: 'Lascia il segno!' }, desc: { en: 'Your name in a special place inside the virtual space.', it: 'Il tuo nome in un posto speciale dentro lo spazio virtuale.' } },
      { id: 'r50',  amount: 50,  backers: 18, left: 32,   title: { en: 'Behind the scenes', it: 'Dietro le quinte' }, desc: { en: 'Visit the research centre and try the experience in preview.', it: 'Visita il centro di ricerca e prova l’esperienza in anteprima.' } },
      { id: 'r75',  amount: 75,  backers: 0,  left: 19,   title: { en: 'A day as a researcher', it: 'Una giornata da ricercatore' }, desc: { en: 'Take part in a data collection session.', it: 'Partecipa a una sessione di raccolta dati.' } },
      { id: 'r100', amount: 100, backers: 5,  left: 15,   title: { en: 'Aperitivo under the Mole', it: 'Aperitivo sotto la Mole' }, desc: { en: 'An aperitivo with the team at the research centre.', it: 'Un aperitivo con il gruppo al centro di ricerca.' } }
    ],
    updates: [
      { date: '2026-09-09', title: { en: 'English version of the project', it: 'Versione inglese del progetto' }, text: { en: 'The project description is now available in English.', it: 'La descrizione del progetto è ora disponibile in inglese.' } }
    ],
    supporters: ['L. C.', 'U. P.', 'P. T.', 'M. A.']
  }
];

FT.past = [
  { name: 'CultMeat', it: 'coltiviamo la carne per un futuro più sostenibile', en: 'growing meat for a more sustainable future', raised: 62050, goal: 10000, donors: 575 },
  { name: 'BRIGHT', it: 'Brain Research in Interactive Game-based Hypertraining', en: 'Brain Research in Interactive Game-based Hypertraining', raised: 22182, goal: 3000, donors: 111 },
  { name: 'Citizen Salad', it: 'chi vive sulle foglie di insalata?', en: 'who lives on salad leaves?', raised: 21375, goal: 8000, donors: 144 },
  { name: 'GaIA', it: 'gestiamo in modo consapevole e creativo l’intelligenza artificiale', en: 'using artificial intelligence consciously and creatively', raised: 21369, goal: 7000, donors: 173 }
];

FT.getProject = function (id) {
  for (var i = 0; i < FT.projects.length; i++) if (FT.projects[i].id === id) return FT.projects[i];
  return null;
};

window.FT = FT;
