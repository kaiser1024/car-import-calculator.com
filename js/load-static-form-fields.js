function loadStaticFormFields(jsonFilenames) {

    jsonFilenames.forEach(jsonFilename => {

        const formId = jsonFilename
            .replace("./json/", "")
            .replace(".json", "");

        const container = document.querySelector(`.loadform-${formId}`);

        fetch(jsonFilename)
            .then(response => response.json())
            .then(data => {

                Object.entries(data).forEach(([key, value]) => {

                    if (value.active === true) {

                        container.appendChild(
                            Object.assign(document.createElement("div"), { id: key })
                        );

                    }

                });

            })
            .catch(error => {
                console.error(`Error loading ${jsonFilename}`);
            });

    });

    const loadFormEventsScript = document.createElement("script");
    loadFormEventsScript.src = "./js/load-form-events.js";

    loadFormEventsScript.onload = function () {
        loadFormEvents(jsonFilenames);
    };

    document.body.appendChild(loadFormEventsScript);
}
