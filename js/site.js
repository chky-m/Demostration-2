document.querySelectorAll('[data-year]').forEach(year => {
  year.textContent = new Date().getFullYear();
});

document.querySelectorAll('.faq-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    answer.hidden = isOpen;
    button.querySelector('[aria-hidden]').textContent = isOpen ? '+' : '−';
  });
});
