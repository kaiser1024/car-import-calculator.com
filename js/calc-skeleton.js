const containers = document.querySelectorAll('[class*="load-"]');

containers.forEach(container => {

  const loadClass = Array.from(container.classList)
    .find(cls => cls.startsWith('load-'));

  if (!loadClass) return;

  const formName = loadClass.replace('load-', '');
  const jsonPath = `./json/${formName}.json`;

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${jsonPath}`);
      }
      return response.json();
    })
    .then(data => {

      Object.entries(data).forEach(([fieldId, field]) => {

        // ✅ Only create fields shown on page load
        if (!field.active || field["show-on-pageload"] !== true) return;

        // ✅ MULTI-SELECT (YEAR + MONTH)
if (field["input-type"] === "multi-select") {

  const wrapper = document.createElement('div');
  wrapper.id = fieldId;

  const label = document.createElement('label');
  label.textContent = field.label;

  container.appendChild(wrapper);
  wrapper.appendChild(label);

  const inputs = field.inputs;
  const layout = field.layout;

  let elements = [];

  inputs.forEach((input, index) => {

    const select = document.createElement('select');
    select.id = `${fieldId}-${index}`;

    // 🔹 YEAR
    if (input.type === "year-range") {
      const currentYear = new Date().getFullYear();
      const startYear = input["year-start"];

      for (let y = currentYear; y >= startYear; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        select.appendChild(opt);
      }
    }

    // 🔹 MONTH
    else if (input.type === "month-range") {
      for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        const padded = String(m).padStart(2, '0');
        opt.value = padded;
        opt.textContent = padded;
        select.appendChild(opt);
      }
    }

    elements.push(select);
  });

  // ✅ Layout control
  if (layout === "MMYY") {
    elements.reverse();
  }

  elements.forEach(el => wrapper.appendChild(el));

  return; // ✅ VERY IMPORTANT: skip normal select logic
}

        // 🔹 Wrapper
        const wrapper = document.createElement('div');
        wrapper.id = fieldId;

        // 🔹 Select
        const select = document.createElement('select');
        select.id = fieldId + '-input';

        // 🔹 Label
        const label = document.createElement('label');
        label.setAttribute('for', select.id);
        label.textContent = field.label;

        // 🔹 Append select → label
        wrapper.appendChild(select);
        wrapper.appendChild(label);
        container.appendChild(wrapper);

        // ✅ SELECT LOADING LOGIC
        const loadType = field["select-load"];

        // 🔹 LIST LOADING
        if (loadType === "list") {

          const selectPath = `./select/${fieldId}.json`;

          fetch(selectPath)
            .then(res => {
              if (!res.ok) {
                throw new Error(`Missing select file: ${selectPath}`);
              }
              return res.json();
            })
            .then(options => {

              if (!Array.isArray(options)) {
                console.warn(`Invalid format in ${selectPath}`);
                return;
              }

              options.forEach(opt => {
                const optionEl = document.createElement('option');
                optionEl.value = opt.key;
                optionEl.textContent = opt.value;
                select.appendChild(optionEl);
              });

            })
            .catch(err => {
              console.warn(`Select load failed for ${fieldId}:`, err.message);
            });

        }

        // 🔹 YEAR RANGE
        else if (loadType === "year-range") {

          const startYear = field["year-start"];

          if (!startYear) {
            console.warn(`Missing "year-start" for ${fieldId}`);
            return;
          }

          const currentYear = new Date().getFullYear();

          for (let year = currentYear; year >= startYear; year--) {
            const optionEl = document.createElement('option');
            optionEl.value = year;
            optionEl.textContent = year;
            select.appendChild(optionEl);
          }
        }

          // 🔹 GENERIC RANGE WITH UNIT
else if (loadType === "range") {

  const start = field["range-start"];
  const end = field["range-end"];
  const step = field["range-step"] || 1;
  const unit = field["range-unit"] || "";

  if (start === undefined || end === undefined) {
    console.warn(`Missing range-start or range-end for ${fieldId}`);
    return;
  }

  // Safety: avoid infinite loops
  if (step <= 0) {
    console.warn(`Invalid range-step for ${fieldId}`);
    return;
  }

  for (let value = start; value <= end; value += step) {
    const optionEl = document.createElement('option');
    optionEl.value = value;

    // ✅ display with unit
    optionEl.textContent = unit
      ? `${value} ${unit}`
      : value;

    select.appendChild(optionEl);
  }
}

        // 🔹 SAFETY WARNINGS
        else if (!loadType) {
          console.warn(`No select-load defined for ${fieldId}`);
        }
        else {
          console.warn(`Unknown select-load "${loadType}" for ${fieldId}`);
        }

      });

    })
    .catch(error => {
      console.error('Skeleton JS error:', error);
    });

});
