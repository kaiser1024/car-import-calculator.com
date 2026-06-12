document.addEventListener("DOMContentLoaded", () => {
  const h1Placeholder = document.querySelector(".page-topic");

  const h1Container = document.createElement("div");
  h1Container.classList.add("h1-container");

  const h1Text = document.createElement("h1");
  h1Text.textContent = h1[0];

  h1Container.appendChild(h1Text);
  h1Placeholder.appendChild(h1Container);
});
