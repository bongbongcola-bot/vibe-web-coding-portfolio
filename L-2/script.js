const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const scrollButton = document.querySelector("[data-scroll-target]");
const navLinks = document.querySelectorAll(".nav-link, .contact-link, .brand");
const underlineLinks = document.querySelectorAll(".nav-link");
const sectionIds = Array.from(underlineLinks).map((link) => link.getAttribute("href"));

const savedTheme = localStorage.getItem("rian-lot-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
}

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("rian-lot-theme", body.classList.contains("dark") ? "dark" : "light");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    setActiveLink(targetId);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  });
});

scrollButton.addEventListener("click", () => {
  const target = document.querySelector(scrollButton.dataset.scrollTarget);

  if (target) {
    setActiveLink(scrollButton.dataset.scrollTarget);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

window.addEventListener("scroll", updateActiveLinkOnScroll, { passive: true });

document.addEventListener("click", (event) => {
  const clickedInsideNav = siteNav.contains(event.target);
  const clickedMenuButton = menuToggle.contains(event.target);

  if (!clickedInsideNav && !clickedMenuButton) {
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1180) {
    closeMobileMenu();
  }
});

function closeMobileMenu() {
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function setActiveLink(targetId) {
  underlineLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === targetId);
  });
}

function updateActiveLinkOnScroll() {
  const headerOffset = document.querySelector(".site-header").offsetHeight + 80;
  let activeId = "#home";

  sectionIds.forEach((sectionId) => {
    const section = document.querySelector(sectionId);

    if (section && section.getBoundingClientRect().top <= headerOffset) {
      activeId = sectionId;
    }
  });

  setActiveLink(activeId);
}
