import { initAuth, login, getCurrentUser, logout as doLogout, ensureProfile, appendHistory, registerUser } from './auth.js';
import { populateProfile, renderHistory } from './profile.js';
import { generateConvictions, refreshConvictions, renderConvictions, handleAppealSubmission } from './convictions.js';
import { initPayments, updateWalletUI, setPaymentLocale } from './payments.js';
import { initChatbot, switchLanguage as switchChatLanguage } from './chatbot.js';

const LANGUAGE_KEY = 'lep_language';

const translations = {
  lv: {
    clearData: 'Notīrīt datus',
    loginTitle: 'Drošā piekļuve',
    loginSubtitle: 'Pieslēdzies, lai redzētu visu, ko tu patiesībā neesi darījis.',
    registerSubtitle: 'Izveido savu neoficiālo profilu, lai saņemtu neoficiālu uzmanību.',
    username: 'Lietotājvārds',
    password: 'Parole',
    login: 'Pieslēgties',
    register: 'Reģistrēties',
    registerName: 'Vārds, Uzvārds',
    registerUsername: 'Lietotājvārds',
    registerPassword: 'Parole',
    registerConfirm: 'Apstipriniet paroli',
    tabLogin: 'Pieslēgties',
    tabRegister: 'Reģistrācija',
    registerHint: 'Reģistrējoties jūs piekrītat, ka šī ir parodija.',
    registerInvalid: 'Lūdzu aizpildiet lietotājvārdu un paroli.',
    registerMismatch: 'Paroles nesakrīt.',
    registerExists: 'Šāds lietotājvārds jau pastāv.',
    registerWeak: 'Parolei jābūt vismaz 4 rakstzīmes.',
    registerSuccess: 'Profils izveidots. Laipni lūdzam!',
    registerSuccessToast: 'Reģistrācija izdevusies. Virtuālie dati ir gatavi.',
    registerNamePlaceholder: 'Piem., Līga Fantāzija',
    registerUsernamePlaceholder: 'piem. liga.fantazija',
    registerPasswordPlaceholder: 'Izvēlieties paroli',
    registerConfirmPlaceholder: 'Atkārtojiet paroli',
    logout: 'Izlogoties',
    menuConvictions: 'Ieraksti',
    menuServices: 'Pakalpojumi',
    menuPayments: 'Maksājumi',
    menuHistory: 'Vēsture',
    menuSupport: 'Atbalsts',
    convictionsTitle: 'Ieraksti par tevi',
    convictionsDisclaimer: 'Izdomāti ieraksti, humora dēļ.',
    refreshConvictions: 'Atjaunot ierakstus',
    downloadPdf: 'Lejupielādēt PDF ar ierakstiem',
    servicesTitle: 'Pakalpojumi',
    paymentsTitle: 'Maksājumi',
    walletBalance: 'Jūsu virtuālais maciņš:',
    mockTaxes: 'Iedomātie nodokļi',
    historyTitle: 'Vēsture',
    supportTitle: 'Atbalsta centrs',
    send: 'Sūtīt',
    appealTitle: 'Apstrīdēt sodījumu',
    appealReason: 'Pamatojums',
    appealDetails: 'Detalizēts apraksts',
    submitAppeal: 'Iesniegt',
    loginSuccess: 'Pieslēgšanās izdevusies. Pat ja nevajadzētu.',
    loginError: 'Nepareizs lietotājvārds vai parole.',
    topUpToast: 'Maciņš papildināts par {amount}.',
    mockTaxTitle: 'Iedomātie nodokļi',
    mockTaxNote: 'Automātiska kvīts par neesošiem pakalpojumiem.',
    mockTaxHistory: 'Virtuāls maksājums',
    topUpCompleted: 'Reģistrēts papildinājums',
    history_wallet: 'Maciņa darbība',
    history_payment: 'Maksājums',
    history_appeal: 'Iesniegta apelācija',
    appealSubmitted: 'Apelācija saņemta. Kāds to noteikti apskatīs.',
    services: [
      { title: 'Pasas pieteikums', desc: 'Elektroniska pieteikuma forma, kas prasa 12 e-parakstus.' },
      { title: 'Pabalstu simulators', desc: 'Aprēķina, cik pabalstu varētu saņemt kāds cits.' },
      { title: 'Transportlīdzekļu reģistrācija', desc: 'Pieņem arī skrejriteņus un ambīcijas kā transportus.' },
      { title: 'Telpu rezervācija', desc: 'Rezervē virtuālās telpas, kurās neviens netraucē.' },
      { title: 'E-nodokļu kalkulators', desc: 'Pieskaita fantāzijas nodokļus par smaidiem.' }
    ],
    servicesNote: 'Pieprasījumi tiek apstrādāti brīdī, kad sistēma pamostas.',
    pdfTitle: 'Humoristisks sodījumu pārskats',
    pdfFooter: 'Šis nav oficiāls dokuments. Tiešām.',
    modalClose: 'Aizvērt',
    diploma: 'Diploms par pacietību piešķirts!',
    diplomaMessage: 'Pacietība aktivizēta'
  },
  en: {
    clearData: 'Clear data',
    loginTitle: 'Secure access',
    loginSubtitle: 'Sign in to see everything you definitely did not do.',
    registerSubtitle: 'Create your unofficial profile to receive unofficial attention.',
    username: 'Username',
    password: 'Password',
    login: 'Sign in',
    register: 'Register',
    registerName: 'Full name',
    registerUsername: 'Username',
    registerPassword: 'Password',
    registerConfirm: 'Confirm password',
    tabLogin: 'Sign in',
    tabRegister: 'Register',
    registerHint: 'By registering you agree this is a parody.',
    registerInvalid: 'Please provide a username and password.',
    registerMismatch: 'Passwords do not match.',
    registerExists: 'That username already exists.',
    registerWeak: 'Password must be at least 4 characters.',
    registerSuccess: 'Profile created. Welcome!',
    registerSuccessToast: 'Registration complete. Imaginary data is ready.',
    registerNamePlaceholder: 'e.g., Liga Fantasy',
    registerUsernamePlaceholder: 'e.g., liga.fantasy',
    registerPasswordPlaceholder: 'Choose a password',
    registerConfirmPlaceholder: 'Repeat the password',
    logout: 'Log out',
    menuConvictions: 'Records',
    menuServices: 'Services',
    menuPayments: 'Payments',
    menuHistory: 'History',
    menuSupport: 'Support',
    convictionsTitle: 'Records about you',
    convictionsDisclaimer: 'Imaginary records for humour only.',
    refreshConvictions: 'Refresh records',
    downloadPdf: 'Download records PDF',
    servicesTitle: 'Services',
    paymentsTitle: 'Payments',
    walletBalance: 'Your virtual wallet:',
    mockTaxes: 'Imaginary taxes',
    historyTitle: 'History',
    supportTitle: 'Support centre',
    send: 'Send',
    appealTitle: 'Appeal a penalty',
    appealReason: 'Reason',
    appealDetails: 'Detailed description',
    submitAppeal: 'Submit',
    loginSuccess: 'Login successful. Even if it should not be.',
    loginError: 'Incorrect username or password.',
    topUpToast: 'Wallet topped up by {amount}.',
    mockTaxTitle: 'Imaginary taxes',
    mockTaxNote: 'Automatic receipt for non-existent services.',
    mockTaxHistory: 'Virtual payment',
    topUpCompleted: 'Top up recorded',
    history_wallet: 'Wallet activity',
    history_payment: 'Payment',
    history_appeal: 'Appeal submitted',
    appealSubmitted: 'Appeal received. Someone will surely look at it.',
    services: [
      { title: 'Passport application', desc: 'Electronic form requiring 12 e-signatures.' },
      { title: 'Benefit simulator', desc: 'Calculates how much benefit someone else might receive.' },
      { title: 'Vehicle registration', desc: 'Accepts scooters and ambitions as vehicles.' },
      { title: 'Room reservation', desc: 'Reserve virtual rooms where nobody bothers you.' },
      { title: 'E-tax calculator', desc: 'Adds fantasy taxes for smiling.' }
    ],
    servicesNote: 'Requests are processed whenever the system wakes up.',
    pdfTitle: 'Comedic penalty overview',
    pdfFooter: 'This is not an official document. Truly.',
    modalClose: 'Close',
    diploma: 'Diploma for patience awarded!',
    diplomaMessage: 'Patience unlocked'
  }
};

