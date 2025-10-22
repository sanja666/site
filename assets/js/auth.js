const USERS_KEY = 'lep_demo_users';
const CURRENT_USER_KEY = 'lep_current_user';

const DEFAULT_USERS = [
  { user: 'janis.berzins', pass: '1234', name: 'Jānis Bērziņš', avatar: 'JB' },
  { user: 'evita.liepina', pass: '1234', name: 'Evita Liepiņa', avatar: 'EL' },
  { user: 'aleksandrs.lipskis', pass: '1234', name: 'Aleksandrs Lipskis', avatar: 'AL' },
  { user: 'kirils.lebedevs', pass: '1234', name: 'Kirils Ļebedevs', avatar: 'KĻ' }
];

export function initAuth() {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    saveUsers(DEFAULT_USERS);
  }
}

export function getUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function login(username, password) {
  const users = getUsers();
  const normalized = username.trim().toLowerCase();
  const user = users.find(u => u.user === normalized && u.pass === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, normalized);
    return user;
  }
  return null;
}

export function getCurrentUser() {
  const username = localStorage.getItem(CURRENT_USER_KEY);
  if (!username) return null;
  const users = getUsers();
  return users.find(u => u.user === username) || null;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function ensureProfile(username) {
  const profileKey = profileKeyFor(username);
  if (!localStorage.getItem(profileKey)) {
    const users = getUsers();
    const user = users.find(u => u.user === username);
    const fallbackAvatar = username
      .split('.')
      .map(part => part.charAt(0).toUpperCase())
      .join('');

    const profile = {
      name: user?.name || username,
      avatar: user?.avatar || fallbackAvatar,
      wallet: 32.5,
      history: [],
      payments: [],
      appeals: []
    };
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }
}

export function getProfile(username) {
  const profileKey = profileKeyFor(username);
  const stored = localStorage.getItem(profileKey);
  return stored ? JSON.parse(stored) : null;
}

export function updateProfile(username, data) {
  const profile = getProfile(username) || {};
  const merged = { ...profile, ...data };
  localStorage.setItem(profileKeyFor(username), JSON.stringify(merged));
  return merged;
}

export function appendHistory(username, entry) {
  const profile = getProfile(username);
  if (!profile) return;
  profile.history = [
    { ...entry, id: crypto.randomUUID(), timestamp: new Date().toISOString() },
    ...(profile.history || [])
  ];
  localStorage.setItem(profileKeyFor(username), JSON.stringify(profile));
}

export function appendPayment(username, payment) {
  const profile = getProfile(username);
  if (!profile) return;
  profile.payments = [payment, ...(profile.payments || [])];
  localStorage.setItem(profileKeyFor(username), JSON.stringify(profile));
}

export function appendAppeal(username, appeal) {
  const profile = getProfile(username);
  if (!profile) return;
  profile.appeals = [appeal, ...(profile.appeals || [])];
  localStorage.setItem(profileKeyFor(username), JSON.stringify(profile));
}

export function registerUser({ user, pass, name }) {
  const username = user.trim().toLowerCase();
  const password = pass.trim();
  const displayName = name.trim();

  if (!username || !password) {
    return { success: false, reason: 'invalid' };
  }

  if (password.length < 4) {
    return { success: false, reason: 'weak' };
  }

  const users = getUsers();
  if (users.some(existing => existing.user === username)) {
    return { success: false, reason: 'exists' };
  }

  const generatedName = displayName || username.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  const avatar = generatedName
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('') || username.slice(0, 2).toUpperCase();

  const newUser = { user: username, pass: password, name: generatedName, avatar };
  users.push(newUser);
  saveUsers(users);
  return { success: true, user: newUser };
}

function profileKeyFor(username) {
  return `lep_profile_${username}`;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
