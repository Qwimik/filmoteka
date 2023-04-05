export function hideScroll() {
  document.querySelector('html').style.overflow = 'hidden';
}

export function showScroll() {
  document.querySelector('html').style.overflow = null;
}
