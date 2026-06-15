document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // ✅ scope to the clicked form only
      const form = button.closest("form");
      if (!form) return;

      // ✅ find all error containers inside this form
      const errors = form.querySelectorAll(".error");
      if (!errors.length) return;

      errors.forEach(error => {

        // ✅ determine language from class (lang-en, lang-hu, etc.)
        const langClass = Array.from(error.classList)
          .find(cls => cls.startsWith("lang-"));

        const lang = langClass
          ? langClass.replace("lang-", "")
          : "en";

        const message = dictionary?.errormessages?.[lang];
        if (!message) return;

        // ✅ find warning paragraph
        const warning = error.querySelector(".warning");
        if (!warning) return;

        warning.textContent = message;
      });
    });
  });

});
