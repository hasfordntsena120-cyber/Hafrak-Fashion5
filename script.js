// script.js - Complete Interactive Functions
document.addEventListener("DOMContentLoaded", () => {
  // Hero Slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active-dot", i === index));
    currentSlide = index;
  }

  function nextSlide() { showSlide((currentSlide + 1) % slides.length); }
  function startSlider() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length) {
    showSlide(0);
    startSlider();
    dots.forEach((dot, idx) => dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      showSlide(idx);
      startSlider();
    }));
  }

  // Mobile Menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", (e) => { e.stopPropagation(); navMenu.classList.toggle("active"); });
    document.querySelectorAll(".nav-menu a").forEach(link => link.addEventListener("click", () => {
      if (window.innerWidth <= 950) navMenu.classList.remove("active");
    }));
  }

  // Mobile Dropdowns
  document.querySelectorAll(".dropdown").forEach(drop => {
    const link = drop.querySelector(":scope > a");
    if (link) link.addEventListener("click", (e) => {
      if (window.innerWidth <= 950) {
        e.preventDefault();
        document.querySelectorAll(".dropdown").forEach(d => d !== drop && d.classList.remove("active-dropdown"));
        drop.classList.toggle("active-dropdown");
      }
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (navMenu?.classList.contains("active") && !navMenu.contains(e.target) && !hamburger?.contains(e.target))
      navMenu.classList.remove("active");
  });

  // Smooth Scroll
  function scrollToElement(id, offset = 80) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  }

  // Navigation Links
  const links = {
    homeLink: "home", aboutLink: "aboutSection", workLink: "workSection",
    whyUsNavLink: "whyUsSection", reviewsNavLink: "reviewsSection",
    faqsNavLink: "faqSection", bookAppointmentBtn: "contact"
  };
  Object.entries(links).forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", (e) => { e.preventDefault(); scrollToElement(target); closeMenu(); });
  });

  // Service Links - Scroll to contact
  document.querySelectorAll(".service-link, .service-cta").forEach(link => {
    link.addEventListener("click", (e) => { e.preventDefault(); scrollToElement("contact"); closeMenu(); });
  });

  function closeMenu() { if (navMenu?.classList.contains("active")) navMenu.classList.remove("active"); }

  // FAQ Accordion
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-question");
    q.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item && other.classList.contains("active")) {
          other.classList.remove("active");
          const icon = other.querySelector(".faq-question i");
          if (icon) { icon.classList.remove("fa-minus"); icon.classList.add("fa-plus"); }
        }
      });
      item.classList.toggle("active");
      const icon = q.querySelector("i");
      if (item.classList.contains("active")) { icon.classList.remove("fa-plus"); icon.classList.add("fa-minus"); }
      else { icon.classList.remove("fa-minus"); icon.classList.add("fa-plus"); }
    });
  });

  // Contact Form Validation
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const msg = document.getElementById("contactMsg")?.value.trim();
      if (!name) return showStatus("Please enter your name", "error");
      if (!email || !email.includes("@") || !email.includes(".")) return showStatus("Please enter a valid email", "error");
      if (!msg) return showStatus("Please enter your message", "error");
      showStatus("✓ Thank you! We'll respond within 24 hours.", "success");
      form.reset();
      setTimeout(() => { if (statusDiv) statusDiv.innerHTML = ""; }, 5000);
    });
  }

  function showStatus(msg, type) {
    if (statusDiv) {
      const color = type === "error" ? "#b91c1c" : "#0a5c2e";
      const bg = type === "error" ? "#fee2e2" : "#e6f7ed";
      statusDiv.innerHTML = `<span style="color:${color}; background:${bg}; padding:10px 18px; border-radius:40px; display:inline-block;">${msg}</span>`;
    }
  }

  // Prevent iOS zoom
  document.querySelectorAll("input, textarea").forEach(i => i.style.fontSize = "16px");

  // Active nav highlight on scroll
  const sections = ["home", "aboutSection", "whyUsSection", "workSection", "reviewsSection", "faqSection", "contact"];
  window.addEventListener("scroll", () => {
    let current = "";
    const pos = window.scrollY + 100;
    for (const id of sections) {
      const sec = document.getElementById(id);
      if (sec && pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) current = id;
    }
    document.querySelectorAll(".nav-menu > li > a").forEach(link => {
      link.classList.remove("active-nav");
      if (link.id === "homeLink" && current === "home") link.classList.add("active-nav");
      if (link.id === "aboutLink" && current === "aboutSection") link.classList.add("active-nav");
      if (link.id === "workLink" && current === "workSection") link.classList.add("active-nav");
    });
  });
});