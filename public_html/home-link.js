document.querySelectorAll('.back-btn').forEach(function (link) {
  link.href = new URL('index.html', window.location.href).href;
});
