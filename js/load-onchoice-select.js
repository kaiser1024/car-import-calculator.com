document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll(".tools form");

  function findPath(tree, path) {
    let current = tree;

    for (let step of path) {
      const match = current.find(item => item[0] === step);
      if (!match) return null;
      current = match[1];
    }

    return current;
  }

  forms.forEach(form => {

    let classes = Array.from(form.classList);

    const exportClass = classes.find(c => c.startsWith("coofexp")) || "";
    const importClass = classes.find(c => c.startsWith("coofimp")) || "";

    const countryPrefix = [exportClass, importClass]
      .filter(Boolean)
      .join("-");

    classes = classes.filter(c =>
      c !== "container" &&
      c !== "form" &&
      c !== "calculator"
    );

    if (!form.classList.contains("calculator")) return;

    const fields = findPath(calculator, classes);
    if (!fields) return;

    fields.forEach(field => {

      const selectConfig = field[2];

      // ✅ only process 2-select-onchoice
      if (!Array.isArray(selectConfig)) return;
      if (selectConfig[0] !== "2-select-onchoice") return;

      const selectors = selectConfig[1];

      const [first, second] = selectors;

      const [firstIdRaw, firstReq] = first;
      const [secondIdRaw, secondReq] = second;

      // ✅ build FULL IDs (same logic as generator)
      const firstId = `${countryPrefix}-${firstIdRaw}`;
      const secondId = `${countryPrefix}-${secondIdRaw}`;

      const firstSelect = document.getElementById(firstId);
      const secondSelect = document.getElementById(secondId);

      if (!firstSelect || !secondSelect) return;

      // ✅ initial state
      secondSelect.classList.add("onchoice");

      // ✅ populate first select
      populateSelect(firstSelect, brandselector);

      if (firstReq === "required") {
        firstSelect.setAttribute("required", true);
      }

      // ✅ listener
      firstSelect.addEventListener("change", () => {

        const selectedValue = firstSelect.value;

        firstSelect.classList.add("selected");

        // reset second
        secondSelect.innerHTML = "";

        const models = modelselector.options[selectedValue];

        // ✅ no models → stay hidden
        if (!models) {
          secondSelect.classList.remove("selected");
          secondSelect.classList.add("onchoice");
          return;
        }

        // ✅ populate second
        populateSelect(secondSelect, {
          placeholder: modelselector.placeholder,
          options: models
        });

        if (secondReq === "required") {
          secondSelect.setAttribute("required", true);
        }

        secondSelect.classList.remove("onchoice");
        secondSelect.classList.add("selected");
      });

    });

  });

});


// ✅ reusable builder
function populateSelect(select, data) {

  select.innerHTML = "";

  // placeholder
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = data.placeholder;
  placeholder.disabled = true;
  placeholder.selected = true;

  select.appendChild(placeholder);

  // options
  for (const key in data.options) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = data.options[key];
    select.appendChild(option);
  }
}
