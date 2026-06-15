document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    // ✅ find lang-xx class on the form
    const langClass = Array.from(form.classList)
      .find(cls => cls.startsWith("lang-"));

    if (!langClass) return;

    // ✅ apply to all descendants
    const descendants = form.querySelectorAll("*");

    descendants.forEach(el => {
      el.classList.add(langClass);
    });

  });

});
