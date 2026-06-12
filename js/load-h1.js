<script>
document.addEventListener("DOMContentLoaded", () => {

  if (Array.isArray(h1) && h1.length > 0) {

    const section = document.querySelector(".page-topic");

    const container = document.createElement("div");
    container.classList.add("h1-container");

    const heading = document.createElement("h1");
    heading.textContent = h1[0];

    container.appendChild(heading);
    section.appendChild(container);
  }

});
</script>
