import './AA-reset.css';
import './AA-common.css';
import './AA-sidebar.css';
import './AA-right-side.css'

import generateStuff from './BB-generate.js'
import {domManipulator, toDosManipulator, projectsManipulator} from './BB-manipulators.js'

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

export let currentPage = 'Inbox';

// CLASSES

class ToDo {
    constructor(name, description, priority, dueDate, project,) {
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




// ADD EVENT LISTNEEEERS
document.addEventListener('DOMContentLoaded', function() {
    generateStuff(currentPage);

    const button = document.querySelector('.add-task');
    button.addEventListener('click', domManipulator.addTask);


    const form = document.querySelector('.form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.querySelector('#name').value;
        const description = document.querySelector('#description').value;
        const priority = document.querySelector('#priority').value;
        const dueDate = new Date(document.querySelector('#due-date').value);
        const project = document.querySelector('#project').value;

        const newTodo = new ToDo(name, description, priority, dueDate, project);

        // clear inputs after submission
        document.querySelector('#name').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#priority').value = '';
        document.querySelector('#due-date').value = '';
        document.querySelector('#project').value = '';

        // render the tasks list and close modal
        domManipulator.addTask()
        generateStuff(currentPage);
    });

    const sidebarButtons = document.querySelectorAll('.tasks .list-item');
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            let pElement = button.lastElementChild;
            generateStuff(pElement.textContent);
            currentPage = pElement.textContent;
        });
    });
} 
)

// TESTING 
const project1 = new Project("Test Project");
const todo1 = new ToDo("name", "description", "HIGH", new Date())

const project2 = new Project("testProject1", "lorem ipsuuuuuuuuuuuuuuuuuuuum");
const todo2 = new ToDo("name2", "description", "MEDIUM", new Date())
