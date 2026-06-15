document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("button");
  const forms = document.querySelectorAll("form");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // ✅ prevent submit / reload

      forms.forEach(form => {
        form.classList.add("hide-on-submit");
      });
    });
  });

});
