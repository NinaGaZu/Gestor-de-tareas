import { enableDragAndDrop }  from "./dragDrop.js";

const STORAGE_KEY = 'task-manager-tasks';
let tasks = [];

function setupForm() {
  const form = document.getElementById('task-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const dueDate = form['due-date'].value;
    const category = form.category.value;

    if (!title) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      category
    };

    tasks.push(newTask);
    saveTasks();
    renderTask();
    form.reset();
  });
}

function renderTask(){
  const list = document.getElementById('task-list');
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const selectedCategory = document.getElementById('filter-category').value;
  
  list.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery) ||
                          (task.description && task.description.toLowerCase().includes(searchQuery));
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  filteredTasks.forEach(task => {
    const item = document.createElement('div');
    item.className = 'task-item';
    item.draggable = true;
    item.dataset.id = task.id;

    item.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || ''}</p>
      ${task.dueDate ? `<p><strong>Vence:</strong> ${task.dueDate}</p>` : ''}
      ${task.category ? `<p><strong>Categoría:</strong> ${task.category}</p>` : ''}
      <button aria-label = "Eliminar tarea" data-id = "${task.id}">🗑️</button>
      `;

    item.querySelector('button').addEventListener('click', () => {
      deleteTask(task.id);
    });

    list.appendChild(item);
    });

    enableDragAndDrop('#task-list', updateTaskOrder);
}

function updateTaskOrder(newOrder) {
  tasks.sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
  saveTasks();
}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTask();
}

function saveTasks(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks(){
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) tasks = JSON.parse(data);
}

export function initTaskManager(){
  loadTasks();
  renderTask();
  setupForm();
  document.getElementById('search').addEventListener('input', renderTask);
  document.getElementById('filter-category').addEventListener('change', renderTask);

}

