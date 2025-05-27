// src/index.js

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

  // Example of adding a new todo
  var newTodo = new Todo("Sample Task", "A task to do", "2025-06-01", "high");
  projects[0].addTodo(newTodo);
  saveToStorage(projects);
});
