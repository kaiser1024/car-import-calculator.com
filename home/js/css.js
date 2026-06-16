// load CSS files from /css/

const cssFiles = [
  '0.css' // placeholder
];

cssFiles.forEach(cssFile => {
  const cssFilesLink = document.createElement('link');
  cssFilesLink.rel = 'stylesheet';
  cssFilesLink.href = `/css/${cssFile}`;
  document.head.appendChild(cssFilesLink);
});
