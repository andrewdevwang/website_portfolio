(function () {
  var path = location.pathname.replace(/\\/g, '/');
  var base = path.includes('/html/') ? '..' : '.';
  var markup = '' +
    '<header>' +
      '<nav class="navbar">' +
        '<div class="nav-container">' +
          '<div class="nav-left">' +
            '<img class="nav-logo" src="' + base + '/image/aw_logo.png" alt="Logo">' +
          '</div>' +
          '<div class="nav-actions">' +
            '<a href="#" class="nav-icon-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">' +
              '<img class="nav-icon" src="' + base + '/image/github_logo.png" alt="GitHub" />' +
            '</a>' +
            '<a href="#" class="nav-icon-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">' +
              '<img class="nav-icon" src="' + base + '/image/linkedin_logo.png" alt="LinkedIn" />' +
            '</a>' +
            '<a href="#" id="themeToggle" class="nav-icon-link" aria-label="Toggle Theme">' +
              '<img class="nav-logo" src="' + base + '/image/day_night_logo.png" alt="Day Night Logo">' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</nav>' +
    '</header>';

  var host = document.getElementById('navbar');
  if (!host) {
    host = document.createElement('div');
    host.id = 'navbar';
    document.body.insertBefore(host, document.body.firstChild);
  }
  host.innerHTML = markup;

  // Theme handling
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  } catch (e) { /* ignore */ }

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isLight = document.body.classList.toggle('light');
      try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch (e) { /* ignore */ }
    });
  }
})();

