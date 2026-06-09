document.addEventListener("DOMContentLoaded", function () {

    const formContainers = document.querySelectorAll('[class*="loadform-"]');

    console.log(formContainers);

    
    const getFormIdsScript = document.createElement("script");
    getFormIdsScript.src = "./js/get-form-ids.js";

    getFormIdsScript.onload = function () {
    getFormIds(formContainers);
    };

document.body.appendChild(getFormIdsScript);

