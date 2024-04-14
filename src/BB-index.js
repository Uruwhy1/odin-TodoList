import './AA-reset.css';
import './AA-common.css';
import './AA-sidebar.css';
import './AA-right-side.css'

export const masterController = (() => {
    const toDosArray = [];
    const projectsArray = [];
    
    return {
        toDosArray,
        projectsArray
    };
})();

export const utilityFunctions = (() => {
    function getRandomNumber() {
        return Math.random() * 360; 
    }

    function getRandomColor() {
        const hue = getRandomNumber();
        const saturation = '50%'; 
        const lightness = '60%'; 

        return `hsl(${hue}, ${saturation}, ${lightness})`;
    }
   
    return {
        getRandomNumber,
        getRandomColor
    }
})();

// CLASSES

class ToDo {
    constructor(name, description, priority, project, dueDate) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = this.dueDate;
        this.done = false;
        this.project = !project ? "No Project" : project;

        toDosManipulator.todoPushArray(this);
        projectsManipulator.addToProject(this, this.project);
    }

    addToProject(project) {
        this.project = project;
        projectsManipulator.addToProject(this, this.project)
    }
}

class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.toDos = [];

        projectsManipulator.projectPushArray(this);
        domManipulator.loadProjects();
    }
}
const projectDefault = new Project('No Project');

// ADD TASK FORM
function addTask(){

    // display form and animate
    let form = document.querySelector('.form');
    if (form.style.display === 'block') {
        form.style.animation = 'notRevealAnimation 1 0.2s ease forwards'
        setTimeout(() => {
            form.style.display = 'none';
        }, 300);
    } else {
        form.style.display = 'block';
        form.style.animation = 'revealAnimation 1 0.3s ease forwards'
    }
        document.querySelector('.right-side').appendChild(form);

    // other thing
}


// IMPORTS

import generateStuff from './BB-generate.js'
import {domManipulator, toDosManipulator, projectsManipulator} from './BB-manipulators.js'

// TESTING 
const project1 = new Project("Test Project");
const todo1 = new ToDo("name", "description", "HIGH")

const project2 = new Project("testProject1", "lorem ipsuuuuuuuuuuuuuuuuuuuum");
const todo2 = new ToDo("name2", "description", "MEDIUM")

// ADD EVENT LISTNEEEERS
document.addEventListener('DOMContentLoaded', function() {
    generateStuff("inbox");

    const button = document.querySelector('.add-task');
    button.addEventListener('click', addTask);
} 
)

