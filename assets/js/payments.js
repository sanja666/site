import { updateWallet, renderPayments } from './profile.js';
import { appendPayment, appendHistory, getProfile } from './auth.js';

let paymentTranslations = null;
let paymentLanguage = 'lv';

export function initPayments(username, ui, translations, language) {
  setPaymentLocale(translations, language);
  const buttons = ui.topup.querySelectorAll('button[data-amount]');
  buttons.forEach(btn => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      const value = Number(btn.dataset.amount);
      handleTopUp(username, value, ui);
    });
  });
  updateWalletUI(username, ui);
  renderPayments(username, ui.list);
}

export function setPaymentLocale(translations, language) {
  paymentTranslations = translations;
  paymentLanguage = language;
}

export function handleTopUp(username, value, ui) {
  updateWallet(username, value);
  updateWalletUI(username, ui);
  const amountFormatted = new Intl.NumberFormat('lv-LV', { style: 'currency', currency: 'EUR' }).format(value);
  appendPayment(username, {
    title: paymentTranslations.mockTaxTitle,
    amount: amountFormatted,
    note: paymentTranslations.mockTaxNote
  });
  appendHistory(username, {
    type: 'payment',
    label: paymentTranslations.mockTaxHistory,
    message: `${paymentTranslations.topUpCompleted} ${amountFormatted}`
  });
  renderPayments(username, ui.list);
  showToast(paymentTranslations.topUpToast.replace('{amount}', amountFormatted), paymentLanguage);
  window.dispatchEvent(new CustomEvent('history-updated'));
}

export function updateWalletUI(username, ui) {
  const profile = getProfile(username);
  if (!profile) return;
  ui.amount.textContent = new Intl.NumberFormat('lv-LV', { style: 'currency', currency: 'EUR' }).format(profile.wallet);
  ui.balance.textContent = ui.amount.textContent;
}

function showToast(message) {
  const note = document.getElementById('notification');
  note.textContent = message;
  note.classList.remove('hidden');
  setTimeout(() => note.classList.add('show'), 10);
  setTimeout(() => {
    note.classList.remove('show');
    setTimeout(() => note.classList.add('hidden'), 300);
  }, 2500);
}
