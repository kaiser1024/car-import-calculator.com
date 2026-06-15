document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const summary = document.querySelector(".form-input-summary");
      if (!summary) return;

      // ✅ clear previous summary
      summary.innerHTML = "";

      const selects = document.querySelectorAll("select");

      selects.forEach(select => {
        const value = select.value;

        // ✅ skip placeholders / empty
        if (!value || value === "placeholder") return;

        const selectedOption = select.options[select.selectedIndex];
        if (!selectedOption) return;

        const text = selectedOption.textContent;
        const id = select.id;
        if (!id) return;

        // ✅ build summary block
        const wrapper = document.createElement("div");
        wrapper.classList.add("select-summary");

        const span = document.createElement("span");
        span.classList.add("select-value", id);
        span.textContent = text;

        wrapper.appendChild(span);
        summary.appendChild(wrapper);
      });
    });
  });

});
