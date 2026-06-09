document.addEventListener("DOMContentLoaded", function () {

    const formcontainers = document.querySelectorAll('[class*="loadform-"]');

    console.log(formcontainers);

    const getformids = document.createElement("script");
    getformids.src = "./js/getformids.js";

    getformids.onload = function () {
        getFormIDs(formcontainers);
    };

    document.body.appendChild(getformids);

});
