const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(bookingForm);
    const services = formData.getAll("service").join(", ") || "None";

    const msg = `New Booking Enquiry
Name: ${formData.get("name")}
Phone: ${formData.get("phone")}
Guests: ${formData.get("persons")}
Date: ${formData.get("date")}
Services: ${services}
Message: ${formData.get("message") || "NA"}`;

    window.location.href = "https://wa.me/91YOURNUMBER?text=" + encodeURIComponent(msg);
  });
}