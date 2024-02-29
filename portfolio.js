// Make courses expandable
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

// Cards for projects
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

// Make the navigation links active when the corresponding section is in the viewport
const navLinks = document.querySelectorAll("nav a");

// Add a scroll event listener to the window
window.addEventListener("scroll", () => {
  // Get the top of the viewport
  const topViewport = window.pageYOffset;

  // Loop through each section on the page
  document.querySelectorAll("section").forEach((section) => {
    // Get the top and bottom of the section
    const topSection = section.offsetTop;
    const bottomSection = topSection + section.offsetHeight;

    // Check if the top of the viewport is within the section
    if (topViewport >= topSection && topViewport < bottomSection) {
      // Get the ID of the section
      const sectionId = section.getAttribute("id");

      // Loop through each navigation link
      navLinks.forEach((navLink) => {
        // Check if the navigation link corresponds to the section
        if (navLink.getAttribute("href") === `#${sectionId}`) {
          // Add an "active" class to the navigation link
          navLink.classList.add("active");
        } else {
          // Remove the "active" class from the other navigation links
          navLink.classList.remove("active");
        }
      });
    }
  });
});

// Get all the .card elements
const cards = document.querySelectorAll(".card");

// Calculate the maximum height of .expandable elements
let maxHeight = 0;
cards.forEach((card) => {
  const expandable = card.querySelector(".expandable");
  const expandableHeight = expandable.getBoundingClientRect().height;
  if (expandableHeight > maxHeight) {
    maxHeight = expandableHeight;
  }
});

// Set the height of .card elements to the maximum height of .expandable elements
cards.forEach((card) => {
  card.style.height = `${
    maxHeight + card.querySelector(".front").getBoundingClientRect().height
  }px`;
});

// Search functionality for projects
const searchInput = document.getElementById("searchInput");
let debounceTimeout;

searchInput.addEventListener("keyup", (e) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const searchString = e.target.value.toLowerCase();

    // Fetch and filter data
    fetch("projects.json")
      .then((response) => response.json())
      .then((data) => {
        let filteredData = data;
        if (searchString !== "") {
          filteredData = data.filter((card) => {
            return (
              card.cardName.toLowerCase().includes(searchString) ||
              card.description.toLowerCase().includes(searchString)
            );
          });
        }
        displayCards(filteredData);
      });
  }, 300); // Adjust the debounce delay as needed (in milliseconds)
});

function displayCards(data) {
  cardContainer.innerHTML = ""; // Clear existing cards

  if (data.length === 0) {
    const noProjectsElement = document.createElement("div");
    noProjectsElement.id = "NoProjects";
    noProjectsElement.textContent = "No Projects Found";
    cardContainer.appendChild(noProjectsElement);
  } else {
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
  }
}

// Skill search functionality
const svgElements = document.querySelectorAll(".SkillCon");

svgElements.forEach((svg) => {
  svg.addEventListener("click", () => {
    const searchTerm = svg.getAttribute("search-term");
    searchInput.value = searchTerm;
    triggerSearch(searchTerm); // Call the search function with the search term
    document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
  });
});

// Function to trigger the search
function triggerSearch(searchString) {
  // Fetch and filter data
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      let filteredData = data;
      if (searchString !== "") {
        filteredData = data.filter((card) => {
          return (
            card.cardName.toLowerCase().includes(searchString.toLowerCase()) ||
            card.description.toLowerCase().includes(searchString.toLowerCase())
          );
        });
      }
      displayCards(filteredData);
    });
}

// Contact form submission
$(document).ready(function () {
  // When the form is submitted
  $("#contact-form").on("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    // Serialize the form data
    var formData = $(this).serialize();

    // Send the form data to the server with AJAX
    $.ajax({
      type: "POST",
      url: "/contact.php",
      data: formData,
      success: function (response) {
        // Handle success (display success message, clear the form, etc.)
        alert(response);
        $("#contact-form").trigger("reset");
      },
      error: function () {
        // Handle error (display error message, etc.)
        alert(
          "There was an error sending your message. Please try again later."
        );
      },
    });
  });
});

function openNav() {
  document.getElementById("hamburger-menu").style.width = "100%";
}

function closeNav() {
  document.getElementById("hamburger-menu").style.width = "0";
}
