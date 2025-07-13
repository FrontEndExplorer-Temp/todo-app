// EditTaskModal.js
export function EditTaskModal({ task, onSave, onClose }) {
  const form = document.createElement('form');
  form.className = 'edit-task-form';
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.gap = '16px';

  // Title
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = task.title;
  titleInput.required = true;
  titleInput.placeholder = 'Task title';
  titleInput.name = 'title';

  // Due date
  const dueInput = document.createElement('input');
  dueInput.type = 'date';
  dueInput.value = task.dueDate || '';
  dueInput.name = 'dueDate';

  // Tags
  const tagsInput = document.createElement('input');
  tagsInput.type = 'text';
  tagsInput.value = (task.tags || []).join(', ');
  tagsInput.placeholder = 'Tags (comma separated)';
  tagsInput.name = 'tags';

  // Priority
  const prioritySelect = document.createElement('select');
  prioritySelect.className = 'edit-task-priority';
  prioritySelect.name = 'priority';
  ['Low', 'Medium', 'High'].forEach(level => {
    const option = document.createElement('option');
    option.value = level.toLowerCase();
    option.textContent = level;
    if (task.priority === level.toLowerCase()) option.selected = true;
    prioritySelect.appendChild(option);
  });

  // Save button
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.textContent = 'Save';
  saveBtn.className = 'edit-task-save';

  form.append(titleInput, dueInput, tagsInput, prioritySelect, saveBtn);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const updatedFields = {
      title: titleInput.value.trim(),
      dueDate: dueInput.value || null,
      tags: tagsInput.value
        ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
        : [],
      priority: prioritySelect.value,
    };
    onSave(updatedFields);
    if (onClose) onClose();
  });

  return form;
} 