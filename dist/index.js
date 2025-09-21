"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const typewriterConfiguration = [
        { text: "Vanessa", elementId: "header-first-animate", delay: 0 },
        { text: "Guo", elementId: "header-last-animate", delay: 500 },
        { text: "Developer & Designer", elementId: "header-about-animate", delay: 1000 },
    ];
    typewriterConfiguration.forEach(({ text, elementId, delay, speed = 80 }) => {
        const targetElement = document.getElementById(elementId);
        if (!targetElement)
            return;
        let chari = 0;
        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (chari < text.length) {
                    targetElement.innerHTML += text.charAt(chari);
                    chari++;
                }
                else {
                    clearInterval(typingInterval);
                }
            }, speed);
        }, delay);
    });
});
function animateLogos() {
    const logos = document.querySelectorAll('.logo-bg');
    logos.forEach((logo, index) => {
        setTimeout(() => {
            logo.classList.add('active');
        }, index * 200);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    animateLogos();
});
