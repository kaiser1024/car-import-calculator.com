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

    for (const step of path) {
      const match = current.find(item => item[0] === step);
      if (!match) return null;
      current = match[1];
    }

    return current;
  }

  forms.forEach(form => {

    // ✅ must be calculator form
    if (!form.classList.contains("calculator")) return;

    let classes = Array.from(form.classList);

    // ✅ extract country info
    const exportClass = classes.find(c => c.startsWith("coofexp")) || "";
    const importClass = classes.find(c => c.startsWith("coofimp")) || "";

    const countryPrefix = [exportClass, importClass]
      .filter(Boolean)
      .join("-");

    // ✅ strip system classes
    classes = classes.filter(c =>
      c !== "container" &&
      c !== "form" &&
      c !== "calculator"
    );

    const fields = findPath(calculator, classes);

    if (!Array.isArray(fields)) {
      console.warn("No matching fields for:", classes);
      return;
    }

    fields.forEach(field => {

      /* ----------------------------------------
         1. READ FIELD STRUCTURE (SAFE)
      ---------------------------------------- */

      const labels = field[0];
      const visibility = field[1];

      let selectType = null;
      let selectIds = null;

      // ✅ new unified structure
      if (Array.isArray(field[2])) {
        selectType = field[2][0];
        selectIds = field[2][1];
      } else {
        // legacy fallback
        selectType = field[2];
        selectIds = field[3];
      }

      if (!selectType) return;

      /* ----------------------------------------
         2. LABEL TEXT
      ---------------------------------------- */

      let labelText = labels[0];
      if (lang === "hu" && labels[1]) labelText = labels[1];

      /* ----------------------------------------
         3. WRAPPER + LABEL
      ---------------------------------------- */

      const wrapper = document.createElement("div");
      wrapper.classList.add("field", visibility);

      const baseId = `${countryPrefix}-${makeSafeId(labelText)}`;

      let firstSelectId = baseId;

      if (Array.isArray(selectIds) && selectIds[0]) {
        const raw = Array.isArray(selectIds[0]) ? selectIds[0][0] : selectIds[0];
        firstSelectId = `${countryPrefix}-${raw}`;
      }

      const label = document.createElement("label");
      label.setAttribute("for", firstSelectId);
      label.textContent = labelText;
      wrapper.appendChild(label);

      /* ----------------------------------------
         4. HOW MANY SELECTS?
      ---------------------------------------- */

      let selectCount = 1;

      if (typeof selectType === "string") {
        const parsed = parseInt(selectType.split("-")[0], 10);
        if (!isNaN(parsed)) selectCount = parsed;
      }

      /* ----------------------------------------
         5. CREATE SELECTS
      ---------------------------------------- */

      for (let i = 0; i < selectCount; i++) {
        const select = document.createElement("select");

        if (Array.isArray(selectIds) && selectIds[i]) {
          const rawId = Array.isArray(selectIds[i])
            ? selectIds[i][0]
            : selectIds[i];

          select.id = `${countryPrefix}-${rawId}`;
        } else {
          select.id = baseId + (selectCount > 1 ? i + 1 : "");
        }

        wrapper.appendChild(select);
      }

      /* ----------------------------------------
         6. INSERT INTO FORM
      ---------------------------------------- */

      const button = form.querySelector("button");
      if (button) {
        form.insertBefore(wrapper, button);
      } else {
        form.appendChild(wrapper);
      }

    });

  });

});
