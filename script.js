// === Fade-in on scroll using Intersection Observer ===
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// === Scroll Reveal on scroll event ===
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

// === Formspree contact form handling ===
function handleFormSubmit() {
  const form = document.querySelector('.contact-form');
  const message = document.getElementById('form-message');

  if (!form || !message) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        message.textContent = 'Message sent successfully!';
        message.style.color = 'lightgreen';
        form.reset();
      } else {
        message.textContent = 'Failed to send message. Please try again.';
        message.style.color = 'red';
      }
    } catch (error) {
      message.textContent = 'Error sending message.';
      message.style.color = 'red';
    }
  });
}

// === Init everything on page load ===
document.addEventListener('DOMContentLoaded', function () {
  revealOnScroll();
  handleFormSubmit();
  window.addEventListener("scroll", revealOnScroll);
});

const roles = [
  "Aspiring Software Engineer",
  "Full Stack Developer",
  "Open Source Contributor"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.querySelector(".typing-text");

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex++);
  }

  let typingSpeed = isDeleting ? 60 : 120;

  if (!isDeleting && charIndex === currentRole.length + 1) {
    typingSpeed = 1500;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});