// Hamburger Menu 
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-link');
const navbar = document.querySelector('.navbar');

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

if (navbar) {
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
    document.body.style.setProperty('--scroll-progress', progress);

    if (scrollTop > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();
}

const revealElements = document.querySelectorAll(
  'section, .programs-card, .gallery-item, .plan-card, .renew-card, .contact-form, .about-points .points, .map-section, .renew-section, .hero-content'
);

const revealObserver = new IntersectionObserver((entries, observer) => {
  let delay = 0;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      delay += 150; // Stagger effect
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Contact --> WhatsApp (Send Message)

let currentPage = window.location.pathname.split("/").pop();
if (currentPage === "") currentPage = "index.html";

document.querySelectorAll(".nav-link a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const whatsappForm = document.getElementById("whatsappForm");
if (whatsappForm) {
  whatsappForm.addEventListener("submit", function(e) {
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

    const whatsappURL = `https://wa.me/919422828242?text=${text}`;

    window.open(whatsappURL, "_blank");
  });
}

// Renew --> WhatsApp (Confirm on Wp)

function sendWhatsApp(plan, amount) {
    const message =
      `Hi Paradise Fitness,%0A` +
      `I have paid ₹${amount} for ${plan}.%0A` +
      `Please renew my membership.`;

    const phoneNumber = "919422828242"; 

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
}

function showPayQRCode(plan, amount, event) {
    if (event) event.preventDefault();
    const qrModal = document.getElementById('payModal');
    const qrTitle = document.getElementById('payModalTitle');
    const qrAmount = document.getElementById('payModalAmount');
    const qrImg = document.getElementById('payModalImage');
    const upiId = 'chakru.u@okaxis';
    const qrData = encodeURIComponent(`upi://pay?pa=${upiId}&pn=Nitin%20Purushottam%20Bhandare&tn=${encodeURIComponent(plan)}&am=${amount}`);

    if (qrTitle) qrTitle.textContent = `Pay ₹${amount} for ${plan}`;
    if (qrAmount) qrAmount.textContent = `Scan using UPI ID: ${upiId}`;
    if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${qrData}`;
    if (qrModal) qrModal.classList.add('active');
}

function closePayQRCode() {
    const qrModal = document.getElementById('payModal');
    if (qrModal) qrModal.classList.remove('active');
}

const payModal = document.getElementById('payModal');
if (payModal) {
    payModal.addEventListener('click', e => {
        if (e.target === payModal) closePayQRCode();
    });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePayQRCode();
});
