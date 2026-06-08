// Find all containers with "load-"
const containers = document.querySelectorAll('[class*="load-"]');

containers.forEach(container => {

  const loadClass = Array.from(container.classList)
    .find(cls => cls.startsWith('load-'));

  if (!loadClass) return;

  const formName = loadClass.replace('load-', '');
  const jsonPath = `./json/${formName}.json`;

  // Load same JSON again
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${jsonPath}`);
      }
      return response.json();
    })
    .then(data => {

      Object.entries(data).forEach(([fieldId, field]) => {

        // Find the already-created wrapper div
        const fieldDiv = document.getElementById(fieldId);

        if (!fieldDiv) return;

        // ✅ Apply visibility rule
        if (field["show-on-pageload"] === true) {
          fieldDiv.style.display = 'block';
        } else {
          fieldDiv.style.display = 'none';
        }

      });

    })
    .catch(error => {
      console.error('Visibility JS error:', error);
    });

});
