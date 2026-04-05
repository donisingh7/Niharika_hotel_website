/* =============================================
   NIHARIKA BHAWAN - MAIN JS
   Includes: Mobile Menu + Google Ads WhatsApp Conversion Tracking
============================================= */

const BUSINESS_WHATSAPP = "917690940051";
const GOOGLE_ADS_SEND_TO = "AW-18049205593/cJLTCKuE-ZEcENmKxJ5D";

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* ===== GOOGLE ADS WHATSAPP CONVERSION TRACKING ===== */

function gtag_report_conversion(url) {
  var opened = false;

  var callback = function () {
    if (opened) return;
    opened = true;
    if (typeof url !== "undefined") {
      window.open(url, "_blank");
    }
  };

  if (typeof gtag === "function") {
    gtag("event", "conversion", {
      send_to: GOOGLE_ADS_SEND_TO,
      value: 1.0,
      currency: "INR",
      event_callback: callback
    });
    setTimeout(callback, 1200);
  } else {
    callback();
  }

  return false;
}

function bindTrackedWhatsAppLinks() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me/"]');
  whatsappLinks.forEach((link) => {
    if (link.dataset.trackedWhatsapp === "true") return;
    link.dataset.trackedWhatsapp = "true";
    link.addEventListener("click", function (e) {
      e.preventDefault();
      gtag_report_conversion(this.href);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindTrackedWhatsAppLinks);
} else {
  bindTrackedWhatsAppLinks();
}
