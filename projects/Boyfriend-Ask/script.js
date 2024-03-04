document.addEventListener("DOMContentLoaded", () => {
  const noButton = document.querySelector(
    ".Button-Container button:last-child"
  ); // Assuming "No" is the last button
  noButton.addEventListener("click", () => {
    // Randomly decide between moving and shrinking
    if (Math.random() > 0.5) {
      moveButtonRandomly(noButton);
    } else {
      shrinkButton(noButton);
    }
  });
});

function moveButtonRandomly(button) {
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  button.style.position = "absolute"; // Use 'absolute' if the button's container is positioned relative
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;

  button.style.transition = "transform 0.5s ease";
  button.style.transform = "scale(1)";
}

function shrinkButton(button) {
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  const randomScale = Math.random() * 0.7 + 0.25;

  button.style.position = "absolute"; // Use 'absolute' if the button's container is positioned relative
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;

  button.style.transition = "transform 0.5s ease";
  button.style.transform = `scale(${randomScale})`;
}
