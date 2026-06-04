fetch('./html/calculator.html')
  .then(res => res.text())
  .then(html => {
    const container = document.querySelector('.calculator');
    if (container) {
      container.innerHTML = html;
    }
  });
