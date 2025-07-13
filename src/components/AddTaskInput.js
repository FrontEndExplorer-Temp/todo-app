// AddTaskInput.js
export function AddTaskInput({ onAdd }) {
  const form = document.createElement('form');
  form.className = 'add-task-input';
  form.style.position = 'sticky';
  form.style.top = '0';
  form.style.background = 'inherit';
  form.style.zIndex = '2';
  form.style.paddingBottom = '8px';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Add a new task...';
  input.required = true;
  input.autocomplete = 'off';
  input.className = 'add-task-text';
  input.name = 'title';

  const dueInput = document.createElement('input');
  dueInput.type = 'date';
  dueInput.className = 'add-task-due';
  dueInput.style.marginLeft = '8px';
  dueInput.name = 'dueDate';

  const tagsInput = document.createElement('input');
  tagsInput.type = 'text';
  tagsInput.placeholder = 'Tags (comma separated)';
  tagsInput.className = 'add-task-tags';
  tagsInput.style.marginLeft = '8px';
  tagsInput.name = 'tags';

  const prioritySelect = document.createElement('select');
  prioritySelect.className = 'add-task-priority';
  prioritySelect.name = 'priority';
  prioritySelect.style.marginLeft = '8px';
  ['Low', 'Medium', 'High'].forEach(level => {
    const option = document.createElement('option');
    option.value = level.toLowerCase();
    option.textContent = level;
    if (level === 'Low') option.selected = true;
    prioritySelect.appendChild(option);
  });

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Add';
  button.className = 'add-task-btn';

  form.append(input, dueInput, tagsInput, prioritySelect, button);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const value = input.value.trim();
    const dueDate = dueInput.value || null;
    const tags = tagsInput.value
      ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    const priority = prioritySelect.value;
    if (value) {
      onAdd(value, dueDate, tags, priority);
      input.value = '';
      dueInput.value = '';
      tagsInput.value = '';
      prioritySelect.value = 'low';
    }
  });

  return form;
} 