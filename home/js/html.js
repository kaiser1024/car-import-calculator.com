const charsetScript = document.createElement('script');
const langScript = document.createElement('script');
const pagetitleScript = document.createElement('script');

charsetScript.src = './js/html/1-charset.js';
langScript.src = './js/html/1-lang.js';
pagetitleScript.src = './js/html/1-pagetitle.js';

document.head.appendChild (charsetScript);
document.head.appendChild(langScript);
document.head.appendChild(pagetitleScript);

