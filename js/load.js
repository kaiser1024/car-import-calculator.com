
// ✅ 1. Helpers FIRST
function formatDisplayValue(value, prefix) {
  if (!prefix || prefix === 'none') return value;
  return `${value} ${prefix}`;
}


function createOptions(select, field) {

  const values = field["input-values"];
  const valueType = field["value-type"];

  if (!values) return;

  // 🔹 STRING
  if (valueType === 'string') {
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
  }

  // 🔹 BOOLEAN
  else if (valueType === 'boolean') {
    values.forEach((v, i) => {
      const opt = document.createElement('option');
      opt.value = (i === 0); // true/false
      opt.textContent = v;
      select.appendChild(opt);
    });
  }

  // 🔹 RANGE
  else if (valueType === 'range') {
    const start = Number(values[0]);
    const end = Number(values[1]);

    for (let i = start; i <= end; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      select.appendChild(opt);
    }
  }

  // 🔹 STRING CATEGORY
  else if (valueType === 'string-category') {
    values.forEach((v, i) => {
      const opt = document.createElement('option');
      opt.value = i + 1; // 1-based index
      opt.textContent = v;
      select.appendChild(opt);
    });
  }

  // 🔹 INTEGER
  else if (valueType === 'integer') {
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = parseInt(v);
      opt.textContent = v;
      select.appendChild(opt);
    });
  }
}


// MAIN LOOP (only modified part)
Object.values(data).forEach(field => {

  if (!field.active) return;

  const fieldWrapper = document.createElement('div');
  fieldWrapper.className = 'form-field';

  const label = document.createElement('label');
  label.textContent = field.label;
  label.setAttribute('for', field.id);

  let input = null;

  const type = field["input-type"];

  if (type === 'select') {
    input = document.createElement('select');
    createOptions(input, field); // ✅ NEW

  } else if (type === 'textarea') {
    input = document.createElement('textarea');

  } else {
    input = document.createElement('input');
    input.type = type;
  }

  if (input) {
    input.id = field.id;
    input.name = field.id;

    // ✅ Max length (fields 7,8,9)
    if (field["input-values"] && type !== 'select') {
      input.maxLength = parseInt(field["input-values"]);
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

  el.appendChild(fieldWrapper);
});
