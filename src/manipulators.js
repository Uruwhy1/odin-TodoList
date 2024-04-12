import { masterController, utilityFunctions } from "./index.js";

export const toDosManipulator = (() => {
    function todoPushArray(todo) {
        masterController.toDosArray.push(todo);
    }

    function getAllToDos() {
       return masterController.toDosArray;
    };

    return {
        todoPushArray,
        getAllToDos
    };
})();

export const projectsManipulator = (() => {
    function projectPushArray(project) {
        masterController.projectsArray.push(project);
    }

    function addToProject(todo, projectName) {
        let find = masterController.projectsArray.find(project => project.name === projectName);
        if (find) {
            find.toDos.push(todo);
        } else {
            console.error("xd")
        }
    }

    function getAllProjects() {
        return masterController.projectsArray;
    };

    return {
        projectPushArray,
        getAllProjects,
        addToProject
    }
})();

export const domManipulator = (() => {
    function loadProjects() {
        let container = document.querySelector('.projects');
        
        // Clear existing project elements from container
        container.innerHTML = '';

        // Append project elements to container
        projectsManipulator.getAllProjects().filter(project => project.name !== "No Project").forEach(element => {
            let project = document.createElement('li');
            project.textContent = element.name;
            project.style.color = "#4b61ac";
            project.style.filter = `hue-rotate(${utilityFunctions.getRandomNumber()}deg)`
            container.appendChild(project);
        });
    }   
   
    return {
        loadProjects
    }
})();