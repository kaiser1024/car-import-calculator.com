document.addEventListener("DOMContentLoaded", () => {

  if (!dictionary || !dictionary.placeholders) return;

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    // ✅ get language from form class (lang-en, lang-hu, etc.)
    const langClass = Array.from(form.classList).find(c => c.startsWith("lang-"));
    if (!langClass) return;

    const lang = langClass.replace("lang-", "");

    const selects = form.querySelectorAll("select");

    selects.forEach(select => {

      const id = select.id;
      if (!id) return;

      const translations = dictionary.placeholders[id];
      if (!translations) return;

      const text = translations[lang] || translations["en"];
      if (!text) return;

      // ✅ do not add placeholder twice
      if (select.querySelector("option#placeholder")) return;

      const option = document.createElement("option");
      option.id = "placeholder";
      option.value = "";
      option.textContent = text;
      option.disabled = true;
      option.selected = true;

      // ✅ insert as first option
      select.insertBefore(option, select.firstChild);
    });

  });

});
