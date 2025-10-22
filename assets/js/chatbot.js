const RESPONSES = [
  {
    prompt: /pase|passport/i,
    lv: 'Pases pieprasījumiem nepieciešama vismaz trīs reizes atkārtota frāze “Lūdzu”.',
    en: 'Passport requests require saying “Please” at least three times.'
  },
  {
    prompt: /nodok|tax/i,
    lv: 'Mūsu sistēma šobrīd izdomā jaunus nodokļus. Lūdzu, palieciet gaidīšanas režīmā.',
    en: 'Our system is inventing new taxes right now. Please remain on standby.'
  },
  {
    prompt: /help|palīdzība/i,
    lv: 'Atbalsts tiek sniegts otrdienās no 02:00 līdz 02:07. Lūdzu, plānojiet laikus.',
    en: 'Support is available on Tuesdays from 02:00 to 02:07. Please plan accordingly.'
  },
  {
    prompt: /ierakst|record/i,
    lv: 'Ieraksti par jums tiek ģenerēti, pamatojoties uz nejaušības un kafijas proporciju.',
    en: 'Your records are generated based on a ratio of randomness to coffee.'
  },
  {
    prompt: /.*/,
    lv: 'Sistēma pierakstīja jūsu jautājumu un ievietoja to ideju burkā.',
    en: 'The system logged your question and placed it in the jar of ideas.'
  }
];

export function initChatbot(form, input, log, language) {
  setChatLanguage(language);
  if (form.dataset.bound === 'true') {
    return;
  }
  form.dataset.bound = 'true';
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(log, text, 'user');
    input.value = '';

    setTimeout(() => {
      const reply = findReply(text);
      addMessage(log, reply, 'bot');
      log.scrollTop = log.scrollHeight;
    }, 600 + Math.random() * 600);
  });
}

let chatLanguage = 'lv';

export function setChatLanguage(language) {
  chatLanguage = language;
}

function findReply(text) {
  const entry = RESPONSES.find(r => r.prompt.test(text));
  return entry ? entry[chatLanguage] : RESPONSES[RESPONSES.length - 1][chatLanguage];
}

export function switchLanguage(log, language) {
  setChatLanguage(language);
  const messages = [...log.querySelectorAll('.chat-message.bot')];
  messages.forEach(msg => {
    const fallback = RESPONSES[RESPONSES.length - 1];
    const current = RESPONSES.find(r => r.lv === msg.dataset.lv || r.en === msg.dataset.en) || fallback;
    msg.textContent = current[language];
    msg.dataset.lv = current.lv;
    msg.dataset.en = current.en;
  });
}

function addMessage(log, text, type) {
  const div = document.createElement('div');
  div.className = `chat-message ${type}`;
  div.textContent = text;
  if (type === 'bot') {
    const entry = RESPONSES.find(r => r.lv === text || r.en === text);
    if (entry) {
      div.dataset.lv = entry.lv;
      div.dataset.en = entry.en;
    }
  }
  log.appendChild(div);
}
