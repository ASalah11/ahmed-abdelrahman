document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Show more publications
    const showMorePubsButton = document.getElementById('show-more-pubs');
    const morePublicationsContainer = document.getElementById('more-publications');

    if (showMorePubsButton && morePublicationsContainer) {
        showMorePubsButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            morePublicationsContainer.classList.toggle('hidden');
            
            if (morePublicationsContainer.classList.contains('hidden')) {
                this.innerHTML = '<span>Show More Publications</span><i class="fas fa-chevron-down ml-2"></i>';
            } else {
                this.innerHTML = '<span>Show Less</span><i class="fas fa-chevron-up ml-2"></i>';
            }
        });
    }

    // Smooth scrolling for navigation links and active state
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element with offset for fixed header
                const headerOffset = 64; // Height of your fixed navigation bar
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active nav indicator
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active-nav');
                });
                this.classList.add('active-nav');
            }
        });
    });

    // Intersection Observer for highlighting active nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Adjust this margin to control when the section becomes "active"
        threshold: 0 // We're using rootMargin to determine active state
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href').includes(currentSectionId)) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
