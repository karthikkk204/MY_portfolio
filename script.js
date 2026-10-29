// Small progressive enhancements: typing effect, mobile navigation, and footer year.
const typed = document.querySelector(".typed-text");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typed && !reducedMotion) {
  const words = (typed.dataset.words || "").split(",").map(word => word.trim()).filter(Boolean);
  let wordIndex = 0;
  let charIndex = words[0]?.length || 0;
  let deleting = false;

  const type = () => {
    if (!words.length) return;
    const current = words[wordIndex];
    typed.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex === current.length) {
      deleting = true;
      window.setTimeout(type, 1400);
      return;
    }
    if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    charIndex += deleting ? -1 : 1;
    window.setTimeout(type, deleting ? 42 : 78);
  };

  window.setTimeout(() => {
    deleting = true;
    type();
  }, 1400);
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      navLinks.classList.remove("is-open");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
