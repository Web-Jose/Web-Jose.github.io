const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLScuD8GM5SyN4o1DFDQjf9D0FZoMukOeN4SMxeilsqw1YYpX3w/formResponse"
  );
  xhr.send(formData);
  form.reset();
  alert("Thank you for your message!");
});
