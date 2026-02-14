let messageIndex = 0;
let calmIndex = 0;
let articleIndex = 0;

let messages = [];
let calms = [];
let articles = [];

/* ------------------ FETCH DATA ------------------ */

fetch("messages.json")
  .then(res => res.json())
  .then(data => {
    messages = data;
    updateMessage();
  })
  .catch(() => {
    document.getElementById("message").innerText = "Could not load messages.";
  });

fetch("calm.json")
  .then(res => res.json())
  .then(data => {
    calms = data;
    updateCalm();
  })
  .catch(() => {
    document.getElementById("calm").innerText = "Could not load calm content.";
  });

fetch("articles.json")
  .then(res => res.json())
  .then(data => {
    articles = data;
    updateArticle();
  })
  .catch(() => {
    document.getElementById("article").innerText = "Could not load articles.";
  });


/* ------------------ UPDATE FUNCTIONS ------------------ */

function updateMessage() {
  if (messages.length === 0) return;

  document.getElementById("message").innerText = messages[messageIndex];
  document.getElementById("messageCounter").innerText =
    `${messageIndex + 1} / ${messages.length}`;
}

function updateCalm() {
  if (calms.length === 0) return;

  document.getElementById("calm").innerText = calms[calmIndex];
  document.getElementById("calmCounter").innerText =
    `${calmIndex + 1} / ${calms.length}`;
}

function updateArticle() {
  if (articles.length === 0) return;

  document.getElementById("article").innerText = articles[articleIndex];
  document.getElementById("articleCounter").innerText =
    `${articleIndex + 1} / ${articles.length}`;
}


/* ------------------ NEXT BUTTONS ------------------ */

function nextMessage() {
  if (messages.length === 0) return;

  messageIndex = (messageIndex + 1) % messages.length;
  updateMessage();
}

function nextCalm() {
  if (calms.length === 0) return;

  calmIndex = (calmIndex + 1) % calms.length;
  updateCalm();
}

function nextArticle() {
  if (articles.length === 0) return;

  articleIndex = (articleIndex + 1) % articles.length;
  updateArticle();
}
