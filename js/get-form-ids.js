function getFormIds(formContainers) {

    const formIds = [];

    formContainers.forEach(el => {
        el.classList.forEach(className => {
            if (className.startsWith("loadform-")) {
                formIds.push(className);
            }
        });
    });

    formIds.forEach((className, index) => {
        formIds[index] = className.replace("loadform-", "");
    });

    console.log(formIds);

    const populateJsonFilenamesScript = document.createElement("script");
    populateJsonFilenamesScript.src = "./js/populate-json-filenames.js";

    populateJsonFilenamesScript.onload = function () {
        populateJsonFilenames(formIds);
    };

    document.body.appendChild(populateJsonFilenamesScript);
}
