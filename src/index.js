import './reset.css';
import './common.css';
import './sidebar.css';
import './right-side.css'

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
        const saturation = '30%'; 
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
    constructor(name, description, priority, project) {
        this.name = name;
        this.description = description;
        this.priority = priority;
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


import generateStuff from './generate.js'
import {domManipulator, toDosManipulator, projectsManipulator} from './manipulators.js'

// TESTING 
const project1 = new Project("Test Project");
const todo1 = new ToDo("tes2323t", "test1", "HIGH")

const project2 = new Project("testProject1", "lorem ipsuuuuuuuuuuuuuuuuuuuum");
const todo2 = new ToDo("HELLOOO", "xd", "LOW")

// ADD EVENT LISTNEEEERS
document.addEventListener('DOMContentLoaded', generateStuff("inbox")
)

