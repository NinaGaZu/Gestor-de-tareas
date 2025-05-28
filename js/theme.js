const THEME_KEY = 'task-manager-theme';

export function initThemeToggle(){
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem(THEME_KEY) || 'light';

  //Establece el tema al cargar
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}