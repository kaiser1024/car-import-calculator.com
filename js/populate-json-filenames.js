function populateJsonFilenames(formIds) {

    const jsonFilenames = [];

    formIds.forEach(formId => {
        const jsonFilename = `./json/${formId}.json`;
        jsonFilenames.push(jsonFilename);
    });

    console.log(jsonFilenames);

    const loadStaticFormFieldsScript = document.createElement("script");
    loadStaticFormFieldsScript.src = "./js/load-static-form-fields.js";

    loadStaticFormFieldsScript.onload = function () {
        loadStaticFormFields(jsonFilenames);
    };

    document.body.appendChild(loadStaticFormFieldsScript);
}
