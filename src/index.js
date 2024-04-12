// import './styles.css';
// import './reset.css';

const masterController = (() => {
    const toDosArray = [];
    const projectsArray = [];
    
    return {
        toDosArray,
        projectsArray
    };
})();

// TO-DOS STUFF
class ToDo {
    constructor(name, description, priority, project) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.done = false;
        this.project = !project ? "No Project" : project;

        // Automatically add this to the toDosArray
        toDosManipulator.todoPushArray(this);
        projectsManipulator.addToProject(this, this.project);
    }

    addToProject(project) {
        this.project = project;
        projectsManipulator.addToProject(this, this.project)
    }
};

const toDosManipulator = (() => {

    // Called when a todo gets created
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

// PROJECTS STUFF
class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.toDos = [];

        projectsManipulator.projectPushArray(this)
    }
}

const projectsManipulator = (() => {

    // Called when a project gets created
    function projectPushArray(project) {
        masterController.projectsArray.push(project);
    }

    function addToProject(todo, projectName) {
        // LOOP THROUGH ARRAY TO FIND PROJECT
        let find = masterController.projectsArray.find(project => project.name === projectName);
        // ADD TODO TO PROJECT
        if (find) {
            find.toDos.push(todo);
        } else {
            console.error("xd")
        }}

    function getAllProjects() {
        return masterController.projectsArray();
     };

    return {
        projectPushArray,
        getAllProjects,
        addToProject
    }
})();
const projectDefault = new Project('No Project');


