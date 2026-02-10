// GLOBAL VARIABLES
let currentMessageIndex = 0;
let messagesData = [];
let calmData = [];

// ---------- LOAD MESSAGES ----------
fetch('./messages.json')
  .then(res => res.json())
  .then(data => {
    messagesData = data;
    // Find first active message index
    const activeIndex = messagesData.findIndex(msg => msg.active);
    currentMessageIndex = activeIndex !== -1 ? activeIndex : 0;
    showMessage(currentMessageIndex);
  })
  .catch(err => console.error('Error loading messages:', err));

function showMessage(index) {
  const msg = messagesData[index];
  if (msg) {
    document.getElementById('dailyMessage').innerText = msg.message;
  }
}

// Next Message Button
const nextBtn = document.createElement('button');
nextBtn.innerText = 'Next Message';
nextBtn.onclick = () => {
  currentMessageIndex = (currentMessageIndex + 1) % messagesData.length;
  showMessage(currentMessageIndex);
};
document.body.insertBefore(nextBtn, document.getElementById('articles'));

// ---------- LOAD ARTICLES ----------
fetch('./articles.json')
  .then(res => res.json())
  .then(articles => {
    const container = document.getElementById('articles');
    articles.forEach(a => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${a.title}</h3><p>${a.body}</p>`;
      container.appendChild(div);
    });
  })
  .catch(err => console.error('Error loading articles:', err));

// ---------- LOAD CALM CONTENT ----------
fetch('./calm.json')
  .then(res => res.json())
  .then(data => {
    calmData = [data]; // wrap single calm tip in array
    showCalm();
  })
  .catch(err => console.error('Error loading calm content:', err));

function showCalm() {
  const calmIndex = Math.floor(Math.random() * calmData.length);
  const calm = calmData[calmIndex];
  document.getElementById('calmTitle').innerText = calm.title;
  document.getElementById('calmBody').innerText = calm.body;
}

// Random Calm Button
const calmBtn = document.createElement('button');
calmBtn.innerText = 'New Calm Tip';
calmBtn.onclick = showCalm;
document.body.insertBefore(calmBtn, document.getElementById('calmBody'));
