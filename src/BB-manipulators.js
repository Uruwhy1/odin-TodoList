import { masterController, utilityFunctions } from "./BB-index.js";
import generateStuff from "./BB-generate.js";
import { openProjectDetails } from "./BB-generate.js";

export const toDosManipulator = (() => {
  function todoPushArray(todo) {
    masterController.toDosArray.push(todo);
  }

  function getAllToDos() {
    return masterController.toDosArray;
  }

  function removeToDo(task) {
    const taskIndex = masterController.toDosArray.indexOf(task);
    console.log("xDDDDDDDD");

    if (taskIndex !== -1) {
      console.log("xDDDDDDDD2");
      masterController.toDosArray.splice(taskIndex, 1);
    }

    localStorage.setItem(
      "toDosArray",
      JSON.stringify(masterController.toDosArray)
    );
  }

  return {
    todoPushArray,
    getAllToDos,
    removeToDo,
  };
})();

export const projectsManipulator = (() => {
  function projectPushArray(project) {
    masterController.projectsArray.push(project);
  }

  function addToProject(todo, projectName) {
    let find = masterController.projectsArray.find(
      (project) => project.name === projectName
    );
    if (find) {
      find.toDos.push(todo);
    } else {
      console.error("xd");
    }
  }

  function getAllProjects() {
    return masterController.projectsArray;
  }

  function removeProject(project) {
    // Remove the project's tasks
    const tasksToRemove = project.toDos;
    tasksToRemove.forEach((task) => {
      toDosManipulator.removeToDo(task);
    });

    // Remove the project from the projects array
    const index = masterController.projectsArray.indexOf(project);
    if (index !== -1) {
      masterController.projectsArray.splice(index, 1);
    }

    generateStuff("Inbox");
    utilityFunctions.setCurrentPage("Inbox");
  }
  return {
    projectPushArray,
    getAllProjects,
    addToProject,
    removeProject,
  };
})();

export const domManipulator = (() => {
  function loadProjects() {
    let container = document.querySelector(".projects");
    let containerForm = document.querySelector("#project");

    // Clear existing project elements from containers
    container.innerHTML = "";
    containerForm.innerHTML = "";

    // Append project elements to sidebar
    projectsManipulator
      .getAllProjects()
      .filter((project) => project.name !== "No Project")
      .forEach((element) => {
        let color = utilityFunctions.getRandomColor();

        let containerDiv = document.createElement("div");
        containerDiv.classList.add("project-container");

        let div = document.createElement("div");
        div.classList.add("loaded-project");
        div.style.color = color;

        div.addEventListener("click", function () {
          generateStuff(element);
          utilityFunctions.setCurrentPage(element.name);
        });

        let svg = document.createElement("svg");
        svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hash"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>`;
        div.appendChild(svg);

        let project = document.createElement("p");
        project.textContent = element.name;
        div.appendChild(project);

        containerDiv.appendChild(div);

        let editButton = document.createElement("svg");
        editButton.classList.add("edit-project");
        editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
        editButton.addEventListener("click", function () {
          openProjectDetails(element);
        });
        containerDiv.appendChild(editButton);

        let removeButton = document.createElement("svg");
        removeButton.classList.add("remove-project");
        removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
        removeButton.addEventListener("click", function () {
          const confirmed = confirm(
            `Are you sure you want to remove this project? \nAll tasks assigned will be removed.`
          );
          if (confirmed) {
            projectsManipulator.removeProject(element);
            loadProjects();
          }
        });
        containerDiv.appendChild(removeButton);

        container.appendChild(containerDiv);
      });

    // Append project elements to form
    projectsManipulator.getAllProjects().forEach((element) => {
      let option = document.createElement("option");
      option.value = element.name;
      option.textContent = element.name;

      containerForm.appendChild(option);
    });
  }

  // ADD TASK FORM
  function addTaskForm() {
    let form = document.querySelector(".form");

    // Set the value of the date input to today's date
    const dateInput = document.getElementById("due-date");

    dateInput.value = utilityFunctions.today();

    form.classList.toggle("hidden");
  }

  return {
    loadProjects,
    addTaskForm,
  };
})();
