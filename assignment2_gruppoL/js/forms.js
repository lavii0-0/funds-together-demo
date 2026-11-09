/* Shared form helpers: one message under each field + a short summary that links to the fields
   (Assignment 1, problems B11 and B12: generic errors, all errors in one box) */
(function () {
  var FT = window.FT;

  FT.setError = function (input, en, it) {
    var err = document.getElementById(input.id + '-error');
    if (!err) return;
    // Keep the control associated with its hint and its error element (WCAG 4.1.3 / 3.3.1).
    var ids = [];
    var hint = document.getElementById(input.id + '-hint');
    if (hint) ids.push(hint.id);
    ids.push(err.id);
    input.setAttribute('aria-describedby', ids.join(' '));
    if (en) {
      err.innerHTML = FT.L(en, it);
      input.setAttribute('aria-invalid', 'true');
    } else {
      err.innerHTML = '';
      input.removeAttribute('aria-invalid');
    }
  };

  // Associate every form control with its hint and error element once, on load.
  function FT_associateErrors() {
    var controls = document.querySelectorAll('input, select, textarea, fieldset');
    for (var i = 0; i < controls.length; i++) {
      var c = controls[i];
      if (!c.id) continue;
      var ids = [];
      var hint = document.getElementById(c.id + '-hint');
      var err = document.getElementById(c.id + '-error');
      if (hint) ids.push(hint.id);
      if (err) ids.push(err.id);
      if (ids.length) c.setAttribute('aria-describedby', ids.join(' '));
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', FT_associateErrors);
  } else {
    FT_associateErrors();
  }

  FT.showSummary = function (box, errors) {
    if (!errors.length) { box.hidden = true; box.innerHTML = ''; return; }
    var items = errors.map(function (e) {
      return '<li><a href="#' + e.id + '">' + FT.L(e.en, e.it) + '</a></li>';
    }).join('');
    box.innerHTML = '<h2>' + FT.L(
      errors.length === 1 ? 'One thing to fix before you continue' : errors.length + ' things to fix before you continue',
      errors.length === 1 ? 'Una cosa da correggere prima di continuare' : errors.length + ' cose da correggere prima di continuare') +
      '</h2><ul>' + items + '</ul>';
    box.hidden = false;
    box.focus();
    var links = box.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (ev) {
        ev.preventDefault();
        var el = document.getElementById(this.getAttribute('href').slice(1));
        if (el) { el.focus(); el.scrollIntoView({ block: 'center' }); }
      });
    }
  };

  FT.counter = function (textarea) {
    var max = parseInt(textarea.getAttribute('data-max'), 10);
    var out = document.getElementById(textarea.id + '-count');
    function upd() {
      var n = textarea.value.length;
      out.innerHTML = FT.L(n + ' of ' + max + ' characters', n + ' su ' + max + ' caratteri');
      out.classList.toggle('is-over', n > max);
    }
    textarea.addEventListener('input', upd);
    upd();
  };

  FT.isEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };
})();
