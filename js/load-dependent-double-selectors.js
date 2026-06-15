document.addEventListener("DOMContentLoaded", () => {

  if (typeof dependentSelectors !== "object") return;

  // 1️⃣ loop top-level selector ids (e.g. brandselect)
  Object.keys(dependentSelectors).forEach(primaryId => {

    const primaryConfig = dependentSelectors[primaryId];
    if (!primaryConfig) return;

    // 2️⃣ find all selects with this id
    const primarySelects = document.querySelectorAll(`select#${primaryId}`);

    primarySelects.forEach(primarySelect => {

      const form = primarySelect.closest("form");
      if (!form) return;

      // 3️⃣ match next layer by form classes (vehicles, etc.)
      Object.keys(primaryConfig).forEach(level1Class => {
        if (!form.classList.contains(level1Class)) return;

        const level1Config = primaryConfig[level1Class];

        // 4️⃣ match next layer (m1, moto, etc.)
        Object.keys(level1Config).forEach(level2Class => {
          if (!form.classList.contains(level2Class)) return;

          const level2Config = level1Config[level2Class];
          const options = level2Config.options;
          if (!options) return;

          // ✅ load brand options
          loadPrimaryOptions(primarySelect, options);

          // ✅ listen for brand change
          primarySelect.addEventListener("change", () => {

            const brandKey = primarySelect.value;
            const brandData = options[brandKey];
            if (!brandData || !brandData.modelselect) return;

            const field = primarySelect.closest(".field");
            if (!field) return;

            // ✅ remove existing model select if present
            const existing = field.querySelector("select#modelselect");
            if (existing) existing.remove();

            // ✅ create model select
            const modelSelect = document.createElement("select");
            modelSelect.id = "modelselect";

            // ✅ load model options
            Object.entries(brandData.modelselect).forEach(([key, label]) => {
              const opt = document.createElement("option");
              opt.value = key;
              opt.textContent = label;
              modelSelect.appendChild(opt);
            });

            field.appendChild(modelSelect);
          });
        });
      });
    });
  });

  // helper: load brand options
  function loadPrimaryOptions(select, options) {
    // prevent duplicate population
    if (select.dataset.loaded === "true") return;
    select.dataset.loaded = "true";

    Object.entries(options).forEach(([key, data]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = data.label;
      select.appendChild(opt);
    });
  }

});
