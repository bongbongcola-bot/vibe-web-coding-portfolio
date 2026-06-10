document.addEventListener('DOMContentLoaded', () => {
  animateChartBars();
  highlightTopRank();
});

function animateChartBars() {
  const bars = document.querySelectorAll('.chart-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

function highlightTopRank() {
  const firstRow = document.querySelector('tbody tr:first-child');
  if (firstRow) {
    firstRow.style.background = 'linear-gradient(90deg,#1a2742,#1e3050)';
  }
}
