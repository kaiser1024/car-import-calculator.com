function getFormIDs(elements) {

    const ids = [];

    elements.forEach(el => {
        const classList = Array.from(el.classList);

        const loadClass = classList.find(c => c.startsWith("loadform-"));

        if (loadClass) {
            const id = loadClass.replace("loadform-", "");
            ids.push(id);
        }
    });

    console.log(ids);

    const nextstep = document.createElement("script");
    nextstep.src = "./js/nextstep.js";

    nextstep.onload = function () {
        // next step will run here
    };

    document.body.appendChild(nextstep);

}
