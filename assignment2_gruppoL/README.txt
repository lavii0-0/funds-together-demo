FUNDS TOGETHER - PROTOTYPE (HCI Assignment 2, Group L)
======================================================

HOW TO OPEN IT
1. Unzip the folder.
2. Open index.html in any browser (double click). No server or internet is needed
   (with internet, the web fonts load too).
3. Use the EN / IT buttons at the top right to switch language. The choice is kept
   when you move between pages.

MAIN PATH TO TRY (persona: Elena - compare campaigns, choose one, support it)
Home > "Support a project" > compare the campaigns > open a project > "Support this project"
> choose a reward and amount > your details and payment > confirmation.
Try also wrong inputs: an amount lower than the reward, an empty form, a wrong email.

OTHER PATHS
Lucia (bank transfer, anonymous or public name): same donation pages, choose "Bank transfer".
Lavinia (follow a project already backed): switch to EN > Campaigns > RePatch > status box and Updates.
Davide (researcher): Propose a project > "Am I eligible?" check > fill in the check > "Go to
the interest form" (name, role and email are pre-filled) > register interest > "Withdraw my
request and erase my data".
Matteo (department communications): The programme > "Writing about Funds TOgether?" > Campaigns
> a project > "Share this campaign": copy the stable link or the ready-to-paste text (EN / IT).

DATA
Campaign figures are a snapshot of ideaginger.it taken on 2 November 2026, so some differ
from Assignment 1 (e.g. Mind the Climate: EUR 2,870 then, EUR 3,200 now).

PAGES (11)
index.html            Home: two entry points (donors / UniTO researchers), match simulator
campaigns.html        Explore: search, theme filter, status filter, sorting
project.html?id=...   Project page (one template, 5 real campaigns)
support.html          Donation step 1: reward and amount
payment.html          Donation step 2: details, payment method, conditions
confirmation.html     Donation step 3: confirmation and what happens next
how-it-works.html     Rules in plain words: match, all-or-nothing, refunds, fees, terms
faq.html              FAQ with categories and search
propose.html          For UniTO researchers: phases of the call, checklist, interest form
programme.html        The programme: who does what, timeline, figures, past editions
contact.html          Who to contact: routing by topic + contact form

FILES
css/style.css   all styles
js/data.js      campaign content (from ideaginger.it, 2 November 2026)
js/common.js    header, footer, language switch, cards, funding bar
js/forms.js     shared form validation helpers
js/<page>.js    behaviour of each page

No real payment, email or data transmission happens: every action is simulated.
