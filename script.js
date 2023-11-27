// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container > section, .homepage-container');
    const navLinks = document.querySelectorAll('nav a');
    const homepageSection = document.getElementById('homepage');
    const homestartLink = document.getElementById('home-start-link');
    const chatgptstartLink = document.getElementById('chatgpt-start-link');

    // Hide all sections initially
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the homepage section by default
    homepageSection.style.display = 'block'; // Or 'flex' if that's more appropriate
    document.querySelector('nav a[href="#homepage"]').classList.add('active-nav-link');


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(section => {
                section.style.display = 'none'; // Hide all sections
            });
            navLinks.forEach(navLink => {
                navLink.classList.remove('active-nav-link'); // Remove active class from all nav links
            });

            // Set display based on a class or other identifier
            if (targetId === 'chatgpt-prompts') {
                targetSection.style.display = 'flex';
            } else {
                targetSection.style.display = 'block';
            }
            e.target.classList.add('active-nav-link'); // Add active class to the clicked nav link
        });
    });

    // Select the start sidebar link
    if (chatgptstartLink) {
        chatgptstartLink.click();
    }
    // Select the start sidebar link
    if (homestartLink) {
        homestartLink.click();
    }
});
