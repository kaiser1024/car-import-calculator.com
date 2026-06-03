const v = Date.now();

document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
  link.href += '?v=' + v;
});
