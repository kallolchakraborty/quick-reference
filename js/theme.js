(function() {
  // Theme key for storing in localStorage
  var key = 'theme';

  // Safely get item from localStorage in case storage is restricted
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  // Safely set item in localStorage
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  // Determine current theme, defaulting to 'light'
  function getTheme() {
    var stored = safeGet(key);
    if (stored === 'dark' || stored === 'light') return stored;
    return 'light';
  }

  // Apply theme to HTML tag and dispatch custom theme-changed event for listener hooks
  function apply(t) {
    document.documentElement.classList.toggle('dark', t === 'dark');
    var icons = document.querySelectorAll('.theme-toggle-btn .material-symbols-outlined');
    for (var i = 0; i < icons.length; i++) {
      icons[i].textContent = t === 'dark' ? 'light_mode' : 'dark_mode';
    }
    try {
      window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: t } }));
    } catch (e) {}
  }

  // Initialize theme immediately to prevent layout flashes
  apply(getTheme());

  // Attach theme switch handlers when DOM content loads
  document.addEventListener('DOMContentLoaded', function() {
    var btns = document.querySelectorAll('.theme-toggle-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        var isDark = document.documentElement.classList.contains('dark');
        var t = isDark ? 'light' : 'dark';
        apply(t);
        safeSet(key, t);
      });
    }
  });

  // Replace 'Ctrl' modifier key descriptions with macOS command symbol if on Apple platforms
  if (/(Mac|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('kbd').forEach(function(el) {
        el.textContent = el.textContent.replace('Ctrl', '\u2318');
      });
    });
  }
})();
