(function() {
  var key = 'theme';

  function getTheme() {
    var stored = localStorage.getItem(key);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(t) {
    document.documentElement.classList.toggle('dark', t === 'dark');
    var icons = document.querySelectorAll('.theme-toggle-btn .material-symbols-outlined');
    for (var i = 0; i < icons.length; i++) {
      icons[i].textContent = t === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }

  apply(getTheme());

  document.addEventListener('DOMContentLoaded', function() {
    var btns = document.querySelectorAll('.theme-toggle-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        var isDark = document.documentElement.classList.contains('dark');
        var t = isDark ? 'light' : 'dark';
        apply(t);
        localStorage.setItem(key, t);
      });
    }
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(key)) {
      apply(e.matches ? 'dark' : 'light');
    }
  });
})();
