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

    const populateJsonFilenames = document.createElement("script");
    populateJsonFilenames.src = "./js/populate-json-filenames.js";

    document.body.appendChild(populateJsonFilenames);
}
