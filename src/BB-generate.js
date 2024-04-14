import { toDosManipulator } from "./BB-manipulators.js";

export default function generateStuff(param) {

    // when button is inbox
    if (param == "inbox") {
        let header = document.querySelector('.header');
        header.textContent = 'Inbox';
        let subheader = document.querySelector('.subheader')
        subheader.textContent = 'Tasks without any project assigned.'

        let div = document.createElement('div');
        div.classList.add('tasks-inbox')

        const renderTasks = () => {
            // clear the current list of tasks
            div.innerHTML = '';

            // filter and render tasks when not done
            toDosManipulator.getAllToDos().forEach(element => {
                if (!element.done) {
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
                            renderTasks(); // re render task list with delay
                        }, 500);
                        
                    });

                    let taskName = document.createElement('p');
                    taskName.textContent = element.name;
                    let taskPriority = document.createElement('p');
                    

                    taskContainer.appendChild(taskDone);
                    taskContainer.appendChild(taskName);
                    taskContainer.appendChild(taskPriority);

                    div.appendChild(taskContainer);
                }
            });

            // Append the list of tasks to the DOM
            document.querySelector('.right-side').appendChild(div);
        };

        // Initial rendering of tasks
        renderTasks();
    }
}