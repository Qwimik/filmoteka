// Функція для прокрутки у верх
const button = document.querySelector('.up_btn');

// Відображаємо кнопку коли користувач проскролив сторінку більше чим на 500 пікселей
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
});

// Прокручуємо сторінку у верх по кліку
button.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
  });
});
