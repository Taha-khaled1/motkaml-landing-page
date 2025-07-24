// Header Section JavaScript
class Header {
    constructor() {
        this.header = document.querySelector('.header-section');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupActiveLinks();
        this.setupSmoothScrolling();
        this.setupKeyboardNavigation();
    }

    setupMobileMenu() {
        if (!this.mobileToggle || !this.mobileNav) return;

        // Toggle mobile menu
        this.mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close immediately if it's a hash link, let smooth scroll happen first
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 100);
                } else {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside (with debounce)
        let clickTimeout;
        document.addEventListener('click', (e) => {
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                if (!this.mobileNav.contains(e.target) && 
                    !this.mobileToggle.contains(e.target) && 
                    this.mobileNav.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            }, 50);
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileNav.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991.98) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const isActive = this.mobileNav.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileToggle.classList.add('active');
        this.mobileNav.classList.add('active');
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        
        // Focus first menu item for accessibility
        const firstLink = this.mobileNav.querySelector('.mobile-nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 300);
        }
    }

    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.mobileNav.classList.remove('active');
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore body scroll
    }

    setupScrollEffects() {
        if (!this.header) return;

        let ticking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class when scrolled down
            if (currentScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Hide/show header on scroll (optional)
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                // Scrolling down - hide header
                this.header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                this.header.style.transform = 'translateY(0)';
            }

            this.lastScrollY = currentScrollY;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupActiveLinks() {
        if (this.navLinks.length === 0) return;

        // Get all sections
        const sections = Array.from(document.querySelectorAll('section[id]'));
        
        if (sections.length === 0) return;

        let ticking = false;

        const updateActiveLinks = () => {
            const scrollPosition = window.scrollY + 100; // Offset for header height

            let currentSection = '';

            // Find current section
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Update active links
            this.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    
                    if (targetId === currentSection) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveLinks);
                ticking = true;
            }
        };

        // Update on scroll
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Update on load
        updateActiveLinks();
    }

    setupSmoothScrolling() {
        // Handle smooth scrolling for anchor links
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        this.closeMobileMenu();
                        
                        // Calculate offset for fixed header
                        const headerHeight = this.header ? this.header.offsetHeight : 80;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        // Smooth scroll to target
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without triggering scroll
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                });
            }
        });
    }

    setupKeyboardNavigation() {
        // Handle keyboard navigation in mobile menu
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        mobileNavLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (!this.mobileNav.classList.contains('active')) return;
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = (index + 1) % mobileNavLinks.length;
                        mobileNavLinks[nextIndex].focus();
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevIndex = (index - 1 + mobileNavLinks.length) % mobileNavLinks.length;
                        mobileNavLinks[prevIndex].focus();
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        mobileNavLinks[0].focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        mobileNavLinks[mobileNavLinks.length - 1].focus();
                        break;
                }
            });
        });
    }

    // Public methods for external use
    showHeader() {
        if (this.header) {
            this.header.style.transform = 'translateY(0)';
        }
    }

    hideHeader() {
        if (this.header) {
            this.header.style.transform = 'translateY(-100%)';
        }
    }

    isMenuOpen() {
        return this.mobileNav && this.mobileNav.classList.contains('active');
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.headerInstance = new Header();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
} 