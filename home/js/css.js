// load CSS files from /css/

const cssFiles = [
  '0.css' // placeholder
];

cssFiles.forEach(cssFile => {
  const cssfilesLink = document.createElement('link');
  cssfilesLink.rel = 'stylesheet';
  cssfilesLink.href = `/css/${file}`;
  document.head.appendChild(link);
});
