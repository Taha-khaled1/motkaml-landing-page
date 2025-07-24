/**
 * MOTKAML LANDING PAGE - MAIN JAVASCRIPT
 * =====================================
 */

// Modular sections are loaded via script tags

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Motkaml Landing Page - JavaScript Loaded');
    
    // Initialize all components
    initializeComponents();
});

/**
 * Initialize all JavaScript components
 */
function initializeComponents() {
    // Initialize AOS (Animate On Scroll)
    initializeAOS();
    
    // Initialize smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize modular sections
    initializeModularSections();
    
    // Initialize form handlers (when forms are added)
    // initializeFormHandlers();
    
    // Initialize mobile menu toggle (when navigation is added)
    // initializeMobileMenu();
}

/**
 * Initialize AOS (Animate On Scroll) library
 */
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
        console.log('AOS initialized successfully');
    } else {
        console.warn('AOS library not loaded');
    }
}

/**
 * Initialize modular sections
 */
function initializeModularSections() {
    // Sections are auto-initialized in their respective files
    // This function can be used for additional coordination
    console.log('Modular sections initialized');
    
    // Example: Coordinate animations between sections
    setTimeout(() => {
        if (window.heroSection) {
            window.heroSection.triggerAnimations();
        }
    }, 500);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Utility function to add loading state to buttons
 */
function addLoadingState(button, loadingText = 'جاري التحميل...') {
    const originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
    button.classList.add('loading');
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    };
}

/**
 * Utility function to show notifications
 */
function showNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--${type === 'success' ? 'success' : type === 'error' ? 'accent' : 'info'}-color);
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
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
    }, duration);
}

/**
 * Utility function to validate email
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Utility function to validate phone number (Arabic/International)
 */
function validatePhone(phone) {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a valid length (8-15 digits)
    return cleanPhone.length >= 8 && cleanPhone.length <= 15;
}

/**
 * Utility function to format numbers in Arabic
 */
function formatArabicNumber(number) {
    const arabicNumbers = '٠١٢٣٤٥٦٧٨٩';
    return number.toString().replace(/[0-9]/g, function(w) {
        return arabicNumbers[+w];
    });
}

/**
 * Utility function to handle API calls
 */
async function apiCall(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, mergedOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility function to throttle function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Global utilities object for easy access
window.MotkamlUtils = {
    addLoadingState,
    showNotification,
    validateEmail,
    validatePhone,
    formatArabicNumber,
    apiCall,
    debounce,
    throttle
};

// Example usage and testing (can be removed in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode - Motkaml utilities loaded:', window.MotkamlUtils);
} 