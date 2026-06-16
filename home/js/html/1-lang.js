// set <html lang=""> based on DB, fallback to 'en'

let lang = 'en';

if (window.DB && typeof window.DB.language === 'string' && window.DB.language.trim() !== '') {
  lang = window.DB.language;
}

document.documentElement.lang = lang;
