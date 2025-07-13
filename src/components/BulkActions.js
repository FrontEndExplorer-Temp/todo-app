// BulkActions.js
export function BulkActions({ hasCompleted, onClearCompleted }) {
  const container = document.createElement('div');
  container.className = 'bulk-actions';
  container.style.display = 'flex';
  container.style.justifyContent = 'flex-end';
  container.style.marginBottom = '8px';

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Completed';
  clearBtn.className = 'clear-completed-btn';
  clearBtn.disabled = !hasCompleted;
  clearBtn.title = hasCompleted ? 'Remove all completed tasks' : 'No completed tasks to clear';
  clearBtn.addEventListener('click', () => {
    if (hasCompleted) onClearCompleted();
  });

  container.appendChild(clearBtn);
  return container;
} 