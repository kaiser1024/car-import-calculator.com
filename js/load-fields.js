fetch('./tool/input-template.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load JSON');
    }
    return response.json();
  })
  .then(data => {
    const test = document.querySelector('.test');

    if (!test) {
      console.error('Container .test not found');
      return;
    }

    Object.values(data).forEach(item => {
      if (item.active === true) {
        
        // Create wrapper div (question1, question2, etc.)
        const fieldDiv = document.createElement('div');
        fieldDiv.className = item.id;

        // ✅ Create label
        const label = document.createElement('label');
        label.textContent = item.label;

        // (Optional but recommended)
        label.setAttribute('for', item.id);

        // ✅ Append label to the div
        fieldDiv.appendChild(label);

        // ✅ Append div to form container
        test.appendChild(fieldDiv);
      }
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
