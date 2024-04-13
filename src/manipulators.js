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
            let div = document.createElement('div');
            let color = utilityFunctions.getRandomColor();

            let svg = document.createElement('svg');
            svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hash"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>`
            div.appendChild(svg);

            let project = document.createElement('p');
            project.textContent = element.name;
            project.style.color = color;
            div.appendChild(project); 


            container.appendChild(div);
        });
    }   
   
    return {
        loadProjects
    }
})();