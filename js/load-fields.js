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

    // Loop through all fields
    Object.values(data).forEach(item => {
      if (item.active === true) {
        const fields = document.createElement('div');
        fields.className = item.id; // e.g. "question1"

        test.appendChild(fields);
      }
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
