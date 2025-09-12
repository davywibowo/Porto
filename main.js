window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

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

// Smooth scrolling dengan offset biar gak kosong di atas
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navbarHeight = document.getElementById("navbar").offsetHeight;

      // atur jarak scroll di sini
      const offset = 40; // misal 40px, bisa kamu ubah 20 / 60 sesuai selera

      const offsetTop =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        (navbarHeight + offset);

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
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

// Membesar saat hover ke link & button
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
});

// Typed.js for typing effect

let typed = new Typed("#typed", {
  strings: ["Professional", "SAP Enthusiast", "Web Developer"],
  typeSpeed: 100,
  backSpeed: 70,
  loop: true,
});

// main.js (fixed version with EmailJS integration + proper loading button)

// =========================
// EmailJS Integration
// =========================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof emailjs !== "undefined") {
    emailjs.init("eMZDywo_4Zq9lmFTV"); // Ganti dengan Public Key kamu
    console.log("✅ EmailJS initialized");
  } else {
    console.error("❌ EmailJS failed to load");
  }

  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Tampilkan loading state di tombol
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;

    console.log("📨 Sending form...");
    emailjs
      .sendForm("service_295i2ag", "template_di7loe4", this)
      .then((res) => {
        console.log("✅ SUCCESS", res);
        Swal.fire({
          title: "Thank You!",
          text: "You message has been sent!",
          icon: "success",
        });
        this.reset();
      })
      .catch((err) => {
        console.error("❌ ERROR", err);
        Swal.fire({
          title: "Error",
          text: "Failed to send Your message!",
          icon: "error",
        });
      })
      .finally(() => {
        // Balikin tombol ke normal
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
});
// Force light mode via JS
document.documentElement.style.setProperty(
  "color-scheme",
  "light",
  "important"
);
document.body.style.setProperty("background-color", "#f8fafc", "important");
document.body.style.setProperty("color", "#1f2937", "important");

// Detect Samsung Internet
const isSamsung = /SamsungBrowser/i.test(navigator.userAgent);
const lang = navigator.language.startsWith("id") ? "id" : "en";
if (isSamsung) {
  if (lang === "id") {
    swal.fire(
      "Untuk pengalaman terbaik, gunakan mode terang di pengaturan sistem."
    );
  } else {
    sawl.fire(
      "For the best experience, use light mode in the system settings."
    );
  }
}
