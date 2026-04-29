/* ========================================
   ANIMATIONS JAVASCRIPT FILE
   Scroll animations, parallax, and interactive effects
   ======================================== */

/**
 * Initialize all animation effects
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeProgressCounters();
    initializeParallaxEffect();
    initializeHoverEffects();
});

/**
 * SCROLL ANIMATIONS
 * Trigger animations when elements come into view
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes to various elements
                const target = entry.target;
                
                // Animate skill cards
                if (target.classList.contains('skill-card')) {
                    target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
                
                // Animate project cards
                if (target.classList.contains('project-card')) {
                    target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
                
                // Animate certification cards
                if (target.classList.contains('cert-card')) {
                    target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
                
                // Animate stat cards
                if (target.classList.contains('stat-card')) {
                    target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
                
                // Animate section content
                if (target.classList.contains('about__text')) {
                    target.style.animation = 'slideInLeft 0.8s ease-out forwards';
                }
                
                // Stop observing after animation
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll(
        '.skill-card, .project-card, .cert-card, .stat-card, .about__text'
    ).forEach(element => {
        animationObserver.observe(element);
    });
}

/**
 * PROGRESS COUNTER ANIMATIONS
 * Animate progress bars when they come into view
 */
function initializeProgressCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const progressBar = entry.target.querySelector('.skill-card__progress');
                if (progressBar) {
                    // Mark as animated to prevent re-animation
                    entry.target.classList.add('animated');
                    
                    // Get the target progress value
                    const progressValue = progressBar.style.getPropertyValue('--progress');
                    
                    // Reset and animate
                    progressBar.style.width = '0%';
                    progressBar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    
                    // Trigger animation
                    setTimeout(() => {
                        progressBar.style.width = progressValue;
                    }, 50);
                }
            }
        });
    }, observerOptions);
    
    // Observe all skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        progressObserver.observe(card);
    });
}

/**
 * PARALLAX EFFECT
 * Create subtle parallax scrolling effect
 */
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    const parallaxScroll = () => {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = scrollPosition * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    };
    
    // Use throttle for performance
    window.addEventListener('scroll', throttleScroll(parallaxScroll, 16), { passive: true });
}

/**
 * HOVER EFFECTS
 * Enhanced hover interactions for cards and buttons
 */
function initializeHoverEffects() {
    const hoverElements = document.querySelectorAll(
        '.skill-card, .project-card, .cert-card, .btn, .contact__link'
    );
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            handleHoverEnter(e.target);
        });
        
        element.addEventListener('mouseleave', (e) => {
            handleHoverLeave(e.target);
        });
    });
}

/**
 * Handle hover enter effect
 * @param {HTMLElement} element - Element being hovered
 */
function handleHoverEnter(element) {
    // Add glow effect
    if (element.classList.contains('skill-card') || 
        element.classList.contains('project-card') ||
        element.classList.contains('cert-card')) {
        element.style.filter = 'brightness(1.05)';
    }
}

/**
 * Handle hover leave effect
 * @param {HTMLElement} element - Element no longer hovered
 */
function handleHoverLeave(element) {
    // Reset effects
    element.style.filter = 'brightness(1)';
}

/**
 * SCROLL POSITION TRACKER
 * Track user scroll position for analytics/UX
 */
function initializeScrollTracker() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update scroll indicator if it exists
        const scrollIndicator = document.querySelector('[data-scroll-indicator]');
        if (scrollIndicator) {
            scrollIndicator.style.width = scrollPercentage + '%';
        }
        
        // Store scroll position for potential restoration
        sessionStorage.setItem('lastScrollPosition', window.scrollY);
    }, { passive: true });
    
    // Restore scroll position if returning to page
    window.addEventListener('load', () => {
        const lastPosition = sessionStorage.getItem('lastScrollPosition');
        if (lastPosition) {
            window.scrollTo(0, parseInt(lastPosition));
        }
    });
}

/**
 * COUNTER ANIMATION
 * Animate numbers counting up
 */
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * ELEMENT VISIBILITY TRACKER
 * Track which sections are currently visible
 */
function initializeVisibilityTracker() {
    const sections = document.querySelectorAll('section[id]');
    
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active navigation item
                const navLinks = document.querySelectorAll('.navbar__link');
                navLinks.forEach(link => {
                    link.style.color = '';
                });
                
                const activeLink = document.querySelector(
                    `.navbar__link[href="#${entry.target.id}"]`
                );
                if (activeLink) {
                    activeLink.style.color = 'var(--color-primary)';
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        visibilityObserver.observe(section);
    });
}

/**
 * KEYBOARD NAVIGATION
 * Add keyboard support for accessibility
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Tab key navigation to elements
        if (e.key === 'Tab') {
            // Browser handles this natively
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.focus();
            }
        }
    });
}

/**
 * THEME PREFERENCES
 * Detect and apply system theme preferences
 */
function initializeThemePreferences() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
    
    // Theme is already dark by default, but this could be extended
    if (prefersLight.matches) {
        // Could implement light theme here
        console.log('Light theme preferred');
    }
    
    // Listen for theme changes
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            console.log('Switched to dark theme');
        }
    });
}

/**
 * PERFORMANCE MONITORING
 * Monitor animation performance
 */
function initializePerformanceMonitoring() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
}

/**
 * UTILITY: Throttle scroll events
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Throttled function
 */
function throttleScroll(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

/**
 * UTILITY: Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounceAnimations(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * REQUEST ANIMATION FRAME
 * Smooth animations with RAF
 */
function animateWithRAF(element, property, endValue, duration = 500) {
    const startValue = parseFloat(getComputedStyle(element)[property]);
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const value = startValue + (endValue - startValue) * progress;
        element.style[property] = value;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}

/**
 * Initialize all animation features
 */
function initializeAllAnimations() {
    initializeScrollAnimations();
    initializeProgressCounters();
    initializeParallaxEffect();
    initializeHoverEffects();
    initializeScrollTracker();
    initializeVisibilityTracker();
    initializeKeyboardNavigation();
    initializeThemePreferences();
    initializePerformanceMonitoring();
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllAnimations);
} else {
    initializeAllAnimations();
}

console.log('Animations initialized successfully!');
