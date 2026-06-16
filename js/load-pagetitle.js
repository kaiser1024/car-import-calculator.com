let lang = document.documentElement.lang.toLowerCase();

if (!dictionary.pagetitle[lang]) {
  lang = lang.split('-')[0];
}

if (!dictionary.pagetitle[lang]) {
  lang = 'en';
}

const titleText = dictionary.pagetitle[lang];
if (titleText) {
  document.title = titleText;
}
