const dailyMessages = [
  "Today’s Anchor: If you survived yesterday, you’re already winning.",
  "Today’s Anchor: Reduce pressure first, not tasks.",
  "Today’s Anchor: One step at a time is progress.",
];

let currentDaily = 0;
let favorites = [];

const dailyMsgEl = document.getElementById("dailyMessage");
const nextDailyBtn = document.getElementById("nextDaily");
const saveDailyBtn = document.getElementById("saveDaily");
const saveModal = document.getElementById("saveModal");
const closeSaveModal = document.getElementById("closeSaveModal");

const favoritesBtn = document.getElementById("favoritesBtn");
const favoritesModal = document.getElementById("favoritesModal");
const closeFavModal = favoritesModal.querySelector(".closeModal");
const favoritesContainer = document.getElementById("favoritesContainer");

const darkModeToggle = document.getElementById("darkModeToggle");

// Daily rotating message
function showDailyMessage() {
  dailyMsgEl.innerText = dailyMessages[currentDaily];
}
showDailyMessage();

nextDailyBtn.addEventListener("click", () => {
  currentDaily = (currentDaily + 1) % dailyMessages.length;
  showDailyMessage();
});

// Save/unsave daily message
saveDailyBtn.addEventListener("click", () => {
  const msg = dailyMessages[currentDaily];
  if (!favorites.includes(msg)) {
    favorites.push(msg);
    showSaveModal();
  } else {
    favorites = favorites.filter(m => m !== msg);
  }
});

function showSaveModal() {
  saveModal.style.display = "block";
}

closeSaveModal.addEventListener("click", () => {
  saveModal.style.display = "none";
});

// Favorites modal
favoritesBtn.addEventListener("click", () => {
  renderFavorites();
  favoritesModal.style.display = "block";
});

closeFavModal.addEventListener("click", () => {
  favoritesModal.style.display = "none";
});

function renderFavorites() {
  favoritesContainer.innerHTML = "";
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No saved messages yet.</p>";
    return;
  }
  favorites.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerText = msg;
    favoritesContainer.appendChild(div);
  });
}

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Load category messages
const categories = document.querySelectorAll(".category");
categories.forEach(cat => {
  let messages = [];
  let current = 0;
  fetch(`data/${cat.dataset.file}`)
    .then(res => res.json())
    .then(data => {
      messages = data;
      renderCategory(cat, messages, current);
      const nextBtn = cat.querySelector(".nextCategory");
      nextBtn.addEventListener("click", () => {
        current = (current + 1) % messages.length;
        renderCategory(cat, messages, current);
      });
    });
});

function renderCategory(cat, messages, index) {
  const container = cat.querySelector(".messagesContainer");
  container.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerText = messages[index];
  container.appendChild(div);
}
