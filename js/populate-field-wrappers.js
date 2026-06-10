document.addEventListener("DOMContentLoaded", () => {

    if (typeof formData === "undefined" || typeof selectlist === "undefined") {
        console.warn("formData or selectlist is not defined");
        return;
    }

    Object.entries(formData).forEach(([formID, formFields]) => {

        // containers are classes: .calc-m1-de, .calc-m1-at, .calc-m1-be
        const formContainer = document.querySelector(`.${formID}`);
        if (!formContainer) {
            console.warn(`Missing container: .${formID}`);
            return;
        }

        Object.entries(formFields).forEach(([itemKey, itemValue]) => {

            if (!itemValue.active) return;

            const wrapper = document.createElement("div");
            wrapper.id = itemKey;
            wrapper.dataset.parent = itemValue.parent;

            const isRoot = itemValue.parent === "none";

            wrapper.className = isRoot
                ? "formfield-wrapper-on"
                : "formfield-wrapper";

            /* ---------- LABEL ---------- */
            if (isRoot && itemValue.label) {
                const label = document.createElement("label");
                label.setAttribute("for", itemKey);
                label.textContent = itemValue.label;
                wrapper.appendChild(label);
            }

            /* ---------- SELECT(S) ---------- */
            if (isRoot && itemValue.select) {
                const selectCount = Number(itemValue.select);

                for (let i = 0; i < selectCount; i++) {
                    const select = document.createElement("select");
                    select.name = `${itemKey}-${i + 1}`;

                    // placeholder
                    const placeholder = document.createElement("option");
                    placeholder.value = "";
                    placeholder.textContent = "Select...";
                    placeholder.disabled = true;
                    placeholder.selected = true;
                    select.appendChild(placeholder);

                    // populate from list
                    if (itemValue.selecttype === "list") {
                        const list = selectlist[itemKey];
                        if (list) {
                            Object.entries(list).forEach(([value, label]) => {
                                const option = document.createElement("option");
                                option.value = value;
                                option.textContent = label;
                                select.appendChild(option);
                            });
                        }
                    }

                    wrapper.appendChild(select);
                }
            }

            formContainer.appendChild(wrapper);
        });
    });
});
