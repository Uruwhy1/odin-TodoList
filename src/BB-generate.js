import { toDosManipulator } from "./BB-manipulators.js";
import { currentPage, utilityFunctions } from './BB-index.js'
import { format, isAfter, isBefore, isThisWeek, isToday, isTomorrow } from "date-fns";

export default function generateStuff(param) {

    let header = document.querySelector('.header');
    let div = document.querySelector('.right-container');
    let subheader = document.querySelector('.subheader')

    // clear the current list of tasks
    div.innerHTML = '';

    const renderTask = (element) => {
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        

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
                generateStuff(currentPage); // re render task list with delay
            }, 500);
            
        });

        let taskName = document.createElement('p');
        taskName.textContent = element.name;
        taskName.classList.add('bold')


        let dateDiv = document.createElement('div');
        let dueString = document.createElement('p');
        dueString.textContent = format(element.dueDate, "LLL d");
        if (isBefore(element.dueDate, utilityFunctions.today())) {
            dateDiv.style.color = "red";
            dateDiv.classList.add('bold')
            dateDiv.style.textDecoration = "underline"
        }
        dateDiv.appendChild(dueString);
        
        taskContainer.appendChild(taskDone);
        taskContainer.appendChild(taskName);
        taskContainer.appendChild(dateDiv);

        div.appendChild(taskContainer);
    }

    if (param == "Inbox") {
        header.textContent = 'Inbox';
        subheader.textContent = 'Tasks without any project assigned.'

        // render only tasks without a project assigned and not done
        toDosManipulator.getAllToDos().filter(task => task.project == 'No Project').forEach(element => {
            if (!element.done) {
                renderTask(element)
            }
        });

        // Append the list of tasks to the DOM
        document.querySelector('.right-side').appendChild(div);
    }
    if (param == "Today") {
        header.textContent = 'Today';
        subheader.textContent = 'Tasks which are due today.'


        // render only tasks which are due today and not done
        toDosManipulator.getAllToDos().filter(task => isToday(task.dueDate)).forEach(element => {
            if (!element.done) {
                renderTask(element)
            } 
        }); 
        // Append the list of tasks to the DOM
        document.querySelector('.right-side').appendChild(div);
    }
    if (param == "Tomorrow") {
        header.textContent = 'Tomorrow';
        subheader.textContent = 'Tasks which are due tomorrow.'

        // render only tasks which are due tomorrow and not done
        toDosManipulator.getAllToDos().filter(task => isTomorrow(task.dueDate)).forEach(element => {
            if (!element.done) {
                renderTask(element)
            } 
        }); 

        // Append the list of tasks to the DOM
        document.querySelector('.right-side').appendChild(div);
    }
    if (param == "This Week") {
        header.textContent = 'This Week';
        subheader.textContent = 'Tasks which are due in this week.'

        // render only tasks which are due this week and not done
        toDosManipulator.getAllToDos().filter(task => isThisWeek(task.dueDate)).forEach(element => {
            if (!element.done) {
                renderTask(element)
            } 
        }); 

        // Append the list of tasks to the DOM
        document.querySelector('.right-side').appendChild(div);
    }
}

