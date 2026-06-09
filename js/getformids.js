function getFormIDs(formcontainers) {

    const formIDs = [];

    formcontainers.forEach(el => {
        el.classList.forEach(className => {
            if (className.startsWith("loadform-")) {
                formIDs.push(className);
            }
        });
    });

    formIDs.forEach((className, index) => {
        formIDs[index] = className.replace("loadform-", "");
    });

    console.log(formIDs);

    const populateJsonFilenames = document.createElement("script");
    populateJsonFilenames.src = "./js/populate-json-filenames.js";

    document.body.appendChild(populateJsonFilenames);
}
