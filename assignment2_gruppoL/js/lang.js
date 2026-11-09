(function () {
  var lang = 'en';
  try {
    var p = new URLSearchParams(location.search).get('lang');
    var saved = localStorage.getItem('ft-lang');
    if (p === 'it' || p === 'en') lang = p;
    else if (saved === 'it' || saved === 'en') lang = saved;
  } catch (e) { }
  document.documentElement.lang = lang;
})();
