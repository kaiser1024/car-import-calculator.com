document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("button");
  const forms = document.querySelectorAll("form");
  const formTitles = document.querySelectorAll(".form-title");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // ✅ 1. scope validation to the clicked form only
      const form = button.closest("form");
      if (!form) return;

      const selects = form.querySelectorAll("select");

      const hasPlaceholder = Array.from(selects).some(select => {
        const option = select.options[select.selectedIndex];
        return (
          select.value === "" ||
          (option && option.id === "placeholder")
        );
      });

      // ❌ 2. if THIS form is invalid → STOP
      if (hasPlaceholder) return;

      // ✅ 3. THIS form is valid → hide EVERYTHING
      forms.forEach(f => {
        f.classList.add("hide-on-submit");
      });

      formTitles.forEach(title => {
        title.classList.add("hide-on-submit");
      });
    });
  });

});
