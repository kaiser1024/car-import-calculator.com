// load CSS files relative to index.html

const cssFiles = [
  '0.css'
];

cssFiles.forEach(cssFile => {
  const cssFilesLink = document.createElement('link');
  cssFilesLink.rel = 'stylesheet';
  cssFilesLink.href = `./css/${cssFile}`;
  document.head.appendChild(cssFilesLink);
});
