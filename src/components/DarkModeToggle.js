// DarkModeToggle.js
export function DarkModeToggle({ mode, onToggle }) {
  const btn = document.createElement('button');
  btn.className = 'dark-mode-toggle';
  btn.textContent = mode === 'dark' ? '🌙 Dark' : '☀️ Light';
  btn.title = 'Toggle dark mode';
  btn.style.alignSelf = 'flex-end';
  btn.style.marginBottom = '8px';
  btn.addEventListener('click', () => {
    onToggle(mode === 'dark' ? 'light' : 'dark');
  });
  return btn;
} 