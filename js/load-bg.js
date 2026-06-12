document.addEventListener("DOMContentLoaded", () => {
  function addBg() {
    const bgDiv = document.createElement("div");
    bgDiv.classList.add("bg");
    document.body.prepend(bgDiv);
  }

 const imgJpg = new Image();
 imgJpg.onload = addBg;

  imgJpg.onerror = function () {
  const imgPng = new Image();
  imgPng.onload = addBg;
  imgPng.src = "/img/background.png";
};

imgJpg.src = "/img/background.jpg";
});
