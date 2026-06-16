// create <title> only if DB.title exists

if (window.DB && window.DB.title) {
  const titleEl = document.createElement('title');
  titleEl.textContent = window.DB.title;
  document.head.appendChild(titleEl);
}
