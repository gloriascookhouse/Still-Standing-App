const API_URL = 'http://localhost:5000'; // backend
let currentDailyIndex = 0;
let dailyMessages = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// LOGIN & SIGNUP HANDLERS
const authModal = document.getElementById('authModal');
const mainApp = document.getElementById('mainApp');

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.user.name);
    showMainApp();
  } else alert(data.message || 'Login failed');
});

document.getElementById('signupBtn').addEventListener('click', async () => {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const dob = document.getElementById('signupDOB').value;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if (age < 16) return alert('You must be at least 16');

  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, dob })
  });
  const data = await res.json();
  if (res.ok) alert('Signup successful! Please login.');
  else alert(data.message || 'Signup failed');
});

function showMainApp() {
  authModal.classList.add('hidden');
  mainApp.classList.remove('hidden');
  document.getElementById('welcomeMsg').innerText = `Welcome, ${localStorage.getItem('name')}`;
  loadDailyMessages();
  loadCategories();
}

// LOAD DAILY MESSAGES
async function loadDailyMessages() {
  const res = await fetch('./data/anchors.json');
  dailyMessages = await res.json();
  showDailyMessage();
}

function showDailyMessage() {
  const msgEl = document.getElementById('dailyMessage');
  msgEl.innerText = dailyMessages[currentDailyIndex]?.message || 'No messages loaded.';
}

document.getElementById('nextDaily').addEventListener('click', () => {
  currentDailyIndex = (currentDailyIndex + 1) % dailyMessages.length;
  showDailyMessage();
});

// LOAD CATEGORY MESSAGES
async function loadCategories() {
  const categories = ['financial','immigration','burnout','relationships','isolation'];
  for (let cat of categories) {
    const res = await fetch(`./data/${cat}.json`);
    const messages = await res.json();
    const container = document.querySelector(`.category[data-category="${cat}"] .messages`);
    messages.forEach((m, i) => {
      const div = document.createElement('div');
      div.className = 'message';
      div.innerHTML = `
        <p>${m}</p>
        <button class="saveBtn">${favorites.includes(m) ? 'Unsave' : 'Save'}</button>
      `;
      const btn = div.querySelector('.saveBtn');
      btn.addEventListener('click', () => toggleFavorite(m, btn));
      container.appendChild(div);
    });
  }
}

// FAVORITES
const favoritesModal = document.getElementById('favoritesModal');
document.getElementById('favoritesBtn').addEventListener('click', () => {
  renderFavorites();
  favoritesModal.classList.remove('hidden');
});
document.getElementById('closeFavorites').addEventListener('click', () => {
  favoritesModal.classList.add('hidden');
});

function toggleFavorite(msg, btn) {
  if (favorites.includes(msg)) {
    favorites = favorites.filter(f => f !== msg);
    btn.innerText = 'Save';
  } else {
    favorites.push(msg);
    btn.innerText = 'Unsave';
    showSaveAlert();
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavorites() {
  const list = document.getElementById('favoritesList');
  list.innerHTML = '';
  favorites.forEach(f => {
    const div = document.createElement('div');
    div.className = 'favMsg';
    div.innerText = f;
    list.appendChild(div);
  });
}

// SAVE ALERT
const saveAlert = document.getElementById('saveAlert');
function showSaveAlert() {
  saveAlert.classList.remove('hidden');
  setTimeout(() => saveAlert.classList.add('hidden'), 1500);
}

// DARK MODE
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
