// Apply a saved light/dark choice before the first paint, so dark-mode visitors see no white flash.
try {
  var savedTheme = localStorage.getItem('ns-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.setAttribute('data-theme', savedTheme);
} catch (e) { /* storage unavailable */ }
