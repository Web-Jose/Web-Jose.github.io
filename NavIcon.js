const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((navLink) => {
  navLink.addEventListener("mouseover", () => {
    navLink.classList.add("active");
  });

  navLink.addEventListener("mouseout", () => {
    navLink.classList.remove("active");
  });
});
