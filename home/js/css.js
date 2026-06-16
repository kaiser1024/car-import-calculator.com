// load CSS files from /root-css/

const cssFiles = [
  '0.css' // placeholder – add more files here later
];

cssFiles.forEach(file => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `/root-css/${file}`;
  document.head.appendChild(link);
});
