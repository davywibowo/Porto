console.log("test");
// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking on links
mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileMenu.classList.add("hidden");
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Fade-in animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // biar bisa muncul lagi
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Navbar change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1)";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
    navbar.style.boxShadow = "none";
  }
});

// Progress bars (ulang setiap masuk viewport)
const progressBars = document.querySelectorAll(".progress-bar");
const sapSection = document.querySelector("#sap");
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width") || bar.style.width;
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
        });
      } else {
        // reset kalau keluar viewport
        progressBars.forEach((bar) => (bar.style.width = "0%"));
      }
    });
  },
  { threshold: 0.3 }
);
if (sapSection) progressObserver.observe(sapSection);

// Counter animasi (ulang kalau masuk viewport lagi)
const counters = document.querySelectorAll(".counter");
const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const step = target / 150;

  const update = () => {
    count += step;
    if (count < target) {
      counter.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
      } else {
        entry.target.innerText = "0"; // reset
      }
    });
  },
  { threshold: 0.4 }
);
counters.forEach((counter) => counterObserver.observe(counter));

// Skill cards interaktif
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.05) rotate(-1deg)";
    this.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  });
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1) rotate(0)";
    this.style.boxShadow = "none";
  });
});

// Form demo
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted (demo only).");
});

// Button loading effect
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.type === "submit") {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});

// Custom cursor follower
const cursor = document.getElementById("cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// Membesar saat hover ke link & button
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
});

// Ripple effect on click
document.addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";

  // dinamis sesuai ukuran layar
  ripple.style.width = ripple.style.height = "200px";

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 800); // lebih lama biar kelihatan
});

// Typed.js for typing effect

let typed = new Typed("#typed", {
  strings: ["Professional", "Web Developer", "SAP Enthusiast"],
  typeSpeed: 150,
  backSpeed: 100,
  loop: true,
});
