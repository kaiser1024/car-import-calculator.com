// load CSS files from /css/

const cssFiles = [
  '0.css' // placeholder
];

cssFiles.forEach(file => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `/css/${file}`;
  document.head.appendChild(link);
});
