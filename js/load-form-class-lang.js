document.addEventListener("DOMContentLoaded", () => {

  const lang = document.documentElement.lang;

  if (!lang) return;

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.classList.add(`lang-${lang}`);
  });

});
