import { appendHistory, appendAppeal } from './auth.js';

const CONVICTIONS_KEY_PREFIX = 'lep_convictions_';

const STATUS_OPTIONS = [
  { key: 'closed', lv: 'Slēgts', en: 'Closed' },
  { key: 'active', lv: 'Aktīvs', en: 'Active' },
  { key: 'appealed', lv: 'Pārsūdzēts', en: 'Appealed' }
];

const PRIORITY_OPTIONS = [
  { key: 'low', lv: 'Zems', en: 'Low' },
  { key: 'medium', lv: 'Vidējs', en: 'Medium' },
  { key: 'high', lv: 'Augsts', en: 'High' }
];

const BASE_EVENTS = [
  { lv: 'Pārkāpa rindā bibliotēkā', en: 'Jumped the queue in a library' },
  { lv: 'Nelikumīga siera krājumu uzglabāšana', en: 'Illegal cheese stockpiling' },
  { lv: 'Uzstādīja privātu hefteri pilsētas laukumā bez atļaujas', en: 'Installed a private stapler in the town square without permission' },
  { lv: 'Pārsniedza ātrumu ar skrejriteni', en: 'Exceeded speed limit on a scooter' },
  { lv: 'Aizmirsa atdot bibliotēkas grāmatu 5 gadu laikā', en: 'Forgot to return a library book for 5 years' },
  { lv: 'Sarakstīja mīlestības dzeju uz pašvaldības sienas', en: 'Wrote love poetry on a municipal wall' },
  { lv: 'Negodprātīga pankūku cepšana sabiedriskā pasākumā', en: 'Dishonest pancake frying at a public event' },
  { lv: 'Neapmaksāts kases kvīts par 0.99 € — sistemātisks', en: 'Unpaid receipt for €0.99 — systematic' },
  { lv: 'Gandrīz kļuva par ministru, bet aizmiga', en: 'Almost became a minister but fell asleep' },
  { lv: 'Sūdzība par pārāk skaļu smīnu naktī', en: 'Complaint about overly loud chuckling at night' },
  { lv: 'Aizmirsa izslēgt sevi no Zoom sanāksmes', en: 'Forgot to log out of a Zoom meeting' },
  { lv: 'Piekļuva attēlā bez maskas muzeja ekskursijā', en: 'Appeared mask-less in a museum photo' },
  { lv: 'Pārkāpa mājas klusuma režīmu plkst. 21:01', en: 'Violated home quiet hours at 21:01' },
  { lv: 'Neoficiāla pergamenta izgatavošana', en: 'Produced unlicensed parchment' },
  { lv: 'Apbildināšana par pārāk daudz selfie pie Brīvības pieminekļa', en: 'Charged with too many selfies at the Freedom Monument' },
  { lv: 'Atstāja govs imitācijas kostīmu publiskā parkā', en: 'Left a cow costume in a public park' },
  { lv: 'Paslēpa kaimiņa pastkastes avīzes humora nolūkos', en: 'Hid the neighbour’s mail for comedic purposes' },
  { lv: 'Izdomāja jaunu nodokli draugiem un iekasēja 2 €', en: 'Invented a new tax and collected €2 from friends' },
  { lv: 'Nepareizi izmantoja atvaļinājuma pieteikuma fontu', en: 'Misused vacation request font' },
  { lv: 'Piesprauda valsts karodziņu ar nepareizu leņķi', en: 'Pinned the national flag at the wrong angle' },
  { lv: 'Publicēja valsts himnas remiksu bez atļaujas', en: 'Released a remix of the national anthem without permission' },
  { lv: 'Izvietoja sēnes pašvaldības dobes malā', en: 'Planted mushrooms by the municipal flowerbed' },
  { lv: 'Ierīkoja slepenu piknika zonu arhīva telpā', en: 'Set up a secret picnic in the archive room' },
  { lv: 'Pārdeva “oficiālu” klikšķināšanas sertifikātu', en: 'Sold “official” clicking certificates' },
  { lv: 'Uzstājīgi grieza karogu mastu par 3°', en: 'Persistently rotated the flagpole by 3 degrees' },
  { lv: 'Nepamatoti skaļi elpoja publiskā ceremonijā', en: 'Breathed suspiciously loud during a ceremony' },
  { lv: 'Sarīkoja improvizētu himnas karaoke trolejbusā', en: 'Held improvised anthem karaoke on a trolleybus' },
  { lv: 'Uzskaitīja neesošus amatpersonas titulus CV', en: 'Listed non-existent official titles in CV' },
  { lv: 'Reģistrēja kaķi kā transportlīdzekli', en: 'Registered a cat as a vehicle' },
  { lv: 'Atteicās no obligātā “Jā, protams” atbildes formāta', en: 'Refused to use the mandatory “Yes, of course” reply format' },
  { lv: 'Nepareizi izmantota varavīksnes secība Excel failā', en: 'Misused rainbow order in an Excel file' },
  { lv: 'Pārspīlēta smaidu lietošana pasu nodaļā', en: 'Excessive smiling in the passport department' }
];

