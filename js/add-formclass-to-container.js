document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    const container = form.closest(".container.form");
    if (!container) return;

    form.classList.forEach(cls => {
      container.classList.add(cls);
    });

  });

});
