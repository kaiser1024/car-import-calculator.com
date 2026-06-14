document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll(".tools form");

  const lang = document.documentElement.lang || "en";

  // 🔧 Convert label text into safe ID
  function makeSafeId(text) {
    return text
      .toLowerCase()
      .normalize("NFD")                 // remove accents
      .replace(/[\u0300-\u036f]/g, "")  // remove diacritics
      .replace(/[^a-z0-9]/g, "")        // keep only safe chars
      .trim();
  }

  // 🔧 Traverse calculator structure
  function findPath(tree, path) {
    let current = tree;

    for (let step of path) {
      const match = current.find(item => item[0] === step);
      if (!match) return null;
      current = match[1];
    }

    return current;
  }

  forms.forEach(form => {

    // 🧠 Extract path from class list
    let classes = Array.from(form.classList);

    // remove system classes
    classes = classes.filter(c =>
      c !== "container" &&
      c !== "form" &&
      c !== "calculator" // root handled separately
    );

    // must start from calculator
    if (!form.classList.contains("calculator")) return;

    const fields = findPath(calculator, classes);

    if (!fields) {
      console.warn("No matching fields for:", classes);
      return;
    }

    // ✅ Create fields
    fields.forEach(field => {

      const labels = field[0];
      const visibility = field[1];   // onload / onlogic
      const selectType = field[2];   // "1-select", "2-select"
      const selectIds = field[3];

      // 🌍 Pick label based on language
      let labelText;

      if (lang === "en") {
        labelText = labels[0];
      } else if (lang === "hu") {
        labelText = labels[1];
      }
      /*
      else if (lang === "de") {
        labelText = labels[2];
      } else if (lang === "fr") {
        labelText = labels[3];
      }
      */

      // 🧠 Generate ID from label
      const baseId = makeSafeId(labelText);

      // 📦 Field wrapper
      const wrapper = document.createElement("div");
      wrapper.classList.add("field", visibility);

      // 🏷️ Label
      const label = document.createElement("label");
      label.setAttribute("for", baseId);
      label.textContent = labelText;

      wrapper.appendChild(label);

      // 🔢 Number of selects
      const selectCount = parseInt(selectType);

      for (let i = 0; i < selectCount; i++) {

        const select = document.createElement("select");

        // ✅ ID assignment
        // use provided IDs if exist, otherwise fallback to generated
        if (Array.isArray(selectIds) && selectIds[i]) {
          select.id = selectIds[i];
        } else {
          select.id = baseId + (selectCount > 1 ? i + 1 : "");
        }

        wrapper.appendChild(select);
      }

      // ➕ Add to form (before button if present)
      const button = form.querySelector("button");
      if (button) {
        form.insertBefore(wrapper, button);
      } else {
        form.appendChild(wrapper);
      }

    });

  });

});
