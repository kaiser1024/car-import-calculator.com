document.addEventListener("DOMContentLoaded", () => {

  if (
    typeof dictionary !== "object" ||
    !dictionary.formtitles
  ) return;

  const forms = document.querySelectorAll("form");

  Object.keys(dictionary.formtitles).forEach(formKey => {

    const translations = dictionary.formtitles[formKey];
    if (!translations) return;

    forms.forEach(form => {

      // ✅ form must have the class matching the formKey
      if (!form.classList.contains(formKey)) return;

      // ✅ avoid duplicates
      if (form.previousElementSibling?.classList.contains("form-title")) {
        return;
      }

      // ✅ determine language from form class
      const langClass = Array.from(form.classList)
        .find(cls => cls.startsWith("lang-"));

      const lang = langClass
        ? langClass.replace("lang-", "")
        : "en";

      const titleText = translations[lang] || translations["en"];
      if (!titleText) return;

      // ✅ build title DOM
      const wrapper = document.createElement("div");
      wrapper.classList.add("form-title");

      const heading = document.createElement("h2");
      heading.textContent = titleText;

      wrapper.appendChild(heading);

      // ✅ insert before form
      form.parentNode.insertBefore(wrapper, form);
    });
  });

});
