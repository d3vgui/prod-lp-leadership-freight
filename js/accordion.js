const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  const header = accordion.querySelector('.accordion-header');
  const content = accordion.querySelector('.accordion-content');

  header.addEventListener('click', () => {
    const isOpen = content.style.maxHeight;

    // Fecha todos os outros accordions
    accordions.forEach((other) => {
      const otherHeader = other.querySelector('.accordion-header');
      const otherContent = other.querySelector('.accordion-content');

      if (otherContent !== content) {
        otherContent.style.maxHeight = null;
        otherHeader.classList.remove('active');
      }
    });

    // Alterna o accordion atual
    if (isOpen) {
      content.style.maxHeight = null;
      header.classList.remove('active');
    } else {
      const inner = content.querySelector('.accordion-inner');
      content.style.maxHeight = inner.scrollHeight + 'px';
      header.classList.add('active');
    }
  });
});



