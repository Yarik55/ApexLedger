// ApexLedger — ambient "ledger rain" background.
// A very dim, slow digital-rain of digits and finance glyphs in the site's
// navy/blue palette. Deliberately quiet: low opacity, low frame rate, and
// fully disabled when the visitor prefers reduced motion.
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'matrix-bg';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var GLYPHS = '0123456789$%+=.,';
  var FONT_SIZE = 15;
  var FPS = 14;                    // slow, ambient — not a screensaver
  var TRAIL_FADE = 0.08;           // higher = shorter trails
  var columns = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var count = Math.floor(canvas.width / (FONT_SIZE * 1.6));
    columns = [];
    for (var i = 0; i < count; i++) {
      columns.push({
        x: i * FONT_SIZE * 1.6 + FONT_SIZE * 0.4,
        y: Math.random() * canvas.height,
        speed: 0.4 + Math.random() * 0.9,     // rows per frame
        bright: Math.random() < 0.12,         // a few slightly brighter streams
      });
    }
    // Start from the page background so the first frames aren't black-on-black.
    ctx.fillStyle = '#060d1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function frame() {
    // Self-heal if the viewport size changed without a resize event (e.g. the
    // page was laid out at 0×0 in a background tab before being shown).
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      if (window.innerWidth > 0) resize();
      if (canvas.width === 0) return;
    }

    // Fade the previous frame toward the page background → trailing effect.
    ctx.fillStyle = 'rgba(6, 13, 30, ' + TRAIL_FADE + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = FONT_SIZE + 'px monospace';
    for (var i = 0; i < columns.length; i++) {
      var col = columns[i];
      var ch = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
      // Dim navy-blue glyphs; the occasional stream gets a soft blue highlight.
      ctx.fillStyle = col.bright
        ? 'rgba(96, 165, 250, 0.32)'   // --blue-bright, softened
        : 'rgba(29, 54, 104, 0.55)';   // --navy-500, dim
      ctx.fillText(ch, col.x, col.y);

      col.y += col.speed * FONT_SIZE;
      if (col.y > canvas.height + FONT_SIZE * 4) {
        col.y = -FONT_SIZE * (2 + Math.random() * 20);
        col.speed = 0.4 + Math.random() * 0.9;
        col.bright = Math.random() < 0.12;
      }
    }
  }

  var timer = null;
  function start() { if (!timer) timer = setInterval(frame, 1000 / FPS); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }

  // Save battery: pause when the tab is hidden.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  start();
})();
