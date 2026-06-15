document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    // ✅ condition
    if (!form.classList.contains("vehicles")) return;
    if (!form.classList.contains("m1")) return;

    // ✅ prevent duplicates
    if (form.querySelector("#brandselect")) return;

    // ✅ wrapper
    const wrapper = document.createElement("div");
    wrapper.classList.add("field");

    // ✅ label
    const label = document.createElement("label");
    label.setAttribute("for", "brandselect");
    label.textContent = "Brand";

    // ✅ select
    const select = document.createElement("select");
    select.id = "brandselect";

    // ✅ assemble
    wrapper.appendChild(label);
    wrapper.appendChild(select);

    // ✅ append to form (at the end)
    form.appendChild(wrapper);
  });

});
