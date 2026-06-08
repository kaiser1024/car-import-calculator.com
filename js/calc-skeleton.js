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

        // ✅ Only create fields that should show initially
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

        // 🔹 Append order: select → label
        wrapper.appendChild(select);
        wrapper.appendChild(label);

        container.appendChild(wrapper);

      });

    })
    .catch(error => {
      console.error('Skeleton JS error:', error);
    });

});
