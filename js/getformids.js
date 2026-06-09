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

    const nextstep = document.createElement("script");
    nextstep.src = "./js/nextstep.js";

    document.body.appendChild(nextstep);
}
