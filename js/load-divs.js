document.addEventListener("DOMContentLoaded", () => {
  function addBg() {
    const bgDiv = document.createElement("div");
    bgDiv.classList.add("bg");
    document.body.prepend(bgDiv);
  }

  const img = new Image();

  img.onload = addBg;

  img.onerror = function () {
    const img2 = new Image();
    img2.onload = addBg;
    img2.src = "/img/background.png";
  };

  img.src = "/img/background.jpg";
});
