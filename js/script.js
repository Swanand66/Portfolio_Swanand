// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navmenu");
const navLinks = document.querySelectorAll(".navmenu a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Add scroll event for header styling
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    header.style.padding = "1rem 8%";
  } else {
    header.style.boxShadow = "none";
    header.style.padding = "1.5rem 8%";
  }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navmenu a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active-link");
    }
  });
});

// Contact form validation
const contactForm = document.querySelector(".contact-form form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simple validation
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    let isValid = true;

    // Reset previous error states
    const inputs = [name, email, subject, message];
    inputs.forEach((input) => {
      input.style.borderColor = "#ddd";
    });

    // Check required fields
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        isValid = false;
      }
    });

    // Email validation
    if (email.value.trim() && !validateEmail(email.value)) {
      email.style.borderColor = "red";
      isValid = false;
    }

    if (isValid) {
      // Show success message (in a real app, you would send the form data to a server)
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent =
        "Thank you! Your message has been sent successfully.";
      successMessage.style.color = "green";
      successMessage.style.padding = "1rem";
      successMessage.style.marginTop = "1rem";
      successMessage.style.backgroundColor = "#f0f8f0";
      successMessage.style.borderRadius = "0.5rem";
      successMessage.style.textAlign = "center";

      contactForm.appendChild(successMessage);
      contactForm.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
}

// Email validation helper function
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Animation on scroll
window.addEventListener("scroll", function () {
  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .about-image, .about-content"
  );

  animatedElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add("animate");
    }
  });
});

// Add animation class to CSS
const style = document.createElement("style");
style.textContent = `
  .skill-card, .project-card, .about-image, .about-content {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

const icons = document.querySelector(".socials-icons");

window.addEventListener("scroll", () => {
  if (window.scrollY > 1200) {
    icons.classList.add("active");
  } else {
    icons.classList.remove("active");
  }
});
