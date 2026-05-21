const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
  menuToggle.classList.remove("is-active");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("is-open");
  menuToggle.classList.toggle("is-active");
});

navItems.forEach((item) => {
  item.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});
