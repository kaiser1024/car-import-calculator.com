document.addEventListener("DOMContentLoaded", () => {
    const bgimgFormats = ["jpg", "png", "webp", "jpeg", "gif"];
    const bgimgPath =  /img/background;

   function trynextExt(pos) {
    if (pos >= bgimgFormats.length) return;

    const bgimgPath = `${bgimgPath}.${bgimgFormats[pos]}`;
    const bgImg = new Image();

    bgImg.onload = function () {
      const bgDiv = document.createElement("div");
      bgDiv.classList.add("bg");

    const htmlBody = document.body;      
    const bodyFirstchild = htmlBody.firstElementChild;








