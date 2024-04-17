import './AA-reset.css';
import './AA-common.css';
import './AA-sidebar.css';
import './AA-right-side.css'

import generateStuff from './BB-generate.js'
import {addProject} from './BB-generate.js'
import {domManipulator, toDosManipulator, projectsManipulator} from './BB-manipulators.js'

export const masterController = (() => {
    const toDosArray = JSON.parse(localStorage.getItem('toDosArray')) || [];
    const projectsArray = JSON.parse(localStorage.getItem('projectsArray')) || [];
    
    return {
        toDosArray,
        projectsArray
    };
})();

export const utilityFunctions = (() => {
    let currentPage = 'Inbox';
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
        const saturation = '50%'; 
        const lightness = '60%'; 

        return `hsl(${hue}, ${saturation}, ${lightness})`;
    }

    function today() {
            return new Date();
    }

    
    return {
        getRandomNumber,
        getRandomColor,
        today,
        setCurrentPage,
        getCurrentPage
    }
})(); 

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

export class Project {
    constructor(name, description) {
        this.name = name;
        this.description = !description ? "No Description" : description;
        this.toDos = [];

        projectsManipulator.projectPushArray(this);
        domManipulator.loadProjects();
    }
}
const projectDefault = new Project('No Project');




// EVENT LISTENERS ON LOAD
document.addEventListener('DOMContentLoaded', function() {
    generateStuff(utilityFunctions.getCurrentPage());

    const addTaskButton = document.querySelector('.add-task');
    addTaskButton.addEventListener('click', domManipulator.addTaskForm);
    const closeFormButton = document.querySelector('.close-button');
    closeFormButton.addEventListener('click', domManipulator.addTaskForm);


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
        domManipulator.addTaskForm()
        generateStuff(utilityFunctions.getCurrentPage());

        // save to local storage
        localStorage.setItem('toDosArray', JSON.stringify(masterController.toDosArray));
    });

    const sidebarButtons = document.querySelectorAll('.tasks .list-item');
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            let pElement = button.lastElementChild;
            generateStuff(pElement.textContent);
            utilityFunctions.setCurrentPage(pElement.textContent);
        });
    });

    const addProjectButton = document.querySelector('.add-project');
    addProjectButton.addEventListener('click', addProject);


} 
)