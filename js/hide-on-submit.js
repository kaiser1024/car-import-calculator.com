document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("button");
  const forms = document.querySelectorAll("form");
  const formTitles = document.querySelectorAll(".form-title");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // ✅ prevent submit / reload

      // ✅ find the form this button belongs to
      const form = button.closest("form");
      if (!form) return;

      // ✅ check for any select with placeholder still selected
      const selects = form.querySelectorAll("select");

      const hasPlaceholder = Array.from(selects).some(select => {
        const option = select.options[select.selectedIndex];
        return (
          select.value === "" ||
          (option && option.id === "placeholder")
        );
      });

      // ❌ if any placeholder found → STOP HERE
      if (hasPlaceholder) return;

      // ✅ otherwise hide everything
      forms.forEach(f => {
        f.classList.add("hide-on-submit");
      });

      formTitles.forEach(title => {
        title.classList.add("hide-on-submit");
      });
    });
  });

});
