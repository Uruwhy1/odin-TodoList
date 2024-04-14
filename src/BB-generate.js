import { toDosManipulator } from "./BB-manipulators.js";
import { currentPage } from './BB-index.js'

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
        let taskDue = document.createElement('p');
        taskDue.textContent = (element.dueDate).getHours();

        taskContainer.appendChild(taskDone);
        taskContainer.appendChild(taskName);
        taskContainer.appendChild(taskDue);

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
        subheader.textContent = 'Tasks which are due today. [NOT FILTERED YET]'

        // render only tasks which are due today and not done
        toDosManipulator.getAllToDos().forEach(element => {
            if (!element.done) {
                renderTask(element)
            }
        });

        // Append the list of tasks to the DOM
        document.querySelector('.right-side').appendChild(div);
    }
    if (param == "Tomorrow") {
        header.textContent = 'Tomorrow';
        subheader.textContent = 'Tasks which are due tomorrow. [NOT FILTERED YET]'

        // render only tasks which are due tomorrow and not done
        toDosManipulator.getAllToDos().forEach(element => {
            if (!element.done) {
                renderTask(element)
            }
        });

        // Append the list of tasks to the DOM
        document.querySelector('.right-side').appendChild(div);
    }
    if (param == "This Week") {
        header.textContent = 'This Week';
        subheader.textContent = 'Tasks which are due this week. [NOT FILTERED YET]'

        // render only tasks which are due this week and not done
        toDosManipulator.getAllToDos().forEach(element => {
            if (!element.done) {
                renderTask(element)
            }
        });

        // Append the list of tasks to the DOM
        document.querySelector('.right-side').appendChild(div);
    }
}
