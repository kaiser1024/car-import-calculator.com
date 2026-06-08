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

        // ✅ 🔥 LOAD OPTIONS BASED ON select-load
        if (field["select-load"] === "list") {

          const selectPath = `./select/${fieldId}.json`;

          fetch(selectPath)
            .then(res => {
              if (!res.ok) {
                throw new Error(`Missing select file: ${selectPath}`);
              }
              return res.json();
            })
            .then(options => {

              // Optional placeholder
              const placeholder = document.createElement('option');
              placeholder.value = '';
              placeholder.textContent = '-- Select --';
              select.appendChild(placeholder);

              // Populate options
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

      });

    })
    .catch(error => {
      console.error('Skeleton JS error:', error);
    });

});
