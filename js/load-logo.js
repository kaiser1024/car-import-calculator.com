
fetch('./html/load-logo.html')
  .then(res => res.text())
  .then(html => {
    const container = document.querySelector('.logo .container');
    if (container) {
      container.innerHTML = html;
    }
  });
