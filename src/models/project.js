// src/models/Project.js

export default function Project(name) {
  this.name = name;
  this.todos = []; // Array to store todo items
}

Project.prototype.addTodo = function (todo) {
  this.todos.push(todo);
};

Project.prototype.removeTodo = function (todoTitle) {
  this.todos = this.todos.filter(function (todo) {
    return todo.title !== todoTitle;
  });
};
