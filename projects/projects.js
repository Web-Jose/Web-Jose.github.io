// Hover effect for the navigation links
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((navLink) => {
  navLink.addEventListener("mouseover", () => {
    navLink.classList.add("active");
  });

  navLink.addEventListener("mouseout", () => {
    navLink.classList.remove("active");
  });
});

// Project Information
const project_container = document.querySelector(".projects-container");

// Fetch the projects from the JSON file
fetch("../projects.json")
  .then((response) => response.json())
  .then((data) => {
    displayProjects(data);
  });

// Display the projects
function displayProjects(data) {
  project_container.innerHTML = ""; // Clear the projects container

  if (data.length === 0) {
    const noProjectsElement = document.createElement("div");
    noProjectsElement.id = "NoProjects";
    noProjectsElement.textContent = "No Projects Found";
    cardContainer.appendChild(noProjectsElement);
  } else {
    data.forEach((project) => {
      // Create the project element
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");

      // Create the project image
      const projectImage = document.createElement("img");
      projectImage.classList.add("project-image");
      projectImage.src = `../` + project.backgroundImage;
      projectImage.alt = project.cardName;

      // Create the project information
      const projectInfo = document.createElement("div");
      projectInfo.classList.add("project-info");
      projectInfo.innerHTML = `
        <span class="ProjectTitle">${project.cardName}</span>
        <span class="ProjectDesc">${project.description}</span>
        <div class="buttons">
          <a href="${project.liveDemoLink}" target="_blank">Live Demo</a>
          <a href="${project.sourceCodeLink}" target="_blank">Source Code</a>
        </div>
      `;

      // Add the image and information to the project element
      projectElement.appendChild(projectImage);
      projectElement.appendChild(projectInfo);

      // Add the project to the container
      project_container.appendChild(projectElement);
    });
  }
}

function openNav() {
  document.getElementById("hamburger-menu").style.width = "100%";
}

function closeNav() {
  document.getElementById("hamburger-menu").style.width = "0";
}
