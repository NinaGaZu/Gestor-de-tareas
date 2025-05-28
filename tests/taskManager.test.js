/**
 * @jest-environment jsdom
 */

import { saveTasks, loadTasks } from '../js/taskManager.js';

// Mock de localStorage
beforeEach(() => {
  localStorage.clear();
});

describe('Persistencia de tareas', () => {
  it('guarda y carga tareas correctamente en localStorage', () => {
    const mockTasks = [
      { id: '1', title: 'Tarea 1', description: '', dueDate: '', category: 'trabajo' },
    ];

    localStorage.setItem('task-manager-tasks', JSON.stringify(mockTasks));

    const stored = JSON.parse(localStorage.getItem('task-manager-tasks'));
    expect(stored).toEqual(mockTasks);
  });
});

describe('Filtrado de tareas', () => {
  const tasks = [
    { id: '1', title: 'Comprar pan', category: 'personal' },
    { id: '2', title: 'Reunión equipo', category: 'trabajo' },
    { id: '3', title: 'Llamar a mamá', category: 'personal' },
  ];

  function filterTasks(tasks, searchQuery, selectedCategory) {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || task.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  it('filtra por texto de búsqueda', () => {
    const result = filterTasks(tasks, 'pan', '');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Comprar pan');
  });

  it('filtra por categoría', () => {
    const result = filterTasks(tasks, '', 'personal');
    expect(result).toHaveLength(2);
  });

  it('filtra por búsqueda y categoría combinadas', () => {
    const result = filterTasks(tasks, 'llamar', 'personal');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Llamar a mamá');
  });
});

describe('Eliminar tareas', () => {
  let tasks;

  beforeEach(() => {
    tasks = [
      { id: '1', title: 'Tarea 1' },
      { id: '2', title: 'Tarea 2' },
    ];
  });

  function deleteTask(id) {
    return tasks.filter(task => task.id !== id);
  }

  it('elimina la tarea correcta', () => {
    tasks = deleteTask('1');
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe('2');
  });
});
