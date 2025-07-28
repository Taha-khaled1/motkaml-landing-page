// Additional Sections JavaScript - Network Design
class AdditionalSections {
    constructor() {
        this.currentStep = 0;
        this.stepNodes = [];
        this.whyNodes = [];
        this.isScrollTriggered = false;
        
        this.init();
    }

    init() {
        this.setupNetworkBackground();
        this.setupStepsInteraction();
        this.setupWhyChooseInteraction();
        this.setupScrollAnimations();
        this.setupFAQ();
        this.startNetworkAnimation();
    }

    setupNetworkBackground() {
        // Add network background to sections
        const sections = document.querySelectorAll('.steps-section, .why-choose-section');
        
        sections.forEach(section => {
            if (!section.querySelector('.network-bg')) {
                const networkBg = document.createElement('div');
                networkBg.className = 'network-bg';
                
                // Add network dots
                const networkDots = document.createElement('div');
                networkDots.className = 'network-dots';
                
                for (let i = 0; i < 5; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'network-dot';
                    networkDots.appendChild(dot);
                }
                
                // Add network lines
                const networkLines = document.createElement('div');
                networkLines.className = 'network-lines';
                
                for (let i = 0; i < 3; i++) {
                    const line = document.createElement('div');
                    line.className = 'network-line';
                    line.style.top = `${30 + i * 20}%`;
                    line.style.left = `${10 + i * 15}%`;
                    line.style.width = `${40 + i * 10}%`;
                    line.style.animationDelay = `${i * 0.5}s`;
                    networkLines.appendChild(line);
                }
                
                networkBg.appendChild(networkDots);
                networkBg.appendChild(networkLines);
                section.appendChild(networkBg);
            }
        });
    }

    setupStepsInteraction() {
        // Convert existing step items to new network design
        const stepsContainer = document.querySelector('.steps-container');
        const existingSteps = document.querySelectorAll('.step-item');
        
        if (stepsContainer && existingSteps.length > 0) {
            // Create new network structure
            const stepsNetwork = document.createElement('div');
            stepsNetwork.className = 'steps-network';
            
            existingSteps.forEach((step, index) => {
                const stepNumber = step.querySelector('.step-number')?.textContent || (index + 1);
                const stepTitle = step.querySelector('h4')?.textContent || `Step ${index + 1}`;
                const stepDesc = step.querySelector('p')?.textContent || '';
                
                const stepNode = document.createElement('div');
                stepNode.className = 'step-node';
                stepNode.innerHTML = `
                    <div class="step-number">${stepNumber}</div>
                    <div class="step-title">${stepTitle}</div>
                    <div class="step-description">${stepDesc}</div>
                    ${index < existingSteps.length - 1 ? '<div class="step-connection"></div>' : ''}
                `;
                
                // Add click interaction
                stepNode.addEventListener('click', () => {
                    this.activateStep(index);
                });
                
                // Add hover interaction
                stepNode.addEventListener('mouseenter', () => {
                    this.highlightStep(index);
                });
                
                stepNode.addEventListener('mouseleave', () => {
                    this.removeHighlight();
                });
                
                stepsNetwork.appendChild(stepNode);
                this.stepNodes.push(stepNode);
            });
            
            // Replace old structure
            stepsContainer.innerHTML = '';
            stepsContainer.appendChild(stepsNetwork);
            
            // Add CTA back if it existed
            const existingCTA = document.querySelector('.steps-cta');
            if (existingCTA) {
                stepsContainer.appendChild(existingCTA);
            }
        }
    }

    setupWhyChooseInteraction() {
        // Convert existing why items to new network design
        const whySection = document.querySelector('.why-choose-section');
        const existingGrid = document.querySelector('.why-grid');
        const existingItems = document.querySelectorAll('.why-item');
        
        if (whySection && existingItems.length > 0) {
            // Create new network structure
            const whyNetwork = document.createElement('div');
            whyNetwork.className = 'why-network';
            
            existingItems.forEach((item, index) => {
                const icon = item.querySelector('.why-icon i')?.className || 'fas fa-star';
                const title = item.querySelector('h5')?.textContent || `Feature ${index + 1}`;
                const desc = item.querySelector('p')?.textContent || '';
                
                const whyNode = document.createElement('div');
                whyNode.className = 'why-node';
                
                // Make some nodes featured for visual variety
                if (index === 0 || index === 4) {
                    whyNode.classList.add('featured');
                }
                
                whyNode.innerHTML = `
                    <div class="why-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="why-title">${title}</div>
                    <div class="why-description">${desc}</div>
                `;
                
                // Add click interaction
                whyNode.addEventListener('click', () => {
                    this.activateWhyNode(index);
                });
                
                whyNetwork.appendChild(whyNode);
                this.whyNodes.push(whyNode);
            });
            
            // Replace old structure
            if (existingGrid) {
                existingGrid.replaceWith(whyNetwork);
            } else {
                whySection.querySelector('.container').appendChild(whyNetwork);
            }
        }
    }

