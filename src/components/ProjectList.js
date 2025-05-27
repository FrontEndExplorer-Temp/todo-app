// src/components/ProjectList.js

export function renderProjectList(projects) {
  var projectContainer = document.querySelector("#projects");
  projectContainer.innerHTML = ""; // Clear existing list

  projects.forEach(function (project) {
    var projectElement = document.createElement("div");
    projectElement.textContent = project.name;
    projectElement.addEventListener("click", function () {
      showTodosForProject(project);
    });
    projectContainer.appendChild(projectElement);
  });
}

export function showTodosForProject(project) {
  var todoContainer = document.querySelector("#todos");
  todoContainer.innerHTML = ""; // Clear existing todos

  project.todos.forEach(function (todo) {
    var todoElement = document.createElement("div");
    todoElement.textContent = todo.title + " - Due: " + todo.dueDate;
    todoContainer.appendChild(todoElement);
  });
}
