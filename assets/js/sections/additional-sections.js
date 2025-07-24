// Additional Sections JavaScript
class AdditionalSections {
    constructor() {
        this.init();
    }

    init() {
        this.setupFAQ();
        this.setupScrollAnimations();
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    setupScrollAnimations() {
        // Add smooth scrolling for anchor links
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdditionalSections();
});

// Add CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
    .faq-answer {
        transition: max-height 0.3s ease, padding 0.3s ease;
    }
    
    .faq-item.active .faq-answer {
        transition: max-height 0.3s ease, padding 0.3s ease;
    }
`;

document.head.appendChild(style); 