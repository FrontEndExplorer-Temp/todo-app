import "./style.css"; // Add this line at the top of your index.js
import { loadFromStorage, saveToStorage } from "./storage.js";
import { renderProjectList } from "./components/ProjectList.js";
import Project from "./models/Project.js";
import Todo from "./models/Todo.js";

document.addEventListener("DOMContentLoaded", function () {
  var projects = loadFromStorage();

  if (projects.length === 0) {
    // Create a default project if none exist
    var defaultProject = new Project("Default");
    projects.push(defaultProject);
  }

  renderProjectList(projects);

  // Event listener for adding a new project
  document.getElementById("add-project").addEventListener("click", function () {
    var projectName = document.getElementById("project-name").value;
    if (projectName) {
      var newProject = new Project(projectName);
      projects.push(newProject);
      saveToStorage(projects);
      renderProjectList(projects);
      document.getElementById("project-name").value = ""; // Clear input field
    }
  });

  // Event listener for adding a new todo
  document.getElementById("add-todo").addEventListener("click", function () {
    var title = document.getElementById("todo-title").value;
    var description = document.getElementById("todo-description").value;
    var dueDate = document.getElementById("todo-due-date").value;
    var priority = document.getElementById("todo-priority").value;

    if (title && description && dueDate && priority) {
      var newTodo = new Todo(title, description, dueDate, priority);
      projects[0].addTodo(newTodo); // Adding to the first project (default)
      saveToStorage(projects);
      renderTodosForProject(projects[0]);
      document.getElementById("todo-title").value = "";
      document.getElementById("todo-description").value = "";
      document.getElementById("todo-due-date").value = "";
    }
  });
});
