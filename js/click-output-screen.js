document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("button");
  const toolsSection = document.querySelector(".tools");

  if (!toolsSection) return;

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // ✅ prevent duplicate output container
      let outputContainer = toolsSection.querySelector("#form-output");

      if (!outputContainer) {
        outputContainer = document.createElement("div");
        outputContainer.classList.add("container", "form-output");
        outputContainer.id = "form-output";

        const summary = document.createElement("div");
        summary.classList.add("form-input-summary");

        outputContainer.appendChild(summary);
        toolsSection.appendChild(outputContainer);
      }
    });
  });

});
