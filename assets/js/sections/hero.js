/**
 * HERO SECTION JAVASCRIPT
 * =======================
 */

// Hero Section Controller
class HeroSection {
    constructor() {
        this.init();
    }

    init() {
        this.setupVideoBackground();
        this.setupScrollIndicator();
        this.setupCTAButtons();
        this.setupFloatingAnimations();
        this.setupParallaxEffect();
        this.setupTypingEffect();
        this.setupCounterAnimations();
        
        console.log('Hero Section initialized');
    }

    setupVideoBackground() {
        const video = document.querySelector('.hero-video-background video');
        if (!video) return;

        // Ensure video plays on mobile
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(error => {
                console.log('Video autoplay prevented:', error);
                // Fallback: Show static background
                this.showStaticBackground();
            });
        });

        // Handle video loading errors
        video.addEventListener('error', () => {
            console.log('Video failed to load, showing static background');
            this.showStaticBackground();
        });

        // Pause video when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                video.pause();
            } else {
                video.play().catch(() => {});
            }
        });
    }

    showStaticBackground() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)';
        }
    }

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', () => {
            const themeSection = document.querySelector('#theme-showcase');
            if (themeSection) {
                themeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Hide scroll indicator when scrolling
        let scrollTimer;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }

    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.hero-cta .btn');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Check if button has WhatsApp link - if so, let it work normally
                if (button.href && button.href.includes('wa.me')) {
                    // Just add click animation and let the link work
                    button.style.transform = 'translateY(-3px) scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = 'translateY(-3px) scale(1)';
                    }, 150);
                    // Don't prevent default - let WhatsApp link work
                    return;
                }

                // Add click animation for non-WhatsApp buttons
                button.style.transform = 'translateY(-3px) scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'translateY(-3px) scale(1)';
                }, 150);

                // Handle different button actions (only for non-WhatsApp buttons)
                if (button.classList.contains('cta-primary')) {
                    this.handleFreeTrial(e);
                } else if (button.classList.contains('cta-secondary')) {
                    this.handleViewThemes(e);
                }
            });

            // Add hover sound effect (optional)
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    handleFreeTrial(e) {
        // Don't prevent default if it's a WhatsApp link
        const button = e.target.closest('.btn');
        if (button.href && button.href.includes('wa.me')) {
            return; // Let WhatsApp link work
        }
        e.preventDefault();
        
        // Show loading state
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري التحميل...';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show success message
            this.showNotification('تم إنشاء حسابك التجريبي بنجاح!', 'success');
            
            // Here you would typically redirect to signup page
            // window.location.href = '/signup';
        }, 2000);
    }

    handleViewThemes(e) {
        // Don't prevent default if it's a WhatsApp link
        const button = e.target.closest('.btn');
        if (button.href && button.href.includes('wa.me')) {
            return; // Let WhatsApp link work
        }
        e.preventDefault();
        const themeSection = document.querySelector('#theme-showcase');
        if (themeSection) {
            themeSection.scrollIntoView({ behavior: 'smooth' });
            
            // Add highlight effect to theme section
            setTimeout(() => {
                themeSection.style.boxShadow = '0 0 30px rgba(16, 95, 170, 0.3)';
                setTimeout(() => {
                    themeSection.style.boxShadow = 'none';
                }, 2000);
            }, 1000);
        }
    }

    setupFloatingAnimations() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            // Add random floating animation
            const randomDelay = Math.random() * 2;
            const randomDuration = 3 + Math.random() * 2;
            
            card.style.animationDelay = `${randomDelay}s`;
            card.style.animationDuration = `${randomDuration}s`;
            
            // Add hover interaction
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.05)';
                card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            });
        });
    }

    setupParallaxEffect() {
        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rate = scrollY * -0.5;
            
            heroVisual.style.transform = `translateY(${rate}px)`;
        });
    }

    setupTypingEffect() {
        const titleElements = document.querySelectorAll('.hero-title span');
        if (titleElements.length === 0) return;

        // Add typing effect to title
        titleElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderLeft = '2px solid #FFD700';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    element.style.borderLeft = 'none';
                    
                    // Start next element
                    if (index < titleElements.length - 1) {
                        setTimeout(() => {
                            this.typeText(titleElements[index + 1]);
                        }, 200);
                    }
                }
            }, 50);
        });
    }

    typeText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderLeft = '2px solid #FFD700';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                element.style.borderLeft = 'none';
            }
        }, 50);
    }

    setupCounterAnimations() {
        const trustItems = document.querySelectorAll('.trust-item');
        
        trustItems.forEach(item => {
            const text = item.querySelector('span').textContent;
            const numbers = text.match(/\d+/g);
            
            if (numbers) {
                const number = parseInt(numbers[0]);
                this.animateCounter(item.querySelector('span'), number, text);
            }
        });
    }

    animateCounter(element, target, originalText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 100;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(counter);
                        }
                        
                        element.textContent = originalText.replace(target.toString(), Math.floor(current).toString());
                    }, 20);
                    
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--${type === 'success' ? 'success' : 'info'}-color);
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            font-family: 'Cairo', sans-serif;
            font-weight: 600;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    triggerAnimations() {
        // Trigger hero animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-fadeInUp');
        }
    }
}

// Initialize Hero Section
document.addEventListener('DOMContentLoaded', () => {
    window.heroSection = new HeroSection();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroSection;
} 