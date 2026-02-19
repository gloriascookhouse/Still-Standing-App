let currentSection = "";
let currentIndex = 0;
let sectionData = [];

const sectionDescriptions = {
  financial: "Guidance for reducing financial pressure and rebuilding stability.",
  immigration: "Support for navigating systems and transition.",
  burnout: "Clarity and grounding while functioning under exhaustion.",
  relationships: "Perspective for marriage, parenting, and boundaries.",
  isolation: "Understanding loneliness and rebuilding connection."
};

/* DAILY ROTATING MESSAGE */
function loadDailyMessage() {
  fetch("data/financial.json")
    .then(res => res.json())
    .then(data => {
      const dayIndex = new Date().getDate() % data.length;
      document.getElementById("dailyMessage").innerText = data[dayIndex];
    });
}

loadDailyMessage();

/* OPEN CATEGORY */
function openSection(section) {
  currentSection = section;
  currentIndex = 0;

  fetch(`data/${section}.json`)
    .then(res => res.json())
    .then(data => {
      sectionData = data;

      document.getElementById("modalTitle").innerText =
        section.charAt(0).toUpperCase() + section.slice(1);

      document.getElementById("modalDescription").innerText =
        sectionDescriptions[section];

      showMessage();
      document.getElementById("modal").classList.remove("hidden");
    });
}

function showMessage() {
  const textElement = document.getElementById("modalText");
  textElement.innerText = sectionData[currentIndex];
}

function nextItem() {
  currentIndex = (currentIndex + 1) % sectionData.length;
  showMessage();
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* FAVORITES */
function saveFavorite() {
  const message = sectionData[currentIndex];
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(message)) {
    favorites.push(message);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Saved to favorites.");
  }
}

function openFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const list = document.getElementById("favoritesList");
  list.innerHTML = "";

  if (favorites.length === 0) {
    list.innerHTML = "<p>No saved messages yet.</p>";
  } else {
    favorites.forEach(msg => {
      const p = document.createElement("p");
      p.innerText = msg;
      list.appendChild(p);
    });
  }

  document.getElementById("favoritesModal").classList.remove("hidden");
}

function closeFavorites() {
  document.getElementById("favoritesModal").classList.add("hidden");
}

/* DARK MODE */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