    activateStep(stepIndex) {
        // Remove active state from all steps
        this.stepNodes.forEach((node, index) => {
            node.classList.remove('active');
            const connection = node.querySelector('.step-connection');
            if (connection) {
                connection.classList.remove('active');
            }
        });
        
        // Activate current step and all previous ones
        for (let i = 0; i <= stepIndex; i++) {
            if (this.stepNodes[i]) {
                this.stepNodes[i].classList.add('active');
                const connection = this.stepNodes[i].querySelector('.step-connection');
                if (connection && i < stepIndex) {
                    setTimeout(() => {
                        connection.classList.add('active');
                    }, i * 200);
                }
            }
        }
        
        this.currentStep = stepIndex;
        
        // Trigger completion animation if last step
        if (stepIndex === this.stepNodes.length - 1) {
            setTimeout(() => {
                this.celebrateCompletion();
            }, 1000);
        }
    }

    highlightStep(stepIndex) {
        this.stepNodes.forEach((node, index) => {
            if (index === stepIndex) {
                node.style.transform = 'translateY(-5px) scale(1.02)';
                node.style.boxShadow = '0 15px 35px rgba(16, 95, 170, 0.2)';
            }
        });
    }

    removeHighlight() {
        this.stepNodes.forEach(node => {
            if (!node.classList.contains('active')) {
                node.style.transform = '';
                node.style.boxShadow = '';
            }
        });
    }

    activateWhyNode(nodeIndex) {
        // Remove previous highlights
        this.whyNodes.forEach(node => {
            node.style.transform = '';
            node.style.filter = '';
        });
        
        // Highlight selected node
        if (this.whyNodes[nodeIndex]) {
            this.whyNodes[nodeIndex].style.transform = 'translateY(-10px) scale(1.05)';
            this.whyNodes[nodeIndex].style.filter = 'brightness(1.1)';
            
            // Create ripple effect
            this.createRippleEffect(this.whyNodes[nodeIndex]);
        }
        
        // Dim other nodes
        this.whyNodes.forEach((node, index) => {
            if (index !== nodeIndex) {
                node.style.opacity = '0.7';
                node.style.transform = 'scale(0.95)';
            }
        });
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.whyNodes.forEach(node => {
                node.style.opacity = '';
                node.style.transform = '';
                node.style.filter = '';
            });
        }, 2000);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(16, 95, 170, 0.3);
            transform: translate(-50%, -50%);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    celebrateCompletion() {
        // Add completion celebration
        this.stepNodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('completed');
                const particles = this.createParticles(node);
                setTimeout(() => {
                    particles.forEach(particle => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    });
                }, 1000);
            }, index * 100);
        });
    }

    createParticles(element) {
        const particles = [];
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                top: ${rect.top + rect.height / 2}px;
                left: ${rect.left + rect.width / 2}px;
                width: 6px;
                height: 6px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1001;
                animation: particleExplosion 1s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
        }
        
        return particles;
    }

    setupScrollAnimations() {
        // Progressive step activation on scroll
        const stepsSection = document.querySelector('.steps-section');
        
        if (stepsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isScrollTriggered) {
                        this.isScrollTriggered = true;
                        this.progressiveStepActivation();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(stepsSection);
        }
        
        // Why nodes scroll animation
        const whyNodes = document.querySelectorAll('.why-node');
        whyNodes.forEach((node, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(node);
        });
    }

    progressiveStepActivation() {
        // Automatically activate steps one by one
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < this.stepNodes.length) {
                this.activateStep(currentIndex);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    startNetworkAnimation() {
        // Animated network connections
        const sections = document.querySelectorAll('.steps-section, .why-choose-section');
        
        sections.forEach(section => {
            const networkLines = section.querySelectorAll('.network-line');
            networkLines.forEach((line, index) => {
                setInterval(() => {
                    line.style.animationPlayState = 'running';
                }, (index + 1) * 2000);
            });
        });
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdditionalSections();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes particleExplosion {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0) translateX(${Math.random() * 200 - 100}px) translateY(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    .faq-answer {
        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease;
    }
    
    .faq-item.active .faq-answer {
        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease;
    }
    
    /* Network background animations */
    .network-dots .network-dot {
        animation: networkPulse 3s infinite ease-in-out;
    }
    
    .network-lines .network-line {
        animation: networkFlow 4s infinite linear;
    }
`;

document.head.appendChild(style); 