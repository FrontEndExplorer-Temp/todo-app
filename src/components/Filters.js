// Filters.js
export function Filters({ filter, sort, tags, selectedTag, onFilterChange, onSortChange, onTagChange, priorityFilter, onPriorityFilterChange }) {
  const container = document.createElement('div');
  container.className = 'filters';
  container.style.display = 'flex';
  container.style.justifyContent = 'space-between';
  container.style.alignItems = 'center';
  container.style.gap = '16px';
  container.style.marginBottom = '8px';

  // Filter select
  const filterSelect = document.createElement('select');
  filterSelect.className = 'filter-select';
  filterSelect.name = 'filter';
  ['All', 'Active', 'Completed'].forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.toLowerCase();
    option.textContent = opt;
    if (filter === opt.toLowerCase()) option.selected = true;
    filterSelect.appendChild(option);
  });
  filterSelect.addEventListener('change', e => onFilterChange(e.target.value));

  // Sort select
  const sortSelect = document.createElement('select');
  sortSelect.className = 'sort-select';
  sortSelect.name = 'sort';
  [
    { value: 'date', label: 'Date' },
    { value: 'status', label: 'Status' },
    { value: 'alpha', label: 'A-Z' },
    { value: 'priority', label: 'Priority' },
  ].forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    if (sort === value) option.selected = true;
    sortSelect.appendChild(option);
  });
  sortSelect.addEventListener('change', e => onSortChange(e.target.value));

  // Tag filter
  const tagSelect = document.createElement('select');
  tagSelect.className = 'tag-select';
  tagSelect.name = 'tag';
  const allOption = document.createElement('option');
  allOption.value = '';
  allOption.textContent = 'All Tags';
  tagSelect.appendChild(allOption);
  (tags || []).forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    if (selectedTag === tag) option.selected = true;
    tagSelect.appendChild(option);
  });
  tagSelect.addEventListener('change', e => onTagChange(e.target.value));

  // Priority filter
  const prioritySelect = document.createElement('select');
  prioritySelect.className = 'priority-select';
  prioritySelect.name = 'priority';
  const allPriority = document.createElement('option');
  allPriority.value = '';
  allPriority.textContent = 'All Priorities';
  prioritySelect.appendChild(allPriority);
  [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ].forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    if (priorityFilter === value) option.selected = true;
    prioritySelect.appendChild(option);
  });
  prioritySelect.addEventListener('change', e => onPriorityFilterChange(e.target.value));

  container.appendChild(filterSelect);
  container.appendChild(sortSelect);
  container.appendChild(tagSelect);
  container.appendChild(prioritySelect);
  return container;
} 