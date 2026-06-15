document.addEventListener("DOMContentLoaded", () => {

  const selects = document.querySelectorAll("select");

  selects.forEach(select => {

    const id = select.id;
    if (!id) return;

    // ✅ prevent duplicates
    const next = select.nextElementSibling;
    if (next && next.classList.contains("error") && next.classList.contains(id)) {
      return;
    }

    // ✅ create error wrapper
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error", id);

    // ✅ create warning paragraph
    const warning = document.createElement("p");
    warning.classList.add("warning");

    errorDiv.appendChild(warning);

    // ✅ insert after select
    select.parentNode.insertBefore(errorDiv, select.nextSibling);
  });

});
