const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((navLink) => {
  navLink.addEventListener("mouseover", () => {
    navLink.classList.add("active");
  });

  navLink.addEventListener("mouseout", () => {
    navLink.classList.remove("active");
  });
});

function openNav() {
  document.getElementById("hamburger-menu").style.width = "100%";
}

function closeNav() {
  document.getElementById("hamburger-menu").style.width = "0";
}
