function processFormIDs(formIDs) {

    formIDs.forEach(formID => {

        const fileName = `./json/${formID}.json`;

        console.log(fileName);

        // ✅ PLACEHOLDER
        // later:
        // load JSON
        // build static DOM

    });

    const nextstep = document.createElement("script");
    nextstep.src = "./js/nextstep.js";

    document.body.appendChild(nextstep);
}
