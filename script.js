// ─── Mermaid Initialization ───
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#EAF0EC',
    primaryTextColor: '#1A1816',
    primaryBorderColor: '#3B6D4A',
    lineColor: '#8C877D',
    secondaryColor: '#F9F7F3',
    tertiaryColor: '#F2F0EB',
    fontSize: '13px',
    fontFamily: 'Geist, sans-serif',
  },
  flowchart: { curve: 'basis', padding: 20 },
  classDiagram: { useMaxWidth: true },
});

// ─── Tooltip Generation ───
document.querySelectorAll('.term').forEach(el => {
  const tip = document.createElement('span');
  tip.className = 'term-tooltip';

  let html = '';
  if (el.dataset.term) {
    html += `<div class="tooltip-title">${el.dataset.term}</div>`;
  }
  html += el.dataset.definition || '';
  if (el.dataset.wiki) {
    html += `<a class="wiki-link" href="${el.dataset.wiki}" target="_blank" rel="noopener noreferrer">→ Read more on Wikipedia</a>`;
  }
  tip.innerHTML = html;
  el.appendChild(tip);
});

// ─── Mobile Tap Support for Tooltips ───
let activeTooltip = null;
document.addEventListener('touchstart', (e) => {
  const term = e.target.closest('.term');
  if (term) {
    e.preventDefault();
    if (activeTooltip && activeTooltip !== term) {
      activeTooltip.classList.remove('tooltip-active');
    }
    term.classList.toggle('tooltip-active');
    activeTooltip = term.classList.contains('tooltip-active') ? term : null;
  } else {
    if (activeTooltip) {
      activeTooltip.classList.remove('tooltip-active');
      activeTooltip = null;
    }
  }
});

// ─── Reading Progress Bar ───
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}, { passive: true });

// ─── Jump Nav Active State ───
const jumpNavLinks = document.querySelectorAll('.jump-nav a');
const sections = [
  'section-problem', 'section-architecture', 'section-phase1',
  'section-phase2', 'section-phase3', 'section-phase4',
  'section-phase5', 'section-takeaways'
];

function updateJumpNav() {
  const scrollY = window.scrollY + 200;
  let currentSection = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) {
      currentSection = id;
    }
  });
  jumpNavLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === currentSection);
  });
}

window.addEventListener('scroll', updateJumpNav, { passive: true });
updateJumpNav();
