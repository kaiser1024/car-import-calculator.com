// load CSS
const cssScript = document.createElement('script');
cssScript.src = 'css.js';
document.head.appendChild(cssScript);

// load DB
const dbScript = document.createElement('script');
dbScript.src = './js/db.js';
document.head.appendChild(dbScript);

// load HTML manager
const htmlScript = document.createElement('script');
htmlScript.src = './js/html.js';
document.head.appendChild(htmlScript);
