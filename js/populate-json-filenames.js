function populateJsonFilenames(formIds) {

    formIds.forEach(formId => {

        const jsonFilename = `./json/${formId}.json`;

        console.log(jsonFilename);

    });

    const nextstep = document.createElement("script");
    nextstep.src = "./js/nextstep.js";

    document.body.appendChild(nextstep);
}
