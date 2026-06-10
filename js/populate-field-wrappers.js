document.addEventListener("DOMContentLoaded", () => {

    if (typeof formData === "undefined") {
        console.warn("formData is not defined");
        return;
    }

    Object.entries(formData).forEach(([formID, formFields]) => {
        const formContainer = document.getElementById(FormID);
        if (!formContainer) {
            console.warn(`Missing container: #${formID}`);
            return;
        }

        Object.entries(formFields).forEach(([itemKey, itemValue]) => {

            if (!itemValue.active) return;

            const formfieldWrapper = document.createElement("div");
            formfieldWrapper.id = itemKey;
            formfieldWrapper.dataset.parent = itemValue.parent;
            
        const noparent = itemValue.parent === "none";

            formfieldWrapper.className = noparent
                ? "formfield-wrapper-on"
                : "formfield-wrapper";

            if (noparent && itemValue.label) {
                const formfieldLabel = document.createElement("label");
                formfieldLabel.setAttribute("for", itemKey);
                formfieldLabel.textContent = itemValue.label;

            formContainer.appendChild(formfieldWrapper);
        });

    });

});
