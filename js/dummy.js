
fetch('html/dummy.html')
  .then(res => res.text())
  .then(html => {
    const container = document.querySelector('#faq .container');
    if (container) {
      container.innerHTML = html;
    }
  });
