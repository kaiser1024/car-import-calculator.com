// Find all elements with "load-"
const elements = document.querySelectorAll('[class*="load-"]');

elements.forEach(el => {

  const loadClass = Array.from(el.classList).find(c => c.startsWith('load-'));
  if (!loadClass) return;

  const formId = loadClass.replace('load-', '');
  const jsonPath = `./json/${formId}.json`;

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);
      return response.json();
    })
    .then(data => {

      Object.values(data).forEach(field => {

        if (!field.active) return;

        // 🔹 Wrapper
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'form-field';

        // 🔹 Label
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.id);

        // 🔹 Create element based on input-type
        let input = null;

        if (field["input-type"] === 'select') {
          input = document.createElement('select');

        } else if (field["input-type"] === 'textarea') {
          input = document.createElement('textarea');

        } else {
          // everything else is an input type
          input = document.createElement('input');
          input.type = field["input-type"]; // text, email, number, etc.
        }

        // ✅ Assign attributes
        if (input) {
          input.id = field.id;
          input.name = field.id;

          if (field.placeholder) {
            input.placeholder = field.placeholder;
          }
        }

        // 🔹 Label positioning
        if (field["label-position"] === "2") {
          if (input) fieldWrapper.appendChild(input);
          fieldWrapper.appendChild(label);
        } else {
          fieldWrapper.appendChild(label);
          if (input) fieldWrapper.appendChild(input);
        }

        // 🔹 Append to container
        el.appendChild(fieldWrapper);

      });

    })
    .catch(err => console.error(err));
});
