"use strict";
function animateLogos() {
    const logos = document.querySelectorAll('.logo-bg');
    logos.forEach((logo, index) => {
        setTimeout(() => logo.classList.add('active'), index * 200);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const typewriterConfiguration = [
        { text: 'Vanessa', elementId: 'header-first-animate', delay: 0 },
        { text: 'Guo', elementId: 'header-last-animate', delay: 500 },
        { text: 'Developer & Designer', elementId: 'header-about-animate', delay: 1000 },
    ];
    typewriterConfiguration.forEach(({ text, elementId, delay, speed = 80 }) => {
        const el = document.getElementById(elementId);
        if (!el)
            return;
        let i = 0;
        setTimeout(() => {
            const timer = setInterval(() => {
                if (i < text.length) {
                    el.textContent = (el.textContent || '') + text.charAt(i++);
                }
                else {
                    clearInterval(timer);
                }
            }, speed);
        }, delay);
    });
    animateLogos();
    const buttons = Array.from(document.querySelectorAll('.project-filters .filter-btn'));
    const items = Array.from(document.querySelectorAll('.project-grid > *'));
    const getCard = (item) => item.matches('.projects-card') ? item : item.querySelector('.projects-card');
    const getTags = (item) => {
        const card = getCard(item);
        const ds = ((card === null || card === void 0 ? void 0 : card.dataset.tags) || '').toLowerCase().trim();
        return ds ? ds.split(/\s+/) : [];
    };
    const setActive = (el) => {
        [...buttons, ...Array.from(document.querySelectorAll('.nav a'))].forEach(b => b.classList.remove('is-active'));
        el.classList.add('is-active');
        [...buttons, ...Array.from(document.querySelectorAll('.nav a'))].forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('is-active'))));
    };
    const applyFilter = (key) => {
        const f = (key || 'all').toLowerCase();
        items.forEach(item => {
            const tags = getTags(item);
            const matches = f === 'all' || tags.indexOf(f) !== -1;
            item.classList.toggle('hidden', !matches);
        });
    };
    const startBtn = buttons.find(b => b.classList.contains('is-active')) ||
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
    const navLinks = Array.from(document.querySelectorAll('.nav a')).filter(a => {
        const href = a.getAttribute('href') || '';
        const isExternal = /^https?:/i.test(href) || href.startsWith('mailto:') || a.target === '_blank';
        const isIconLink = !!a.querySelector('.nav-icon');
        return !isExternal && !isIconLink;
    });
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const text = (link.textContent || '').trim().toLowerCase();
            if (text === 'resume') {
                e.preventDefault();
                window.open('public/Vanessa_Guo_Resume.pdf', '_blank', 'noopener');
                return;
            }
            e.preventDefault();
            const filterKey = text === 'home' ? 'all' : text;
            setActive(link);
            applyFilter(filterKey);
        });
    });
});
