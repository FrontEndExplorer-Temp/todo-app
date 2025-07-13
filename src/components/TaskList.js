import { TaskItem } from './TaskItem.js';

export function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const ul = document.createElement('ul');
  ul.className = 'task-list';
  tasks.forEach(task => {
    ul.appendChild(TaskItem({ task, onToggle, onEdit, onDelete }));
  });
  return ul;
} 