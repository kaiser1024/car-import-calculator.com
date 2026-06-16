// create <title> only if DB.pagetitle exists

if (window.DB && window.DB.pagetitle) {
  const titleHtml = document.createElement('title');
  titleHtml.textContent = window.DB.pagetitle;
  document.head.appendChild(titleHtml);
}
