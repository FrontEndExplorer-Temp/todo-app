// src/storage.js

import Todo from "./models/Todo.js";

export function loadFromStorage() {
  const data = localStorage.getItem("tasks");
  if (!data) return [];
  return JSON.parse(data).map(task => new Todo(task));
}

export function saveToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
