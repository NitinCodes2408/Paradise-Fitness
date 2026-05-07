// Hamburger Menu 

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-link');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  
// Contact --> WhatsApp (Send Message)

let currentPage = window.location.pathname.split("/").pop();
if (currentPage === "") currentPage = "contact.html";

document.querySelectorAll(".nav-link a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


document.getElementById("whatsappForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = this.name.value;
  const phone = this.phone.value;
  const email = this.email.value;
  const message = this.message.value;

  const text =
    `Hello Paradise Fitness,%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Email: ${email}%0A` +
    `Message: ${message}`;

  const whatsappURL = `https://wa.me/917499853518?text=${text}`;

  window.open(whatsappURL, "_blank");
});


// Renew --> WhatsApp (Confirm on Wp)

function sendWhatsApp(plan, amount) {
    const message =
      `Hi Paradise Fitness,%0A` +
      `I have paid ₹${amount} for ${plan}.%0A` +
      `Please renew my membership.`;

    const phoneNumber = "917499853518"; 

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  }






