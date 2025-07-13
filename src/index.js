import './styles/main.scss';
import { loadFromStorage, saveToStorage } from "./storage.js";
import Todo from "./models/Todo.js";
import { TaskList } from './components/TaskList.js';
import { AddTaskInput } from './components/AddTaskInput.js';
import { Filters } from './components/Filters.js';
import { Modal } from './components/Modal.js';
import { EditTaskModal } from './components/EditTaskModal.js';
import { DarkModeToggle } from './components/DarkModeToggle.js';
import { BulkActions } from './components/BulkActions.js';

// All legacy DOMContentLoaded and old DOM code removed

let tasks = loadFromStorage() || [];
let lastDeleted = null;

let filter = 'all';
let sort = 'date';
let selectedTag = '';
let priorityFilter = '';

const THEME_KEY = 'todo_theme';
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
let mode = localStorage.getItem(THEME_KEY) || getSystemTheme();
applyTheme(mode);

function handleFilterChange(val) {
  filter = val;
  renderApp();
}

function handleSortChange(val) {
  sort = val;
  renderApp();
}

function handleTagChange(val) {
  selectedTag = val;
  renderApp();
}

function handlePriorityFilterChange(val) {
  priorityFilter = val;
  renderApp();
}

function handleThemeToggle(newMode) {
  mode = newMode;
  localStorage.setItem(THEME_KEY, mode);
  applyTheme(mode);
  renderApp();
}

function applyTheme(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
}

function getAllTags() {
  const tagSet = new Set();
  tasks.forEach(t => (t.tags || []).forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

function getFilteredSortedTasks() {
  let filtered = tasks;
  if (filter === 'active') filtered = tasks.filter(t => !t.completed);
  else if (filter === 'completed') filtered = tasks.filter(t => t.completed);
  if (selectedTag) filtered = filtered.filter(t => t.tags && t.tags.includes(selectedTag));
  if (priorityFilter) filtered = filtered.filter(t => t.priority === priorityFilter);
  // Sorting
  if (sort === 'date') filtered = filtered.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (sort === 'status') filtered = filtered.slice().sort((a, b) => a.completed - b.completed);
  else if (sort === 'alpha') filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'priority') filtered = filtered.slice().sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });
  return filtered;
}

function saveAndRender() {
  saveToStorage(tasks);
  renderApp();
}

function handleAdd(title, dueDate, tags, priority) {
  const newTask = new Todo({ title, dueDate, tags, priority });
  tasks.unshift(newTask);
  saveAndRender();
}

function handleToggle(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.toggleComplete();
    saveAndRender();
  }
}

function handleEdit(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const modal = Modal({
      content: EditTaskModal({
        task,
        onSave: updatedFields => {
          task.update(updatedFields);
          saveAndRender();
        },
        onClose: () => modal.remove(),
      }),
      onClose: () => modal.remove(),
    });
    document.body.appendChild(modal);
  }
}

function handleDelete(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    if (confirm('Delete this task?')) {
      lastDeleted = tasks[idx];
      tasks.splice(idx, 1);
      saveAndRender();
      showToast('Task deleted. ', 'Undo', undoDelete);
    }
  }
}

function undoDelete() {
  if (lastDeleted) {
    tasks.unshift(lastDeleted);
    lastDeleted = null;
    saveAndRender();
  }
}

function showToast(msg, actionText, action) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  if (actionText && action) {
    const btn = document.createElement('button');
    btn.textContent = actionText;
    btn.style.marginLeft = '12px';
    btn.onclick = () => {
      action();
      toast.remove();
    };
    toast.appendChild(btn);
  }
  setTimeout(() => toast.remove(), 4000);
}

function handleClearCompleted() {
  if (tasks.some(t => t.completed)) {
    if (confirm('Clear all completed tasks?')) {
      const removed = tasks.filter(t => t.completed);
      tasks = tasks.filter(t => !t.completed);
      saveAndRender();
      showToast('Completed tasks cleared.', 'Undo', () => {
        tasks = removed.concat(tasks);
        saveAndRender();
      });
    }
  }
}

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.removeAttribute('class');
  app.setAttribute('role', 'main');
  app.appendChild(DarkModeToggle({ mode, onToggle: handleThemeToggle }));
  app.appendChild(AddTaskInput({ onAdd: handleAdd }));
  app.appendChild(BulkActions({
    hasCompleted: tasks.some(t => t.completed),
    onClearCompleted: handleClearCompleted,
  }));
  // --- CARD CONTAINER START ---
  const card = document.createElement('div');
  card.className = 'todo-card';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.gap = '12px';
  card.style.background = 'var(--primary-light-alpha)';
  card.style.borderRadius = '18px';
  card.style.boxShadow = '0 4px 24px rgba(37,99,235,0.10)';
  card.style.padding = '32px 18px 24px 18px';
  card.style.margin = '0 auto';
  card.style.width = '78vw';
  card.style.minWidth = '0';
  card.style.alignSelf = 'center';
  card.appendChild(Filters({
    filter,
    sort,
    tags: getAllTags(),
    selectedTag,
    onFilterChange: handleFilterChange,
    onSortChange: handleSortChange,
    onTagChange: handleTagChange,
    priorityFilter,
    onPriorityFilterChange: handlePriorityFilterChange,
  }));
  const filtered = getFilteredSortedTasks();
  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No tasks to show. Add a new task!';
    card.appendChild(empty);
  } else {
    card.appendChild(TaskList({
      tasks: filtered,
      onToggle: handleToggle,
      onEdit: handleEdit,
      onDelete: handleDelete,
    }));
  }
  app.appendChild(card);
}

renderApp();
