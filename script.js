// Function to toggle the hamburger menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Enhanced tab switching function
function openTab(tabName) {
    // Hide all tab content first
    const tabContents = document.querySelectorAll('.tab-data');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
        tab.style.opacity = '0';
    });
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.style.display = 'block';
        selectedTab.style.opacity = '1';
        
        // Force a repaint to ensure the transition takes effect
        setTimeout(() => {
            selectedTab.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Add active class to the clicked button
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else {
        // If no event (e.g., called programmatically), find the button by its onclick attribute
        const button = document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
        if (button) button.classList.add('active');
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set education tab as active by default
    const educationTab = document.getElementById('education');
    if (educationTab) {
        educationTab.classList.add('active');
        educationTab.style.display = 'block';
    }
    
    // Hide clubs tab by default
    const clubsTab = document.getElementById('clubs');
    if (clubsTab) {
        clubsTab.classList.remove('active');
        clubsTab.style.display = 'none';
    }
    
    // Make sure the education button is active
    const educationButton = document.querySelector('.tab-btn[onclick="openTab(\'education\')"]');
    if (educationButton) {
        educationButton.classList.add('active');
    }
    
    // Set up scroll animations
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
        // Elements to animate when scrolled into view
        const elementsToAnimate = [
            aboutSection.querySelector('.about-title'),
            aboutSection.querySelector('.about-pic-container'),
            aboutSection.querySelector('.about-text-container'),
            aboutSection.querySelector('.about-text-container h2'),
            aboutSection.querySelector('.about-text-container p'),
            aboutSection.querySelector('.about-details-container')
        ];
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When about section comes into view
                if (entry.isIntersecting) {
                    // Add animation classes with staggered delays
                    elementsToAnimate.forEach((element, index) => {
                        if (element) {
                            // Slight delay between elements to create cascade effect
                            setTimeout(() => {
                                element.classList.add('animate');
                            }, index * 150);
                        }
                    });
                    
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // Element must be 20% visible before triggering
            threshold: 0.2
        });
        
        // Start observing the about section
        observer.observe(aboutSection);
    }
});