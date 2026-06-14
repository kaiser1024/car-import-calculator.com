document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".tools form");

  let formIndex = 0;

  elements.forEach(section => {
    if (Array.isArray(section) && section[0] === "form") {

      const parts = section.slice(1);

      if (forms[formIndex]) {
        // Add classes (multiple identifiers)
        forms[formIndex].classList.add(...parts);

        // Optional: still add unique ID
        forms[formIndex].id = parts.join("");

        formIndex++;
      }
    }
  });
});
