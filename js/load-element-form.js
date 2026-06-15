document.addEventListener("DOMContentLoaded", () => {
  const toolsDiv = document.querySelector(".tools");

  if (!toolsDiv) {
    console.error("No .tools section found");
    return;
  }

  if (!Array.isArray(elements)) {
    console.error("elements is not an array");
    return;
  }

  elements.forEach(section => {
    if (Array.isArray(section) && section[0] === "form") {

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.classList.add("container", "form");

      // Create form
      const form = document.createElement("form");

      // Create button
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Submit";

      // Add button inside form (before closing tag)
      form.appendChild(button);

      // Wrap form
      wrapper.appendChild(form);

      // Add to tools section
      toolsDiv.appendChild(wrapper);
    }
  });
});
