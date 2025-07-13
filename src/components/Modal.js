// Modal.js
export function Modal({ content, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.3)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '2000';

  const modal = document.createElement('div');
  modal.className = 'modal-content';
  modal.style.background = '#fff';
  modal.style.padding = '24px';
  modal.style.borderRadius = '12px';
  modal.style.minWidth = '320px';
  modal.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
  modal.style.position = 'relative';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.className = 'modal-close';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '12px';
  closeBtn.style.right = '12px';
  closeBtn.style.fontSize = '1.5rem';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.cursor = 'pointer';
  closeBtn.addEventListener('click', () => {
    overlay.remove();
    if (onClose) onClose();
  });

  modal.appendChild(closeBtn);
  modal.appendChild(content);
  overlay.appendChild(modal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.remove();
      if (onClose) onClose();
    }
  });

  return overlay;
} 