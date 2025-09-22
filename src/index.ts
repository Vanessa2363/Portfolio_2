interface TypewriterConfig {
  text: string;
  elementId: string;
  delay: number;
  speed?: number;
}

function animateLogos(): void {
  const logos = document.querySelectorAll<HTMLDivElement>('.logo-bg');
  logos.forEach((logo, index) => {
    setTimeout(() => logo.classList.add('active'), index * 200);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const typewriterConfiguration: TypewriterConfig[] = [
    { text: 'Vanessa', elementId: 'header-first-animate', delay: 0 },
    { text: 'Guo', elementId: 'header-last-animate', delay: 500 },
    { text: 'Developer & Designer', elementId: 'header-about-animate', delay: 1000 },
  ];

  typewriterConfiguration.forEach(({ text, elementId, delay, speed = 80 }) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    let i = 0;
    setTimeout(() => {
      const timer = setInterval(() => {
        if (i < text.length) {
          el.textContent = (el.textContent || '') + text.charAt(i++);
        } else {
          clearInterval(timer);
        }
      }, speed);
    }, delay);
  });

  animateLogos();

  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.project-filters .filter-btn'));
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a'));
  const items   = Array.from(document.querySelectorAll<HTMLElement>('.project-grid > *'));

  const getCard = (item: HTMLElement): HTMLElement | null =>
    item.matches('.projects-card') ? item : (item.querySelector('.projects-card') as HTMLElement | null);

  const getTags = (item: HTMLElement): string[] => {
    const card = getCard(item);
    const ds = (card?.dataset.tags || '').toLowerCase().trim();
    return ds ? ds.split(/\s+/) : [];
  };

  const setActive = (el: HTMLElement) => {
    [...buttons, ...navLinks].forEach(b => b.classList.remove('is-active'));
    el.classList.add('is-active');

    [...buttons, ...navLinks].forEach(b =>
      b.setAttribute('aria-pressed', String(b.classList.contains('is-active')))
    );
  };

  const applyFilter = (key?: string) => {
    const f = (key || 'all').toLowerCase();
    items.forEach(item => {
      const tags = getTags(item);
      const matches = f === 'all' || tags.indexOf(f) !== -1;
      item.classList.toggle('hidden', !matches);
    });
  };

  const startBtn =
    buttons.find(b => b.classList.contains('is-active')) ||
    buttons.find(b => (b.dataset.filter || '') === 'all') ||
    buttons[0];

  if (startBtn) {
    setActive(startBtn);
    applyFilter(startBtn.dataset.filter);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn);
      applyFilter(btn.dataset.filter);
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const text = (link.textContent || '').trim().toLowerCase();

      let filterKey = text;
      if (text === 'home') filterKey = 'all';
      if (text === 'resume') filterKey = 'none';

      setActive(link);
      applyFilter(filterKey);
    });
  });
});