const servicesContainer = document.getElementById('service-list');
const convictionContainer = document.getElementById('conviction-list');
const paymentsList = document.getElementById('payments-list');
const historyList = document.getElementById('history-list');
const loginSection = document.getElementById('login-section');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const logoutButton = document.getElementById('logout');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');
const authTabs = document.querySelectorAll('[data-auth-tab]');
const authPanels = document.querySelectorAll('.auth-panel');
const langButtons = document.querySelectorAll('.lang-toggle');
const clearButton = document.getElementById('clear-data');
const menuItems = document.querySelectorAll('.menu-item');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const appealForm = document.getElementById('appeal-form');
const appealReason = document.getElementById('appeal-reason');
const appealDetails = document.getElementById('appeal-details');
const appealId = document.getElementById('appeal-id');
const downloadBtn = document.getElementById('download-convictions');
const refreshBtn = document.getElementById('refresh-convictions');
const logo = document.getElementById('logo');
const notification = document.getElementById('notification');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');

let activeLanguage = localStorage.getItem(LANGUAGE_KEY) || 'lv';
let activeUser = null;
let activeConvictions = [];
let logoClicks = 0;
let appealRecord = null;
const sections = document.querySelectorAll('.content-section');

initAuth();
setupLanguage();
setupLogin();
setupClear();
setupLogo();
setupNavigation();
updateLanguageTexts();

