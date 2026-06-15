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
   const exportClass = classes.find(c => c.startsWith("coofexp")) || "";
   const importClass = classes.find(c => c.startsWith("coofimp")) || "";

  const countryPrefix = [exportClass, importClass]
    .filter(Boolean)
    .join("-");

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
      let selectType;
      let selectIds;

// ✅ NEW STRUCTURE SUPPORT
if (Array.isArray(field[2])) {
  selectType = field[2][0];   // "2-select-onchoice"
  selectIds = field[2][1];    // selectors array
} else {
  // fallback (old structure, if ever used)
  selectType = field[2];
  selectIds = field[3];
}

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

      let firstSelectId;

if (Array.isArray(selectIds) && selectIds[0]) {
  firstSelectId = `${countryPrefix}-${selectIds[0]}`;
} else {
  firstSelectId = baseId;
}

const label = document.createElement("label");
label.setAttribute("for", firstSelectId);
      label.textContent = labelText;

      wrapper.appendChild(label);

      const selectCount = parseInt(selectType.split("-")[0]);
      
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
