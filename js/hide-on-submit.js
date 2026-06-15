document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("button");
  const forms = document.querySelectorAll("form");
  const formTitles = document.querySelectorAll(".form-title");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // ✅ prevent submit / reload

      forms.forEach(form => {
        form.classList.add("hide-on-submit");
      });

      formTitles.forEach(title => {
        title.classList.add("hide-on-submit");
      });
    });
  });

});
