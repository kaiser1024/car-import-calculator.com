document.addEventListener("DOMContentLoaded", () => {

    if (typeof formData === "undefined") {
        console.warn("formData is not defined");
        return;
    }

    Object.entries(formData).forEach(([formID, formFields]) => {

        const formContainer = document.querySelector(`.${formID}`);
        if (!formContainer) {
            console.warn(`Missing container: .${formID}`);
            return;
        }

        Object.entries(formFields).forEach(([itemKey, itemValue]) => {

            if (!itemValue.active) return;

            const formfieldWrapper = document.createElement("div");
            formfieldWrapper.id = itemKey;
            formfieldWrapper.dataset.parent = itemValue.parent;

            const isRoot = itemValue.parent === "none";

            formfieldWrapper.className = isRoot
                ? "formfield-wrapper-on"
                : "formfield-wrapper";

            // ✅ LABEL (only for ON fields)
            if (isRoot && itemValue.label) {
                const label = document.createElement("label");
                label.setAttribute("for", itemKey);
                label.textContent = itemValue.label;
                formfieldWrapper.appendChild(label);
            }

            // ✅ SELECTS (only for ON fields)
            if (isRoot && itemValue.select) {
                const selectCount = Number(itemValue.select);

                for (let i = 0; i < selectCount; i++) {
                    const select = document.createElement("select");
                    select.name = `${itemKey}-select-${i + 1}`;
                    select.dataset.index = i + 1;

                    // placeholder option
                    const option = document.createElement("option");
                    option.value = "";
                    option.textContent = "Select...";
                    select.appendChild(option);

                    formfieldWrapper.appendChild(select);
                }
            }

            formContainer.appendChild(formfieldWrapper);
        });
    });
});
