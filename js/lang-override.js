document.addEventListener("DOMContentLoaded", () => {

  if (typeof langoverride !== "object") return;

  const forms = document.querySelectorAll("form");

  Object.entries(langoverride).forEach(([lang, condition]) => {

    // ✅ skip empty overrides
    if (!condition) return;

    // normalize conditions to array
    const requiredClasses = Array.isArray(condition)
      ? condition
      : [condition];

    forms.forEach(form => {

      // ✅ check all required classes
      const matches = requiredClasses.every(cls =>
        form.classList.contains(cls)
      );

      if (!matches) return;

      // ✅ remove existing lang-* classes
      Array.from(form.classList)
        .filter(cls => cls.startsWith("lang-"))
        .forEach(cls => form.classList.remove(cls));

      // ✅ apply new language
      form.classList.add(`lang-${lang}`);
      form.setAttribute("lang", lang);
    });

  });

});
