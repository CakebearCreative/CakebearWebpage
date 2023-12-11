// script.js

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container > section, .homepage-container');
    const navLinks = document.querySelectorAll('nav a');

    function showSectionById(sectionId) {
        sections.forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });

        // Special handling for homepage
        if (sectionId === 'homepage') {
            const homepageIntroSection = document.getElementById('homepage-intro');
            if (homepageIntroSection) {
                homepageIntroSection.style.display = 'block';
            }
        }

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            //targetSection.style.display = 'block'; // Or 'flex' for flex sections
            if (sectionId === 'chatgpt-prompts' || sectionId ==='guides') {
                targetSection.style.display = 'flex';
            } else {
                targetSection.style.display = 'block';
            }
            //targetSection.style.display = (sectionId === 'chatgpt-prompts') ? 'flex' : 'block';
        }
    }

    // Retrieve the saved link from sessionStorage
    const savedLink = sessionStorage.getItem('activeNavLink');
    console.log('sessionStorage activeNavLink savedLink: ',savedLink)

    if (savedLink) {
        const savedNavLink = document.querySelector(`nav a[href="${savedLink}"]`);
        if (savedNavLink) {
        //    savedNavLink.classList.add('active-nav-link');
        //    // Extract section ID from the href and show the section
        //    const sectionId = savedLink.substring(1); // Remove '#' from href
        //    showSectionById(sectionId);
        navLinks.forEach(navLink => {
            navLink.classList.toggle('active-nav-link', navLink.getAttribute('href') === savedLink);
        });
        showSectionById(savedLink.substring(1)); // Remove '#' from href
        sessionStorage.removeItem('activeNavLink'); // Clear after use
        }
    } else {
        // Default behavior if no link is saved
        const defaultNavLink = document.querySelector('nav a[href="#homepage"]');
        if (defaultNavLink) {
            defaultNavLink.classList.add('active-nav-link')
        }
        showSectionById('homepage');
    }


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            
            let targetLink = e.target.closest('a');
            if (!targetLink) return; // Exit if no link found

            // Only prevent default if the link is an internal section link
            if (targetLink.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const sectionId = targetLink.getAttribute('href').substring(1);
                showSectionById(sectionId);
                // ... rest of the code ...
            }

            // Save the active link to localStorage
            console.log('Updated activeNavLink: ',targetLink.getAttribute('href'))
            sessionStorage.setItem('activeNavLink', targetLink.getAttribute('href'));

            console.log('targetLink: ',targetLink)

            // Update active nav link class
            navLinks.forEach(navLink => {
                navLink.classList.toggle('active-nav-link', navLink === targetLink);
            });

        });
    });

    // Check for a hash in the URL
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1); // Remove '#' from hash
        console.log('showSectById',sectionId);
        showSectionById(sectionId);

        const activeNavLink = document.querySelector(`nav a[href="${hash}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active-nav-link');
            sessionStorage.setItem('activeNavLink', hash);
        }
    }

    const targetSection = sessionStorage.getItem('targetSection');
    if (targetSection) {
        showSectionById(targetSection);
        // Update active nav link class
        navLinks.forEach(navLink => {
            //navLink.classList.toggle('active-nav-link', navLink.href === sessionStorage.getItem('targetLinkguide'));
            navLink.classList.toggle('active-nav-link', navLink.getAttribute('href').endsWith('#' + targetSection));
            console.log('navLink',navLink.getAttribute('href'));
            console.log('targetSection',targetSection);
            //console.log('targetLinkguide',sessionStorage.getItem('targetLinkguide'));
        });

        sessionStorage.removeItem('targetSection'); // Clear after use
    }


    
    const banner = document.querySelector('.banner');
    const navigation = document.querySelector('nav');
    const navPlaceholder = document.querySelector('.nav-placeholder');
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const containerChatgptTitleContent = document.querySelector('.container-chatgpt-title-content');
    const pointToFixMenuButton = banner.offsetHeight + navigation.offsetHeight;
    //const pointToFixMenuButton = banner.offsetHeight;
    let pointToFixNav = banner.offsetHeight;
    const menuOffsetY = 30;
    const menuButtonGuides = document.querySelector('.menu-button-guides');
    const sidebarGuides = document.querySelector('.sidebar-guides');
    const guideContentContainer = document.querySelector('.guide-content-container'); // Update if you have a specific container for Guides
    const guideFull = document.querySelector('#guide-full');
    let isItialSet = true;
    

    // Function to set the height of the nav placeholder
    function setNavPlaceholderHeight() {
        const navHeight = navigation.offsetHeight;
        let addOffset = 0;

        if (isItialSet) {
            addOffset = 24;
            isItialSet = false;
        }
        navPlaceholder.style.height = navHeight + addOffset + 'px';
        console.log(`navHeight: ${navHeight}, navPlaceholder Height: ${navPlaceholder.style.height}`);
    }
    function calculatePointToFixNav() {
        const bannerHeight = banner.offsetHeight;
        return bannerHeight; // Modify this if you need to add any additional offset
    }

    // Set the initial height
    pointToFixNav = calculatePointToFixNav();
    setNavPlaceholderHeight();

    window.addEventListener('scroll', () => {

        pointToFixNav = calculatePointToFixNav();

        if (window.scrollY < (pointToFixMenuButton+menuOffsetY-8)) {
            const offsetDist = (pointToFixMenuButton - window.scrollY + menuOffsetY) + 'px';
            if (menuButton) { menuButton.style.top = offsetDist; }
            if (menuButtonGuides) { menuButtonGuides.style.top = offsetDist; } 
            if (sidebar) { sidebar.style.top = offsetDist; }
            if (sidebarGuides) { sidebarGuides.style.top = offsetDist; }
            console.log('Scroll should offset menu')
        } else {
            if (menuButton) { menuButton.style.top = '10px'; }
            console.log('No offset of menu')
        }

        if (window.innerWidth < 768) { // Apply only for smaller screens
            //if (window.scrollY < (pointToFixMenuButton + menuOffsetY - 8)) {
            if (window.scrollY < (pointToFixNav)) {
                //sidebar.style.top = (pointToFixMenuButton - window.scrollY + menuOffsetY) + 'px';
                //sidebar.style.top = (pointToFixNav - window.scrollY) + 'px';
            } else {
                const navOffset = navigation.offsetHeight + 10 + 'px';
                if (sidebar) { sidebar.style.top = navOffset; }
                if (sidebarGuides) { sidebarGuides.style.top = navOffset; }
                if (menuButton) { menuButton.style.top = navOffset; }
                if (menuButtonGuides) { menuButtonGuides.style.top = navOffset; }
            }

        }

        
        if (window.scrollY > pointToFixNav) {
            navigation.classList.add('fixed');
            navPlaceholder.style.display = 'block';
        } else {
            navigation.classList.remove('fixed');
            navPlaceholder.style.display = 'none';
        }

    });


    if (menuButton && sidebar) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuButton.classList.toggle('active');
            containerChatgptTitleContent.classList.toggle('menu-active');
            console.log('Sidebar toggled!')
        });
    }


    if (menuButtonGuides && sidebarGuides) {
        menuButtonGuides.addEventListener('click', () => {
            sidebarGuides.classList.toggle('active');
            menuButtonGuides.classList.toggle('active');
            if (guideContentContainer) {
                guideContentContainer.classList.toggle('menu-active');
            }
            if (guideFull) {
                guideFull.classList.toggle('menu-active');
            }
            console.log('Guides Sidebar toggled!');
        });
    }


    // Set the initial height
    //setNavPlaceholderHeight();
    pointToFixNav = calculatePointToFixNav();


    // Set placeholder height on window resize as well
    window.addEventListener('resize', () => {
        setNavPlaceholderHeight();
        pointToFixNav = calculatePointToFixNav();
        console.log(`Resized: pointToFixNav: ${pointToFixNav}`);
    });

//
});
