document.addEventListener("DOMContentLoaded", () => {

  if (typeof dictionary !== "object" || !dictionary.labels) return;

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    // ✅ extract language from form class (lang-en, lang-hu, etc.)
    const langClass = Array.from(form.classList).find(c => c.startsWith("lang-"));
    if (!langClass) return;

    const lang = langClass.replace("lang-", "");

    // ✅ process all labels inside this form
    const labels = form.querySelectorAll("label");

    labels.forEach(label => {

      const key = label.getAttribute("for");
      if (!key) return;

      const translations = dictionary.labels[key];
      if (!translations) return;

      const text =
        translations[lang] ||
        translations["en"]; // optional fallback, remove if not wanted

      if (!text) return;

      label.textContent = text;
    });

  });

});
