// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container > section, .homepage-container');
    const navLinks = document.querySelectorAll('nav a');
    const homepageSection = document.getElementById('homepage');
    const homestartLink = document.getElementById('home-start-link');
    const chatgptstartLink = document.getElementById('chatgpt-start-link');
    const homepageIntroSection = document.getElementById('homepage-intro');

    // Hide all sections initially
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the homepage section by default
    homepageSection.style.display = 'block'; // Or 'flex' if that's more appropriate
    document.querySelector('nav a[href="#homepage"]').classList.add('active-nav-link');

    if (homepageIntroSection) {
        homepageIntroSection.style.display = 'block'; // Adjust as needed
    }


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Find the nearest 'a' tag
            let targetLink = e.target;
            while (targetLink && targetLink.nodeName !== 'A') {
                targetLink = targetLink.parentNode;
            }

            if (!targetLink) return; // Exit if no link found

            const targetId = targetLink.getAttribute('href').substring(1);
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
            targetLink.classList.add('active-nav-link'); // Add active class to the clicked nav link

            // Special handling for homepage
            if (targetId === 'homepage') {
                const homepageIntroSection = document.getElementById('homepage-intro');
                if (homepageIntroSection) {
                    homepageIntroSection.style.display = 'block';
                }
            }
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
