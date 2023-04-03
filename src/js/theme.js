const appearance = document.querySelector('.appearance');

appearance.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  this.classList.toggle('switch');
});
