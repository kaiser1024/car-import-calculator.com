// Step 1: find all elements that contain a class starting with "load-"
const elements = document.querySelectorAll('[class*="load-"]');

elements.forEach(el => {
  // Find the specific "load-*" class
  const loadClass = Array.from(el.classList).find(c => c.startsWith('load-'));

  if (!loadClass) return;

  // Extract the part after "load-"
  const formId = loadClass.replace('load-', '');

  // Build JSON path
  const jsonPath = `./json/${formId}.json`;

  console.log(`Loading form: ${formId} from ${jsonPath}`);

  // Fetch the JSON
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not load ${jsonPath}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Loaded data for ${formId}:`, data);

      // 👉 next step: render into `el`
    })
    .catch(err => {
      console.error(err);
    });
});
