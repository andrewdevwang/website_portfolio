(function () {
  var markup = '' +
    '<footer class="footer">' +
      '<div class="footer-content">' +
        '<p2>© 2025 Andrew Wang. All rights reserved.</p2>' +
      '</div>' +
    '</footer>';

  var host = document.getElementById('footer');
  if (!host) {
    host = document.createElement('div');
    host.id = 'footer';
    document.body.appendChild(host);
  }
  host.innerHTML = markup;
})();
