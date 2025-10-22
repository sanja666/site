import { getProfile, updateProfile, appendHistory } from './auth.js';

export function populateProfile(username, ui) {
  const profile = getProfile(username);
  if (!profile) return;
  ui.name.textContent = profile.name;
  ui.avatar.textContent = profile.avatar || initialsFrom(profile.name);
  ui.balance.textContent = formatCurrency(profile.wallet);
  ui.walletAmount.textContent = formatCurrency(profile.wallet);
}

export function updateWallet(username, amount) {
  const profile = getProfile(username);
  if (!profile) return;
  const newBalance = Number((profile.wallet + amount).toFixed(2));
  const updated = updateProfile(username, { wallet: newBalance });
  appendHistory(username, {
    type: 'wallet',
    label: amount > 0 ? 'Maciņa papildinājums' : 'Maksājums',
    message: `${amount > 0 ? '+' : ''}${formatCurrency(amount)}`
  });
  return updated;
}

export function renderHistory(username, container, language, translations) {
  const profile = getProfile(username);
  if (!profile) return;
  container.innerHTML = '';
  (profile.history || []).forEach(entry => {
    const li = document.createElement('li');
    li.className = 'timeline-item';
    const date = new Date(entry.timestamp);
    const locale = language === 'en' ? 'en-GB' : 'lv-LV';
    const label = translations[`history_${entry.type}`] || entry.label;
    li.innerHTML = `
      <strong>${date.toLocaleString(locale)}</strong><br>
      <span>${label}</span><br>
      <small>${entry.message}</small>
    `;
    container.appendChild(li);
  });
}

export function renderPayments(username, list) {
  const profile = getProfile(username);
  if (!profile) return;
  list.innerHTML = '';
  (profile.payments || []).forEach(payment => {
    const li = document.createElement('li');
    li.className = 'timeline-item';
    li.innerHTML = `
      <strong>${payment.title}</strong><br>
      <span>${payment.amount}</span><br>
      <small>${payment.note}</small>
    `;
    list.appendChild(li);
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('lv-LV', { style: 'currency', currency: 'EUR' }).format(value);
}

function initialsFrom(name) {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}
