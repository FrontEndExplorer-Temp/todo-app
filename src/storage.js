// src/storage.js

import Project from "./models/Project.js";
import Todo from "./models/Todo.js";

export function loadFromStorage() {
  var data = localStorage.getItem("projects");
  if (!data) return [];
  var parsedData = JSON.parse(data);

  return parsedData.map(function (projectData) {
    var project = new Project(projectData.name);
    projectData.todos.forEach(function (todoData) {
      var todo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );
      project.addTodo(todo);
    });
    return project;
  });
}

export function saveToStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}