window.addEventListener('open-appeal', ({ detail }) => {
  appealRecord = detail;
  appealId.value = detail.id;
  appealReason.value = '';
  appealDetails.value = '';
  openModal();
});

window.addEventListener('history-updated', () => {
  if (!activeUser) return;
  renderHistory(activeUser.user, historyList, activeLanguage, translations[activeLanguage]);
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

appealForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!activeUser || !appealRecord) return;
  if (!appealReason.value.trim() || !appealDetails.value.trim()) return;
  handleAppealSubmission(activeUser.user, appealRecord, {
    reason: appealReason.value,
    details: appealDetails.value
  });
  appealForm.reset();
  closeModal();
  showToast(translations[activeLanguage].appealSubmitted);
  renderHistory(activeUser.user, historyList, activeLanguage, translations[activeLanguage]);
});

refreshBtn.addEventListener('click', () => {
  if (!activeUser) return;
  activeConvictions = refreshConvictions(activeUser.user);
  renderConvictions(convictionContainer, activeConvictions, activeLanguage);
});

downloadBtn.addEventListener('click', () => {
  if (!activeConvictions.length) return;
  const t = translations[activeLanguage];
  const lines = [t.pdfTitle, ''];
  activeConvictions.forEach(item => {
    lines.push(`${item.title[activeLanguage]} — ${item.status[activeLanguage]} — ${item.date}`);
  });
  lines.push('', t.pdfFooter);
  const blob = new Blob([lines.join('\n')], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ieraksti-par-tevi.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

function setupLogin() {
  switchAuthPanel('login');

  const stored = getCurrentUser();
  if (stored) {
    completeLogin(stored);
  }

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      switchAuthPanel(tab.dataset.authTab);
    });
  });

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();
    if (!username || !password) return;
    const result = login(username, password);
    if (result) {
      loginMessage.textContent = translations[activeLanguage].loginSuccess;
      loginMessage.style.color = 'var(--color-success)';
      completeLogin(result);
    } else {
      loginMessage.textContent = translations[activeLanguage].loginError;
      loginMessage.style.color = 'var(--color-danger)';
    }
  });

  if (registerForm) {
    registerForm.addEventListener('submit', event => {
      event.preventDefault();
      registerMessage.textContent = '';
      const name = registerForm.fullname.value.trim();
      const username = registerForm.newusername.value.trim();
      const password = registerForm.newpassword.value.trim();
      const confirm = registerForm.confirmpassword.value.trim();

      if (!username || !password) {
        registerMessage.textContent = translations[activeLanguage].registerInvalid;
        registerMessage.style.color = 'var(--color-danger)';
        return;
      }

      if (password !== confirm) {
        registerMessage.textContent = translations[activeLanguage].registerMismatch;
        registerMessage.style.color = 'var(--color-danger)';
        return;
      }

      const result = registerUser({ user: username, pass: password, name });
      if (!result.success) {
        const messageKey = {
          exists: 'registerExists',
          weak: 'registerWeak',
          invalid: 'registerInvalid'
        }[result.reason] || 'registerInvalid';
        registerMessage.textContent = translations[activeLanguage][messageKey];
        registerMessage.style.color = 'var(--color-danger)';
        return;
      }

      ensureProfile(result.user.user);
      registerForm.reset();
      registerMessage.textContent = translations[activeLanguage].registerSuccess;
      registerMessage.style.color = 'var(--color-success)';
      const loggedIn = login(username, password);
      switchAuthPanel('login');
      showToast(translations[activeLanguage].registerSuccessToast);
      completeLogin(loggedIn || result.user);
    });
  }

  logoutButton.addEventListener('click', () => {
    doLogout();
    activeUser = null;
    loginSection.classList.remove('hidden');
    dashboard.classList.add('hidden');
    loginMessage.textContent = '';
    registerMessage.textContent = '';
    if (registerForm) {
      registerForm.reset();
    }
    loginForm.reset();
    switchAuthPanel('login');
  });
}

