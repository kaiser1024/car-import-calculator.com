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
            formfieldWrapper.className = "formfield-wrapper";
            formfieldWrapper.id = itemKey;
            formfieldWrapper.dataset.parent = itemValue.parent;

            formContainer.appendChild(formfieldWrapper);
        });

    });

});
