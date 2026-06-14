document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll(".tools form");
  const lang = document.documentElement.lang || "en";

  function makeSafeId(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .trim();
  }

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

    let classes = Array.from(form.classList);

    // ✅ extract country info
    const fromClass = classes.find(c => c.startsWith("from")) || "";
    const toClass = classes.find(c => c.startsWith("to")) || "";

    const countryPrefix = `${fromClass}-${toClass}`; // ✅ KEY CHANGE

    // remove system classes
    classes = classes.filter(c =>
      c !== "container" &&
      c !== "form" &&
      c !== "calculator"
    );

    if (!form.classList.contains("calculator")) return;

    const fields = findPath(calculator, classes);

    if (!fields) {
      console.warn("No matching fields for:", classes);
      return;
    }

    fields.forEach(field => {

      const labels = field[0];
      const visibility = field[1];
      const selectType = field[2];
      const selectIds = field[3];

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

      // ✅ include country prefix in ID
      const baseId = `${countryPrefix}-${makeSafeId(labelText)}`;

      const wrapper = document.createElement("div");
      wrapper.classList.add("field", visibility);

      const label = document.createElement("label");
      label.setAttribute("for", baseId);
      label.textContent = labelText;

      wrapper.appendChild(label);

      const selectCount = parseInt(selectType);

      for (let i = 0; i < selectCount; i++) {

        const select = document.createElement("select");

        if (Array.isArray(selectIds) && selectIds[i]) {
          // ✅ prepend country info to select IDs
          select.id = `${countryPrefix}-${selectIds[i]}`;
        } else {
          select.id = baseId + (selectCount > 1 ? i + 1 : "");
        }

        wrapper.appendChild(select);
      }

      const button = form.querySelector("button");
      if (button) {
        form.insertBefore(wrapper, button);
      } else {
        form.appendChild(wrapper);
      }

    });

  });

});
