let messageIndex = 0;
let articleIndex = 0;
let calmIndex = 0;

let messages = [];
let articles = [];
let calmTips = [];

// Load Messages
fetch('./messages.json')
  .then(res => res.json())
  .then(data => {
    messages = data;
    showMessage();
  });

function showMessage() {
  if (messages.length > 0) {
    document.getElementById('dailyMessage').innerText =
      messages[messageIndex].message;
  }
}

document.getElementById('nextMessageBtn').onclick = () => {
  messageIndex = (messageIndex + 1) % messages.length;
  showMessage();
};

// Load Articles
fetch('./articles.json')
  .then(res => res.json())
  .then(data => {
    articles = data;
    showArticle();
  });

function showArticle() {
  if (articles.length > 0) {
    document.getElementById('articleTitle').innerText =
      articles[articleIndex].title;
    document.getElementById('articleBody').innerText =
      articles[articleIndex].body;
  }
}

document.getElementById('nextArticleBtn').onclick = () => {
  articleIndex = (articleIndex + 1) % articles.length;
  showArticle();
};

// Load Calm Tips
fetch('./calm.json')
  .then(res => res.json())
  .then(data => {
    calmTips = Array.isArray(data) ? data : [data];
    showCalm();
  });

function showCalm() {
  if (calmTips.length > 0) {
    document.getElementById('calmTitle').innerText =
      calmTips[calmIndex].title;
    document.getElementById('calmBody').innerText =
      calmTips[calmIndex].body;
  }
}

document.getElementById('nextCalmBtn').onclick = () => {
  calmIndex = (calmIndex + 1) % calmTips.length;
  showCalm();
};
