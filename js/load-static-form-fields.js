
function loadStaticFormFieldsFunction(jsonFilenames) {

    jsonFilenames.forEach(jsonFilename => {

        fetch(jsonFilename)
            .then(response => response.json())
            .then(data => {

                Object.entries(data).forEach(([key, value]) => {

                    if (value.active === true) {

                        document.body.appendChild(
                      Object.assign(document.createElement("div"), { id: key })
                );
                    }

                });

            })
            .catch(error => {
                console.error(`Error loading ${jsonFilename}`);
            });

    });

    const loadFormEvents = document.createElement("script");
    loadFormEvents.src = "./js/load-form-events.js";

    loadFormEvents.onload = function () {
        loadFormEventsFunction(jsonFilenames);
    };

    document.body.appendChild(loadFormEvents);
}
``
