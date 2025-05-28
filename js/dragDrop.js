// dragDrop.js

export function enableDragAndDrop(containerSelector, onReorder) {
  const container = document.querySelector(containerSelector);
  let draggedItem = null;

  container.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('task-item')) {
      draggedItem = e.target;
      e.target.classList.add('dragging');
    }
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    if (afterElement == null) {
      container.appendChild(draggedItem);
    } else {
      container.insertBefore(draggedItem, afterElement);
    }
  });

  container.addEventListener('drop', () => {
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
      draggedItem = null;
      onReorder(getNewOrder(container));
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  function getNewOrder(container) {
    return [...container.querySelectorAll('.task-item')].map(el => el.dataset.id);
  }
}