function completeLogin(user) {
  activeUser = user;
  ensureProfile(user.user);
  loginSection.classList.add('hidden');
  dashboard.classList.remove('hidden');
  populateProfile(user.user, {
    name: document.getElementById('user-name'),
    avatar: document.getElementById('user-avatar'),
    balance: document.getElementById('user-balance'),
    walletAmount: document.getElementById('wallet-amount')
  });
  setupServices();
  activeConvictions = generateConvictions(user.user);
  renderConvictions(convictionContainer, activeConvictions, activeLanguage);
  initPayments(user.user, {
    topup: document.querySelector('.top-up-buttons'),
    amount: document.getElementById('wallet-amount'),
    balance: document.getElementById('user-balance'),
    list: paymentsList
  }, translations[activeLanguage], activeLanguage);
  renderHistory(user.user, historyList, activeLanguage, translations[activeLanguage]);
  chatLog.innerHTML = '';
  initChatbot(chatForm, chatInput, chatLog, activeLanguage);
  updateLanguageTexts();
  activateSection('convictions');
}

function setupLanguage() {
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === activeLanguage);
    btn.addEventListener('click', () => {
      activeLanguage = btn.dataset.lang;
      localStorage.setItem(LANGUAGE_KEY, activeLanguage);
      langButtons.forEach(b => b.classList.toggle('active', b === btn));
      updateLanguageTexts();
      if (activeUser) {
        renderConvictions(convictionContainer, activeConvictions, activeLanguage);
        renderHistory(activeUser.user, historyList, activeLanguage, translations[activeLanguage]);
        setupServices();
        updateWalletUI(activeUser.user, {
          amount: document.getElementById('wallet-amount'),
          balance: document.getElementById('user-balance')
        });
        switchChatLanguage(chatLog, activeLanguage);
        setPaymentLocale(translations[activeLanguage], activeLanguage);
      }
    });
  });
}

function updateLanguageTexts() {
  const t = translations[activeLanguage];
  document.documentElement.lang = activeLanguage === 'en' ? 'en' : 'lv';
  setPaymentLocale(t, activeLanguage);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });
  chatInput.placeholder = activeLanguage === 'en' ? 'Type your question' : 'Raksti savu jautājumu';
  modalClose.title = t.modalClose;
  modalClose.setAttribute('aria-label', t.modalClose);
  if (activeLanguage === 'en') {
    document.body.classList.add('lang-en');
  } else {
    document.body.classList.remove('lang-en');
  }
}

function setupServices() {
  const t = translations[activeLanguage];
  servicesContainer.innerHTML = '';
  t.services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <strong>${service.title}</strong><br>
      <span>${service.desc}</span><br>
      <small>${t.servicesNote}</small>
    `;
    servicesContainer.appendChild(card);
  });
}

function setupNavigation() {
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      activateSection(item.dataset.target);
    });
  });
}

function activateSection(targetId) {
  menuItems.forEach(item => {
    item.classList.toggle('active', item.dataset.target === targetId);
  });
  sections.forEach(section => {
    section.classList.toggle('hidden', section.id !== targetId);
  });
}

function setupClear() {
  clearButton.addEventListener('click', () => {
    localStorage.clear();
    showToast(activeLanguage === 'en' ? 'Data deleted. Or were they?' : 'Dati dzēsti. Bet vai tiešām?');
    setTimeout(() => window.location.reload(), 1600);
  });
}

function openModal() {
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  appealReason.focus();
}

function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
    appealRecord = null;
  }, 200);
}

function setupLogo() {
  logo.addEventListener('click', () => {
    logoClicks += 1;
    if (logoClicks === 7) {
      showToast(translations[activeLanguage].diploma);
      appendHistoryIfPossible();
      logoClicks = 0;
    }
  });
}

function appendHistoryIfPossible() {
  if (!activeUser) return;
  appendHistory(activeUser.user, {
    type: 'wallet',
    label: translations[activeLanguage].diploma,
    message: translations[activeLanguage].diplomaMessage
  });
  renderHistory(activeUser.user, historyList, activeLanguage, translations[activeLanguage]);
}

function showToast(message) {
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.classList.add('hidden'), 300);
  }, 2400);
}

function switchAuthPanel(target) {
  authTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.authTab === target);
  });
  authPanels.forEach(panel => {
    panel.classList.toggle('hidden', panel.dataset.auth !== target);
  });
  if (target === 'login') {
    registerMessage.textContent = '';
    if (loginForm) {
      loginForm.username.focus();
    }
  } else {
    loginMessage.textContent = '';
    if (registerForm) {
      registerForm.newusername.focus();
    }
  }
}
