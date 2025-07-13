// TaskItem.js
// Renders a single task item

function getDueStatus(dueDate, completed) {
  if (!dueDate || completed) return '';
  const now = new Date();
  const due = new Date(dueDate);
  const diff = (due - now) / (1000 * 60 * 60 * 24); // days
  if (diff < 0) return 'overdue';
  if (diff < 2) return 'soon';
  return 'ontime';
}

function getPriorityLabel(priority) {
  const span = document.createElement('span');
  span.className = 'task-priority priority-' + (priority || 'low');
  let icon = '';
  if (priority === 'high') icon = '⬆️ ';
  else if (priority === 'medium') icon = '➖ ';
  else icon = '⬇️ ';
  span.textContent = icon + (priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : 'Low');
  return span;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '');
  li.dataset.id = task.id;

  // Animate add
  li.classList.add('adding');
  setTimeout(() => li.classList.remove('adding'), 400);

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.name = `completed-${task.id}`;
  checkbox.id = `completed-${task.id}`;
  checkbox.addEventListener('change', () => onToggle(task.id));

  // Title
  const title = document.createElement('span');
  title.className = 'task-title';
  title.textContent = task.title;

  // Add label for checkbox for accessibility
  const checkboxLabel = document.createElement('label');
  checkboxLabel.htmlFor = checkbox.id;
  checkboxLabel.style.marginRight = '8px';
  checkboxLabel.appendChild(checkbox);

  // Priority
  const priority = getPriorityLabel(task.priority);

  // Due date
  const due = document.createElement('span');
  due.className = 'task-due';
  if (task.dueDate) {
    const status = getDueStatus(task.dueDate, task.completed);
    due.textContent = `Due: ${task.dueDate}`;
    due.classList.add('due-' + status);
  }

  // Tags
  const tags = document.createElement('span');
  tags.className = 'task-tags';
  if (task.tags && task.tags.length) tags.textContent = task.tags.join(', ');

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'task-edit';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => onEdit(task.id));

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.className = 'task-delete';
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    // Animate remove
    li.classList.add('removing');
    setTimeout(() => onDelete(task.id), 300);
  });

  li.append(checkboxLabel, title, priority, due, tags, editBtn, delBtn);
  return li;
} 