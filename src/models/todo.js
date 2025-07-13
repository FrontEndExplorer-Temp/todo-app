export default class Todo {
  constructor({
    id = Date.now().toString(),
    title,
    description = '',
    dueDate = null,
    priority = 'low',
    notes = '',
    checklist = [],
    tags = [],
    completed = false,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority || 'low';
    this.completed = completed;
    this.notes = notes;
    this.checklist = checklist;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toggleComplete() {
    this.completed = !this.completed;
    this.updatedAt = new Date().toISOString();
  }

  update(fields) {
    Object.assign(this, fields);
    this.updatedAt = new Date().toISOString();
  }

  updateTags(tags) {
    this.tags = tags;
    this.updatedAt = new Date().toISOString();
  }
}
