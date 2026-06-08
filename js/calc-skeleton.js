// 1. Find all elements with a class containing "load-"
const containers = document.querySelectorAll('[class*="load-"]');

containers.forEach(container => {

  // 2. Extract the class that starts with "load-"
  const loadClass = Array.from(container.classList)
    .find(cls => cls.startsWith('load-'));

  if (!loadClass) return;

  // 3. Extract file name
  const formName = loadClass.replace('load-', '');

  // 4. Build path to JSON
  const jsonPath = `./json/${formName}.json`;

  // 5. Load JSON
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${jsonPath}`);
      }
      return response.json();
    })
    .then(data => {

      // 6. Loop through all fields
      Object.entries(data).forEach(([fieldId, field]) => {

        // Only create active fields
        if (!field.active) return;

        // 🔹 Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.id = fieldId;

        // 🔹 Create SELECT (empty for now)
        const select = document.createElement('select');
        select.id = fieldId + '-input'; // avoid duplicate IDs

        // 🔹 Create LABEL
        const label = document.createElement('label');
        label.setAttribute('for', select.id);
        label.textContent = field.label;

        // 🔹 Append in required order: select → label
        wrapper.appendChild(select);
        wrapper.appendChild(label);

        // 🔹 Add to page
        container.appendChild(wrapper);

      });

    })
    .catch(error => {
      console.error('Error loading JSON:', error);
    });

});
