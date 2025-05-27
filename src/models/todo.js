class Todo {
  constructor(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description || "";
    this.dueDate = dueDate || null;
    this.priority = priority || "low";
    this.completed = false;
    this.notes = notes || "";
    this.checklist = checklist || [];
  }

  markComplete() {
    this.completed = true;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateDueDate(newDate) {
    this.dueDate = newDate;
  }
}

// Use ES6 default export
export default Todo;
