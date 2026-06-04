fetch('./html/calculator.html')
  .then(res => res.text())
  .then(html => {
    const calculator = document.querySelector('.calculator');
    if (calculator) {
      calculator.innerHTML = html;
    }
  });
