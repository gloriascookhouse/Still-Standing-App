// Load daily message
fetch('./messages.json')
  .then(res => res.json())
  .then(data => {
    const activeMessage = data.find(msg => msg.active);
    if (activeMessage) {
      document.getElementById('dailyMessage').innerText = activeMessage.message;
    }
  })
  .catch(err => console.error('Error loading messages:', err));

// Load articles
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

// Load calm content
fetch('./calm.json')
  .then(res => res.json())
  .then(calm => {
    document.getElementById('calmTitle').innerText = calm.title;
    document.getElementById('calmBody').innerText = calm.body;
  })
  .catch(err => console.error('Error loading calm content:', err));
