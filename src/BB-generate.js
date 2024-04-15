import { toDosManipulator, projectsManipulator } from "./BB-manipulators.js";
import { utilityFunctions } from './BB-index.js'
import { addDays, format, isBefore, isThisWeek, isToday, isTomorrow } from "date-fns";

export default function generateStuff(param) {

    let header = document.querySelector('.header');
    let div = document.querySelector('.right-container');
    let subheader = document.querySelector('.subheader')

    // clear the current list of tasks
    div.innerHTML = '';

    const renderTask = (element) => {
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        
        let infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container')
        infoContainer.addEventListener('click', function() {
            openTaskDetails(div, element)
        })

        let taskDone = document.createElement('svg');
        taskDone.classList.add('checkbox')
        switch (element.priority) {
            case 'HIGH': 
                taskDone.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';
                break;
            case 'MEDIUM': 
                taskDone.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="yellow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';
            break;
            case 'LOW': 
                taskDone.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';
        }
        taskDone.addEventListener('click', () => {
            element.done = !element.done;
            taskDone.style.animation = "rotate 0.5s 1"
            setTimeout(() => {
                generateStuff(utilityFunctions.getCurrentPage()); // re render task list with delay
            }, 500);
            
        });

        let taskName = document.createElement('p');
        taskName.textContent = element.name;
        taskName.classList.add('bold')
        

        let dueString = document.createElement('p');
        dueString.textContent = format(addDays(element.dueDate, 1), "LLL d" );
        if (isBefore(element.dueDate, utilityFunctions.today())) {
            dueString.style.color = "red";
            dueString.classList.add('bold')
            dueString.style.textDecoration = "underline"
        }
        
        taskContainer.appendChild(taskDone);
        infoContainer.appendChild(taskName);
        infoContainer.appendChild(dueString);
        taskContainer.appendChild(infoContainer)

        div.appendChild(taskContainer);
    }

    switch (param) {
        case "Inbox":
            header.textContent = 'Inbox';
            subheader.textContent = 'Tasks without any project assigned.';
            // Render only tasks without a project assigned and not done
            toDosManipulator.getAllToDos().filter(task => task.project === 'No Project').forEach(element => {
                if (!element.done) {
                    renderTask(element);
                }
            });
            break;
    
        case "Today":
            header.textContent = 'Today';
            subheader.textContent = 'Tasks which are due today.';
    
            // Render only tasks which are due today and not done
            toDosManipulator.getAllToDos().filter(task => isToday(addDays(task.dueDate, 1))).forEach(element => {
                if (!element.done) {
                    renderTask(element);
                }
            });
            break;
    
        case "Tomorrow":
            header.textContent = 'Tomorrow';
            subheader.textContent = 'Tasks which are due tomorrow.';
    
            // Render only tasks which are due tomorrow and not done
            toDosManipulator.getAllToDos().filter(task => isTomorrow(addDays(task.dueDate, 1))).forEach(element => {
                if (!element.done) {
                    renderTask(element);
                }
            });
            break;
    
        case "This Week":
            header.textContent = 'This Week';
            subheader.textContent = 'Tasks which are due in this week.';
    
            // Render only tasks which are due this week and not done
            toDosManipulator.getAllToDos().filter(task => isThisWeek(addDays(task.dueDate, 1))).forEach(element => {
                if (!element.done) {
                    renderTask(element);
                }
            });
            break;
    
        // For when sending projects
        default:
            header.textContent = param.name;
            subheader.textContent = param.description;
    
            // Render only tasks which are due this week and not done
            toDosManipulator.getAllToDos().filter(task => task.project == param.name).forEach(element => {
                if (!element.done) {
                    renderTask(element);
                }
            });
            break;    
        }
    
    // Append the list of tasks to the DOM
    document.querySelector('.right-side').appendChild(div);
}

function openTaskDetails(div, element) {
    // Remove if open
    if (document.querySelector('.task-details')) {
        div.removeChild(document.querySelector('.task-details'))
    }

    let container = document.createElement('form');
    container.classList.add("task-details")

    


    // Task properties
    let taskName = document.createElement('input')
    taskName.value = element.name;
    container.appendChild(taskName);

    let taskDescription = document.createElement('input');
    taskDescription.value = element.description;
    container.appendChild(taskDescription)

    let taskDate = document.createElement('input');
    taskDate.type = "date";
    taskDate.value = element.dueDate.toISOString().split('T')[0];
    container.appendChild(taskDate)


    let taskProject = document.createElement('select');
    projectsManipulator.getAllProjects().forEach(element => {
        let option = document.createElement('option');
        option.textContent = element.name;

        taskProject.appendChild(option);
    })
    container.appendChild(taskProject)


    let submitButton = document.createElement('button');
    submitButton.textContent = "SUBMIT"
    container.appendChild(submitButton);
    
    let closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.type = 'button'
    closeButton.addEventListener('click', function() {
        container.style.animation = 'notRevealAnimation 0.3s 1 forwards'
        setTimeout(() => {
            div.removeChild(container);
        }, 300);
    })
    container.appendChild(closeButton)
    div.appendChild(container);
    container.style.animation = 'revealAnimation 0.3s 1 forwards'

    
    container.addEventListener('submit', function(event) {
        event.preventDefault();
        element.name = taskName.value;
        element.description = taskDescription.value;
        element.dueDate = new Date(taskDate.value);
        element.project = taskProject.value;

        div.removeChild(container);
        generateStuff(utilityFunctions.getCurrentPage());

    })
}
