const appearance = document.querySelector('.appearance');

const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';

if (isDarkTheme) {
  document.body.classList.add('dark-theme');
  appearance.classList.add('switch');
}

appearance.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  this.classList.toggle('switch');
  const isDarkTheme = document.body.classList.contains('dark-theme');
  localStorage.setItem('isDarkTheme', isDarkTheme);
});
