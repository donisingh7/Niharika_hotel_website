const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");

const BUSINESS_WHATSAPP = "917690940051";
const GOOGLE_ADS_SEND_TO = "AW-18049205593/cJLTCKuE-ZEcENmKxJ5D";

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}

function nextSlide() {
  let next = currentSlide + 1;
  if (next >= slides.length) next = 0;
  showSlide(next);
}

function prevSlide() {
  let prev = currentSlide - 1;
  if (prev < 0) prev = slides.length - 1;
  showSlide(prev);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

if (slides.length > 0 && dots.length > 0 && prevSlideBtn && nextSlideBtn) {
  prevSlideBtn.addEventListener("click", () => {
    prevSlide();
    resetSlider();
  });

  nextSlideBtn.addEventListener("click", () => {
    nextSlide();
    resetSlider();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.getAttribute("data-slide"));
      showSlide(index);
      resetSlider();
    });
  });

  startSlider();
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

const bookingForm = document.getElementById("bookingForm");
const successPopup = document.getElementById("successPopup");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || !result.success) {
        alert("Booking failed. Please try again.");
        return;
      }

      const services = formData.getAll("service").join(", ") || "None";

      const msg = `New Booking - Niharika Bhawan Katra
Name: ${formData.get("name")}
Phone: ${formData.get("phone")}
Date: ${formData.get("date")}
Guests: ${formData.get("persons")}
Service: ${services}
Message: ${formData.get("message") || "NA"}`;

      gtag_report_conversion(
        "https://wa.me/" + BUSINESS_WHATSAPP + "?text=" + encodeURIComponent(msg)
      );

      if (successPopup) {
        successPopup.style.display = "block";
        setTimeout(() => {
          successPopup.style.display = "none";
        }, 2500);
      }

      form.reset();
    } catch (err) {
      alert("Server error. Please try again.");
    }
  });
}

const contactBookingForm = document.getElementById("contactBookingForm");
const contactSuccessPopup = document.getElementById("contactSuccessPopup");
const contactCountdown = document.getElementById("contactCountdown");

if (contactBookingForm) {
  contactBookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    let result;
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      result = await response.json();
    } catch (err) {
      alert("Submission failed. Please try again.");
      return;
    }

    if (result.success) {
      const fname = formData.get("first_name");
      const lname = formData.get("last_name");
      const phone = formData.get("phone");
      const date = formData.get("date");
      const adults = formData.get("adults");
      const msg = formData.get("message");

      const whatsappText = `New Booking Enquiry – Niharika Bhawan Katra

Name: ${fname} ${lname}
Phone: ${phone}
Booking Date: ${date}
Adults & Kids: ${adults}

Requirement:
${msg}

Website: contact-us page`;

      const whatsappURL =
        "https://wa.me/" + BUSINESS_WHATSAPP + "?text=" + encodeURIComponent(whatsappText);

      form.reset();

      if (contactSuccessPopup && contactCountdown) {
        let countdown = 5;
        contactSuccessPopup.style.display = "block";
        contactCountdown.innerText = countdown;

        setTimeout(() => {
          gtag_report_conversion(whatsappURL);
        }, 1000);

        const timer = setInterval(() => {
          countdown--;
          contactCountdown.innerText = countdown;

          if (countdown === 0) {
            clearInterval(timer);
            contactSuccessPopup.style.display = "none";
          }
        }, 1000);
      }
    } else {
      alert("Submission failed. Please try again.");
    }
  });
}

const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");

let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonialSlides.forEach((slide) => slide.classList.remove("active"));
  testimonialDots.forEach((dot) => dot.classList.remove("active"));

  testimonialSlides[index].classList.add("active");
  testimonialDots[index].classList.add("active");
  currentTestimonial = index;
}

function nextTestimonial() {
  let next = currentTestimonial + 1;
  if (next >= testimonialSlides.length) next = 0;
  showTestimonial(next);
}

function prevTestimonialSlide() {
  let prev = currentTestimonial - 1;
  if (prev < 0) prev = testimonialSlides.length - 1;
  showTestimonial(prev);
}

function startTestimonialSlider() {
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

function resetTestimonialSlider() {
  clearInterval(testimonialInterval);
  startTestimonialSlider();
}

if (testimonialSlides.length > 0 && testimonialPrev && testimonialNext) {
  testimonialPrev.addEventListener("click", () => {
    prevTestimonialSlide();
    resetTestimonialSlider();
  });

  testimonialNext.addEventListener("click", () => {
    nextTestimonial();
    resetTestimonialSlider();
  });

  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.getAttribute("data-testimonial"));
      showTestimonial(index);
      resetTestimonialSlider();
    });
  });

  startTestimonialSlider();
}