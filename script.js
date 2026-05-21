const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const trailCount = 8;
const trailDots = [];
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

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

for (let index = 0; index < trailCount; index += 1) {
  const dot = document.createElement("span");

  dot.className = "cursor-trail";
  dot.style.setProperty("--trail-size", `${18 - index}px`);
  dot.style.setProperty("--trail-opacity", `${0.22 - index * 0.018}`);
  document.body.appendChild(dot);

  trailDots.push({
    element: dot,
    x: mouse.x,
    y: mouse.y,
  });
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

function animateCursorTrail() {
  let nextX = mouse.x;
  let nextY = mouse.y;

  trailDots.forEach((dot, index) => {
    dot.x += (nextX - dot.x) * 0.32;
    dot.y += (nextY - dot.y) * 0.32;

    dot.element.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
    dot.element.style.opacity = dot.element.style.getPropertyValue("--trail-opacity");

    nextX = dot.x;
    nextY = dot.y;

    if (index === trailDots.length - 1) {
      dot.element.style.opacity = "0.05";
    }
  });

  requestAnimationFrame(animateCursorTrail);
}

animateCursorTrail();
