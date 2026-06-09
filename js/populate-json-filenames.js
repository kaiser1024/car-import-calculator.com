function populateJsonFilenames(formIds) {

    const jsonFilenames = [];

    formIds.forEach(formId => {

        const jsonFilename = `./json/${formId}.json`;
        jsonFilenames.push(jsonFilename);

    });

    console.log(jsonFilenames);

    const loadStaticFormFields = document.createElement("script");
    loadStaticFormFields.src = "./js/load-static-form-fields.js";

    loadStaticFormFields.onload = function () {
        loadStaticFormFieldsFunction(jsonFilenames);
    };

    document.body.appendChild(loadStaticFormFields);
}
