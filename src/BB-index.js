import "./AA-reset.css";
import "./AA-common.css";
import "./AA-sidebar.css";
import "./AA-right-side.css";

import generateStuff from "./BB-generate.js";
import { addProject } from "./BB-generate.js";
import {
  domManipulator,
  toDosManipulator,
  projectsManipulator,
} from "./BB-manipulators.js";

export const masterController = (() => {
  const toDosArray = JSON.parse(localStorage.getItem("toDosArray")) || [];
  const projectsArray = JSON.parse(localStorage.getItem("projectsArray")) || [];

  return {
    toDosArray,
    projectsArray,
  };
})();

export const utilityFunctions = (() => {
  let currentPage = "Inbox";
  function setCurrentPage(param) {
    currentPage = param;
  }
  function getCurrentPage() {
    return currentPage;
  }

  function getRandomNumber() {
    return Math.random() * 360;
  }

  function getRandomColor() {
    const hue = getRandomNumber();
    const saturation = "50%";
    const lightness = "60%";

    return `hsl(${hue}, ${saturation}, ${lightness})`;
  }

  function today() {
    const now = new Date();
    return now.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
  }

  function tomorrow() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
  }

  return {
    getRandomNumber,
    getRandomColor,
    today,
    tomorrow,
    setCurrentPage,
    getCurrentPage,
  };
})();

// CLASSES

class ToDo {
  constructor(name, description, priority, dueDate, project) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.done = false;
    this.project = !project ? "No Project" : project;

    toDosManipulator.todoPushArray(this);
    projectsManipulator.addToProject(this, this.project);
  }

  addToProject(project) {
    this.project = project;
    projectsManipulator.addToProject(this, this.project);
  }
}

export class Project {
  constructor(name, description) {
    this.name = name;
    this.description = !description ? "No Description" : description;
    this.toDos = [];

    projectsManipulator.projectPushArray(this);
    domManipulator.loadProjects();
  }
}
const projectDefault = new Project("No Project");

// EVENT LISTENERS ON LOAD
document.addEventListener("DOMContentLoaded", function () {
  generateStuff(utilityFunctions.getCurrentPage());

  alert(
    `Note: This project is unfinished! \nAll of the forms to add or edit items are not styled!`
  );

  const addTaskButton = document.querySelector(".add-task");
  addTaskButton.addEventListener("click", domManipulator.addTaskForm);
  const closeFormButton = document.querySelector(".close-button");
  closeFormButton.addEventListener("click", domManipulator.addTaskForm);

  const form = document.querySelector(".form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#project").value;

    let dueDate;
    const dueDateChoice = document.getElementById('due-date-choice').value;
    
    if (dueDateChoice === 'today') {
        dueDate = utilityFunctions.today();
    } else if (dueDateChoice === 'tomorrow') {
        dueDate = utilityFunctions.tomorrow();
    } else {
        dueDate = document.getElementById('due-date').value;
    }
    new ToDo(name, description, priority, dueDate, project);

    // clear inputs after submission
    document.querySelector("#name").value = "";
    document.querySelector("#description").value = "";

    // render the tasks list and close modal
    domManipulator.addTaskForm();
    generateStuff(utilityFunctions.getCurrentPage());

    // save to local storage
    localStorage.setItem(
      "toDosArray",
      JSON.stringify(masterController.toDosArray)
    );
  });

  const sidebarButtons = document.querySelectorAll(".tasks .list-item");
  sidebarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let pElement = button.lastElementChild;
      generateStuff(pElement.textContent);
      utilityFunctions.setCurrentPage(pElement.textContent);
    });
  });

  const addProjectButton = document.querySelector(".add-project");
  addProjectButton.addEventListener("click", addProject);

  // Event listener for due-date-choice select element
  document
    .getElementById("due-date-choice")
    .addEventListener("change", function () {
      const dueDateInput = document.getElementById("due-date");
      if (this.value === "custom") {
        dueDateInput.style.display = "block";
      } else {
        dueDateInput.style.display = "none";
      }
    });
});
