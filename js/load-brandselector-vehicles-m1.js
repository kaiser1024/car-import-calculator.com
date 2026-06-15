document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    if (!form.classList.contains("vehicle")) return;
    if (!form.classList.contains("m1")) return;

    if (form.querySelector("#brandselect")) return;

    const wrapper = document.createElement("div");
    wrapper.classList.add("field");

    const label = document.createElement("label");
    label.setAttribute("for", "brandselect");
    label.textContent = "Brand";

    const select = document.createElement("select");
    select.id = "brandselect";

    wrapper.appendChild(label);
    wrapper.appendChild(select);

    // ✅ INSERT BEFORE BUTTON
    const button = form.querySelector("button[type='submit'], button");

    if (button) {
      form.insertBefore(wrapper, button);
    } else {
      form.appendChild(wrapper);
    }
  });

});
