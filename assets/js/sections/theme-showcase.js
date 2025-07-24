// Theme Showcase JavaScript
class ThemeShowcase {
    constructor() {
        this.init();
    }

    init() {
        this.setupDeviceSwitching();
        this.setupVideoControls();
        this.setupScrollAnimations();
        this.setupFloatingStats();
        this.setupThemeCardInteractions();
        this.createVideoModal();
    }

    setupDeviceSwitching() {
        const themeCards = document.querySelectorAll('.theme-card');
        
        themeCards.forEach(card => {
            const controlButtons = card.querySelectorAll('.control-btn');
            const previews = card.querySelectorAll('.desktop-preview, .mobile-preview, .video-preview');
            
            controlButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const target = button.dataset.target;
                    
                    // Remove active class from all buttons and previews
                    controlButtons.forEach(btn => btn.classList.remove('active'));
                    previews.forEach(preview => preview.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding preview
                    button.classList.add('active');
                    const targetPreview = card.querySelector(`[data-device="${target}"]`);
                    if (targetPreview) {
                        targetPreview.classList.add('active');
                    }
                    
                    // Handle video playback
                    if (target === 'video') {
                        this.handleVideoPlayback(card);
                    } else {
                        this.pauseAllVideos(card);
                    }
                    
                    // Add button click animation
                    this.animateButtonClick(button);
                });
            });
        });
    }

    setupVideoControls() {
        const videoContainers = document.querySelectorAll('.video-container');
        
        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            const playButton = container.querySelector('.play-button');
            const overlay = container.querySelector('.video-overlay');
            
            // Ensure video is loaded
            video.addEventListener('loadeddata', () => {
                console.log('Video loaded successfully:', video.src);
            });
            
            video.addEventListener('error', (e) => {
                console.error('Video loading error:', e);
                console.error('Video source:', video.src);
                // Try to reload the video
                setTimeout(() => {
                    video.load();
                }, 1000);
            });
            
            // Load video
            video.load();
            
            // Play button click - open modal for large view
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openVideoModal(video);
            });
            
            // Video container click - also open modal
            container.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openVideoModal(video);
            });
            
            // Video ended
            video.addEventListener('ended', () => {
                overlay.style.opacity = '1';
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            // Video hover effects
            container.addEventListener('mouseenter', () => {
                overlay.style.opacity = '0.5';
            });
            
            container.addEventListener('mouseleave', () => {
                overlay.style.opacity = '1';
            });
        });
    }

    handleVideoPlayback(card) {
        const video = card.querySelector('.video-preview video');
        const playButton = card.querySelector('.play-button');
        const overlay = card.querySelector('.video-overlay');
        
        if (video) {
            // Auto-play video when switching to video view
            setTimeout(() => {
                video.play().then(() => {
                    overlay.style.opacity = '0';
                    playButton.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(error => {
                    console.error('Error auto-playing video:', error);
                });
            }, 500);
        }
    }

    pauseAllVideos(card) {
        const video = card.querySelector('.video-preview video');
        const playButton = card.querySelector('.play-button');
        const overlay = card.querySelector('.video-overlay');
        
        if (video) {
            video.pause();
            overlay.style.opacity = '1';
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    animateButtonClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        }, 100);
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.animateStats(entry.target);
                }
            });
        }, observerOptions);

        // Observe theme cards
        const themeCards = document.querySelectorAll('.theme-card');
        themeCards.forEach(card => observer.observe(card));

        // Observe section header
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            observer.observe(sectionHeader);
        }
    }

    setupFloatingStats() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach((stat, index) => {
            // Add random floating animation delays
            const delay = Math.random() * 2;
            stat.style.animationDelay = `${delay}s`;
            
            // Add hover effects
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'translateY(-5px) scale(1.05)';
                stat.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'translateY(0px) scale(1)';
                stat.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    setupThemeCardInteractions() {
        const themeCards = document.querySelectorAll('.theme-card');
        
        themeCards.forEach(card => {
            // Add tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px) rotateX(0deg) rotateY(0deg)';
            });
            
            // Button interactions
            const buttons = card.querySelectorAll('.theme-actions button');
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.handleButtonClick(button, e);
                });
            });
        });
    }

    handleButtonClick(button, event) {
        event.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add button feedback
        button.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            button.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
    }

    animateStats(card) {
        const stats = card.querySelectorAll('.stat-item');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0px)';
            }, index * 200);
        });
    }

    createVideoModal() {
        // Create modal HTML
        const modalHTML = `
            <div id="videoModal" class="video-modal">
                <div class="video-modal-backdrop"></div>
                <div class="video-modal-content">
                    <div class="video-modal-header">
                        <h3 id="videoModalTitle">معاينة القالب</h3>
                        <button class="video-modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="video-modal-body">
                        <div class="video-modal-player">
                            <video id="modalVideo" controls preload="metadata">
                                <source src="" type="video/mp4">
                                متصفحك لا يدعم تشغيل الفيديو.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Setup modal events
        this.setupModalEvents();
    }

    setupModalEvents() {
        const modal = document.getElementById('videoModal');
        const closeBtn = modal.querySelector('.video-modal-close');
        const backdrop = modal.querySelector('.video-modal-backdrop');
        const modalVideo = document.getElementById('modalVideo');
        
        // Close modal events
        closeBtn.addEventListener('click', () => this.closeVideoModal());
        backdrop.addEventListener('click', () => this.closeVideoModal());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeVideoModal();
            }
        });
        
        // Video events
        modalVideo.addEventListener('loadeddata', () => {
            console.log('Modal video loaded successfully');
        });
        
        modalVideo.addEventListener('error', (e) => {
            console.error('Modal video error:', e);
        });
    }

    openVideoModal(originalVideo) {
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        const modalTitle = document.getElementById('videoModalTitle');
        
        // Get theme name from the card
        const themeCard = originalVideo.closest('.theme-card');
        const themeTitle = themeCard.querySelector('.theme-title').textContent;
        
        // Set modal title
        modalTitle.textContent = `معاينة ${themeTitle}`;
        
        // Set video source
        const videoSource = originalVideo.querySelector('source').src;
        modalVideo.querySelector('source').src = videoSource;
        modalVideo.load();
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto-play video
        setTimeout(() => {
            modalVideo.play().catch(error => {
                console.error('Error playing modal video:', error);
            });
        }, 300);
    }

    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        // Pause video
        modalVideo.pause();
        modalVideo.currentTime = 0;
        
        // Hide modal
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Auto-switching demo (optional)
class AutoSwitchDemo {
    constructor() {
        this.isActive = false;
        this.intervals = [];
        this.init();
    }

    init() {
        // Auto-switch demo every 10 seconds (optional feature)
        this.startAutoSwitch();
    }

    startAutoSwitch() {
        const themeCards = document.querySelectorAll('.theme-card');
        
        themeCards.forEach((card, cardIndex) => {
            const controlButtons = card.querySelectorAll('.control-btn');
            let currentIndex = 0;
            
            const interval = setInterval(() => {
                if (document.visibilityState === 'visible') {
                    currentIndex = (currentIndex + 1) % controlButtons.length;
                    controlButtons[currentIndex].click();
                }
            }, 8000 + (cardIndex * 2000)); // Staggered timing
            
            this.intervals.push(interval);
        });
    }

    stopAutoSwitch() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
        this.setupVisibilityAPI();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('.theme-card img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce animations on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency < 4 || 
                              navigator.deviceMemory < 4;
        
        if (isLowEndDevice) {
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            document.documentElement.style.setProperty('--transition-duration', '0.2s');
        }
    }

    setupVisibilityAPI() {
        document.addEventListener('visibilitychange', () => {
            const videos = document.querySelectorAll('.theme-card video');
            
            if (document.visibilityState === 'hidden') {
                videos.forEach(video => video.pause());
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeShowcase();
    new AutoSwitchDemo();
    new PerformanceOptimizer();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .theme-card img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .theme-card img.loaded {
        opacity: 1;
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .stat-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
`;

document.head.appendChild(style); 