export function generateConvictions(username) {
  const existing = getStoredConvictions(username);
  if (existing?.length) {
    return existing;
  }
  const generated = buildRandomConvictions();
  saveConvictions(username, generated);
  return generated;
}

export function refreshConvictions(username) {
  const generated = buildRandomConvictions();
  saveConvictions(username, generated);
  return generated;
}

function buildRandomConvictions() {
  const count = 12 + Math.floor(Math.random() * 8);
  const now = new Date();
  const records = [];
  for (let i = 0; i < count; i++) {
    const base = BASE_EVENTS[Math.floor(Math.random() * BASE_EVENTS.length)];
    const status = STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)];
    const priority = PRIORITY_OPTIONS[Math.floor(Math.random() * PRIORITY_OPTIONS.length)];
    const yearsAgo = Math.floor(Math.random() * 10);
    const randomDays = Math.floor(Math.random() * 365);
    const date = new Date(now);
    date.setFullYear(date.getFullYear() - yearsAgo);
    date.setDate(date.getDate() - randomDays);

    records.push({
      id: crypto.randomUUID(),
      title: base,
      status,
      priority,
      date: date.toISOString().split('T')[0],
      description: getFunnyDescription(base),
      icon: Math.random() > 0.5 ? '⚖️' : '📜'
    });
  }
  return dedupeRecords(records);
}

function dedupeRecords(records) {
  const seen = new Set();
  return records.filter(record => {
    const key = record.title.lv + record.date + record.status.key;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getFunnyDescription(base) {
  const tail = [
    { lv: 'Ziņoja kā kaimiņš ar labāko humoru.', en: 'Reported as neighbour with best humour.' },
    { lv: 'Pievienots sistēmā pēc kafijas pārtraukuma.', en: 'Logged after a coffee break.' },
    { lv: 'Digitāli apstiprināts ar birokrātisku smaidu.', en: 'Digitally approved with a bureaucratic smile.' },
    { lv: 'Iesaistīts tikai piektdienās.', en: 'Applies on Fridays only.' },
    { lv: 'Sistēmas komentārs: “Ļoti oriģināli”.', en: 'System comment: “Very original.”' }
  ];
  return tail[Math.floor(Math.random() * tail.length)];
}

export function renderConvictions(container, records, language) {
  container.innerHTML = '';
  records.forEach(record => {
    const card = document.createElement('div');
    card.className = 'conviction-card';
    card.title = language === 'en'
      ? 'If this feels real — we slightly apologise.'
      : 'Ja šis šķiet patiesība — mēs nedaudz nožēlojam.';

    const icon = document.createElement('div');
    icon.className = 'conviction-icon';
    icon.textContent = record.icon;

    const meta = document.createElement('div');
    meta.className = 'conviction-meta';
    meta.innerHTML = `
      <span>${formatDate(record.date, language)}</span>
      <span class="status-badge status-${record.status.key}">${record.status[language]}</span>
    `;

    const title = document.createElement('div');
    title.className = 'conviction-title';
    title.textContent = record.title[language];

    const description = document.createElement('div');
    description.className = 'conviction-description';
    description.textContent = record.description[language];

    const priority = document.createElement('div');
    priority.className = `priority-tag priority-${record.priority.key}`;
    priority.textContent = `${language === 'en' ? 'Priority:' : 'Prioritāte:'} ${record.priority[language]}`;

    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const appealBtn = document.createElement('button');
    appealBtn.className = 'ghost-button';
    appealBtn.textContent = language === 'en' ? 'Appeal' : 'Apstrīdēt';
    appealBtn.addEventListener('click', () => {
      const event = new CustomEvent('open-appeal', { detail: record });
      window.dispatchEvent(event);
    });
    actions.appendChild(appealBtn);

    card.append(icon, meta, title, description, priority, actions);
    container.appendChild(card);
  });
}

export function saveConvictions(username, records) {
  localStorage.setItem(CONVICTIONS_KEY_PREFIX + username, JSON.stringify(records));
}

export function getStoredConvictions(username) {
  const stored = localStorage.getItem(CONVICTIONS_KEY_PREFIX + username);
  return stored ? JSON.parse(stored) : null;
}

export function handleAppealSubmission(username, record, payload) {
  const appeal = {
    id: crypto.randomUUID(),
    recordId: record.id,
    recordTitle: record.title,
    submitted: new Date().toISOString(),
    reason: payload.reason,
    details: payload.details
  };
  appendAppeal(username, appeal);
  appendHistory(username, {
    type: 'appeal',
    label: `${record.title.lv}`,
    message: payload.reason
  });
}

function formatDate(dateStr, language) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(language === 'en' ? 'en-GB' : 'lv-LV', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
