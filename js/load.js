// Find all elements with "load-"
const elements = document.querySelectorAll('[class*="load-"]');

elements.forEach(el => {

  const loadClass = Array.from(el.classList).find(c => c.startsWith('load-'));
  if (!loadClass) return;

  const formId = loadClass.replace('load-', '');

  // ✅ Updated path (your requirement)
  const jsonPath = `./json/${formId}.json`;

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);
      return response.json();
    })
    .then(data => {

      Object.values(data).forEach(field => {

        // ✅ Only active fields
        if (!field.active) return;

        // 🔹 1. Create wrapper
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'form-field';

        // 🔹 2. Create label
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.id);

        fieldWrapper.appendChild(label);

        // 🔹 3. Create input based on type
        let input;

        if (field.type === 'select') {
          input = document.createElement('select');
        }

        // ✅ Assign ID if input exists
        if (input) {
          input.id = field.id;
          input.name = field.id;

          fieldWrapper.appendChild(input);
        }

        // 🔹 4. Append to container
        el.appendChild(fieldWrapper);

      });

    })
    .catch(err => console.error(err));
});
