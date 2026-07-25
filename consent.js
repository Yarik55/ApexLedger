// ApexLedger — cookie & personal-data consent banner.
// Self-contained: injects its own styles and markup, remembers the choice in
// localStorage, and exposes window.apexConsent ('all' | 'essential') so any
// future analytics only load after "Accept all".
(function () {
  'use strict';

  var KEY = 'apex-consent';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  window.apexConsent = saved || null;
  if (saved) return; // already answered — stay out of the way

  var css =
    '#apex-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
    'max-width:520px;margin:0 auto;background:#0d1b35;border:1px solid rgba(59,130,246,0.35);' +
    'border-radius:12px;padding:18px 20px;box-shadow:0 18px 50px rgba(3,8,20,0.7);' +
    'font-family:Inter,sans-serif;color:#e8edf5;animation:apexConsentUp .4s ease;}' +
    '@keyframes apexConsentUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}' +
    '#apex-consent h3{margin:0 0 6px;font-size:15px;font-weight:700;}' +
    '#apex-consent p{margin:0 0 12px;font-size:12.5px;line-height:1.55;color:#8fa3c0;}' +
    '#apex-consent a{color:#60a5fa;text-decoration:none;}' +
    '#apex-consent .row{display:flex;gap:8px;flex-wrap:wrap;}' +
    '#apex-consent button{flex:1;min-width:120px;padding:9px 14px;font-size:13px;font-weight:600;' +
    'border-radius:6px;cursor:pointer;font-family:Inter,sans-serif;}' +
    '#apex-consent .yes{background:#3b82f6;border:1px solid #60a5fa;color:#fff;}' +
    '#apex-consent .min{background:transparent;border:1px solid rgba(59,130,246,0.35);color:#8fa3c0;}' +
    '@media (prefers-reduced-motion: reduce){#apex-consent{animation:none;}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var box = document.createElement('div');
  box.id = 'apex-consent';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Cookies and personal data');
  box.innerHTML =
    '<h3>Cookies &amp; your data 🍪</h3>' +
    '<p>We use essential cookies to keep the site and client portal working (like your ' +
    'login session). With your OK, we’d also use analytics cookies to see what’s ' +
    'useful and improve the site. Personal information you give us is handled under our ' +
    '<a href="privacy.html">Privacy Policy</a> and the Australian Privacy Principles — ' +
    'stored in Australia, never sold.</p>' +
    '<div class="row">' +
    '<button type="button" class="min" id="apex-consent-min">Essential only</button>' +
    '<button type="button" class="yes" id="apex-consent-yes">Accept all</button>' +
    '</div>';

  function decide(value) {
    try { localStorage.setItem(KEY, value); } catch (_) {}
    window.apexConsent = value;
    box.remove();
  }

  function mount() {
    document.body.appendChild(box);
    document.getElementById('apex-consent-yes').addEventListener('click', function () { decide('all'); });
    document.getElementById('apex-consent-min').addEventListener('click', function () { decide('essential'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
