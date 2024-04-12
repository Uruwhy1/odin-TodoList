import { toDosManipulator } from "./manipulators.js";

export default function generateStuff() {
    toDosManipulator.getAllToDos().forEach(element => {
        let domElement = document.createElement('p');
        domElement.textContent = element.name;
    
        document.querySelector('.test').appendChild(domElement);
    
    });
}
