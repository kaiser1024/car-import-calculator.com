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
        const div = document.createElement('div');
        div.className = item.id; // e.g. "question1"

        container.appendChild(div);
      }
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
