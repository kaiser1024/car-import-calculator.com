(function () {
  const head = document.head;
  if (!head) return;

  const meta = head.querySelector('meta[charset]');

  if (meta && meta.getAttribute("charset") === "UTF-8") {
    return;
  }

  if (!window.Switch || window.Switch["utf-8"] !== "on") {
    return;
  }

  if (meta) {
    meta.setAttribute("charset", "UTF-8");
  } else {
    const m = document.createElement("meta");
    m.setAttribute("charset", "UTF-8");
    head.prepend(m);
  }
})();
