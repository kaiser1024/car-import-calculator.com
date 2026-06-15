document.addEventListener("DOMContentLoaded", () => {

  if (!Array.isArray(elements)) return;

  const forms = document.querySelectorAll("form");
  let formIndex = 0;

  elements.forEach(row => {

    if (!Array.isArray(row)) return;
    if (row[0] !== "form") return;

    const form = forms[formIndex];
    if (!form) return;

    // add all remaining items as classes
    row.slice(1).forEach(cls => {
      if (typeof cls === "string") {
        form.classList.add(cls);
      }
    });

    formIndex++;
  });

});
