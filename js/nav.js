/**
 
 * Highlights the correct nav link based on the current page filename.
 * Runs immediately as an IIFE so no external call is needed.
 */
(function () {
  const links   = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}());
