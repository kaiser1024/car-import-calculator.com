document.addEventListener("DOMContentLoaded", function () {

    const formContainers = document.querySelectorAll('[class*="loadform-"]');

    console.log(formContainers);

    const getFormIds = document.createElement("script");
    getFormIds.src = "./js/get-form-ids.js";

    getFormIds.onload = function () {
        getFormIDs(formContainers);
    };

    document.body.appendChild(getFormIds);

});
