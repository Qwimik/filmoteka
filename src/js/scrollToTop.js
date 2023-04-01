// Функція для переміщення наверх пошукового запиту сторінки
export function scrollToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
