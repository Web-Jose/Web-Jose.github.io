<<<<<<< HEAD
const courses = document.querySelectorAll(".Courses");

courses.forEach((course) => {
  const info = course.querySelector(".Info");

  course.addEventListener("click", () => {
    if (info.style.maxHeight) {
      info.style.maxHeight = null;
    } else {
      info.style.maxHeight = info.scrollHeight + "px";
    }
  });
});

const cardContainer = document.querySelector(".CardContainer");

// Fetch the JSON data
fetch("projects.json")
  .then((response) => response.json())
  .then((data) => {
    // Loop through the array of cards
    data.forEach((card) => {
      // Create the card element
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      // Create the front of the card
      const frontElement = document.createElement("div");
      frontElement.classList.add("front");
      frontElement.style.backgroundImage = `url(${card.backgroundImage})`;
      frontElement.textContent = card.cardName;

      // Create the back of the card
      const backElement = document.createElement("div");
      backElement.classList.add("expandable");
      backElement.innerHTML = `
        <p>${card.description}</p>
        <div class="buttons">
          <a href="${card.liveDemoLink}" target="_blank">Live Demo</a>
          <a href="${card.sourceCodeLink}" target="_blank">Source Code</a>
        </div>
      `;

      // Add the front and back to the card
      cardElement.appendChild(frontElement);
      cardElement.appendChild(backElement);

      // Add the card to the container
      cardContainer.appendChild(cardElement);
    });
  });
=======
const courses = document.querySelectorAll(".Courses");

courses.forEach((course) => {
  const info = course.querySelector(".Info");

  course.addEventListener("click", () => {
    if (info.style.maxHeight) {
      info.style.maxHeight = null;
    } else {
      info.style.maxHeight = info.scrollHeight + "px";
    }
  });
});

const cardContainer = document.querySelector(".CardContainer");

// Fetch the JSON data
fetch("projects.json")
  .then((response) => response.json())
  .then((data) => {
    // Loop through the array of cards
    data.forEach((card) => {
      // Create the card element
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      // Create the front of the card
      const frontElement = document.createElement("div");
      frontElement.classList.add("front");
      frontElement.style.backgroundImage = `url(${card.backgroundImage})`;
      frontElement.textContent = card.cardName;

      // Create the back of the card
      const backElement = document.createElement("div");
      backElement.classList.add("expandable");
      backElement.innerHTML = `
        <p>${card.description}</p>
        <div class="buttons">
          <a href="${card.liveDemoLink}" target="_blank">Live Demo</a>
          <a href="${card.sourceCodeLink}" target="_blank">Source Code</a>
        </div>
      `;

      // Add the front and back to the card
      cardElement.appendChild(frontElement);
      cardElement.appendChild(backElement);

      // Add the card to the container
      cardContainer.appendChild(cardElement);
    });
  });
>>>>>>> mastery
