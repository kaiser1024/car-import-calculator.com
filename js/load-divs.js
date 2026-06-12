document.addEventListener("DOMContentLoaded", () => {
    const bgimgFormats = ["jpg", "png", "webp", "jpeg", "gif"];
    const bgimgPath =  /img/background;

   function trynextExt(pos) {
    if (pos >= bgimgFormats.length) return;

