const API_URL = "http://localhost:5000";

// UI elements
const landing = document.getElementById("landing");
const authForms = document.getElementById("authForms");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const app = document.getElementById("app");

// show forms
document.getElementById("showLogin").onclick = () => {
  landing.classList.add("hidden");
  authForms.classList.remove("hidden");
  loginForm.classList.remove("hidden");
};

document.getElementById("showSignup").onclick = () => {
  landing.classList.add("hidden");
  authForms.classList.remove("hidden");
  signupForm.classList.remove("hidden");
};

// LOGIN
document.getElementById("loginBtn").onclick = async () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.user.name);
    startApp();
  } else {
    alert(data.message);
  }
};

// SIGNUP
document.getElementById("signupBtn").onclick = async () => {
  const name = signupName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const dob = signupDOB.value;

  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, password, dob })
  });

  const data = await res.json();

  if (res.ok) {
    alert("account created. now log in.");
  } else {
    alert(data.message);
  }
};

// START APP
function startApp() {
  authForms.classList.add("hidden");
  app.classList.remove("hidden");

  document.getElementById("welcome").innerText =
    "welcome, " + localStorage.getItem("name");

  loadCategories();
}

// LOAD MESSAGES
async function loadCategories() {
  const categories = document.querySelectorAll(".category");

  for (let cat of categories) {
    const file = cat.dataset.file;
    const res = await fetch(`data/${file}`);
    const messages = await res.json();

    messages.forEach(m => {
      const div = document.createElement("div");
      div.className = "message";
      div.innerText = m;
      cat.appendChild(div);
    });
  }
}
