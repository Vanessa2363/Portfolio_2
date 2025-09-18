"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const typewriterConfiguration = [
        { text: "Vanessa Guo", elementId: "header-name-animate", delay: 0 },
        { text: "Developer, Designer, Trailblazer", elementId: "header-about-animate", delay: 1000 },
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
