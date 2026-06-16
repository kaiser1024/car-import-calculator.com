const langScript = document.createElement('script');
const pagetitleScript = document.createElement('script');

langScript.src = './js/html/1-lang.js';
pagetitleScript.src = './js/html/1-pagetitle.js';

document.head.appendChild(langScript);
document.head.appendChild(pagetitleScript);
