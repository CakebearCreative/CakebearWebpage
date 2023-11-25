// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(section => {
                section.style.display = 'none'; // Hide all sections
            });

            // Set display based on a class or other identifier
            if (targetId === 'chatgpt-prompts') {
                targetSection.style.display = 'flex';
            } else {
                targetSection.style.display = 'block';
            }
        });
    });
});
