document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    const button = form.querySelector("button");
    if (!button) return;

    form.classList.forEach(cls => {

      // ❌ skip language class (already inherited earlier)
      if (cls.startsWith("lang-")) return;

      button.classList.add(cls);
    });

  });

});
