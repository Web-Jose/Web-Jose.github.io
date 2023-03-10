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

// Load the Gmail API client library
gapi.load("client:auth2", () => {
  gapi.client
    .init({
      apiKey: "AIzaSyDnoUCKIwbCGbpRxsif9Kg2K1BAPgn5ftQ",
      clientId: "482444636308-6eldsgflgsvld04v8gb84m7g6tam4vdm.apps.googleusercontent.com",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
      ],
      scope: "https://www.googleapis.com/auth/gmail.compose",
    })
    .then(() => {
      // Get the form element
      const form = document.querySelector("#contact-form");

      // Handle form submission
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get the form data
        const formData = new FormData(event.target);

        // Send the form data using the Gmail API
        const message = [
          "To: josehcortes02@gmail.com",
          "Subject: " + formData.get("subject"),
          "",
          formData.get("message"),
        ].join("\r\n");

        const base64EncodedMessage = btoa(message);
        const request = gapi.client.gmail.users.messages.send({
          userId: "me",
          resource: {
            raw: base64EncodedMessage,
          },
        });

        request.execute(() => {
          // Show a success message to the user
          alert("Your message was sent successfully!");
          form.reset();
        });
      });
    });
});
