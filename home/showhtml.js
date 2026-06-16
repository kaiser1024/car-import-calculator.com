document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement.outerHTML;
  document.getElementById("sourceCode").textContent = html;
});
