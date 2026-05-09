/* ========================================
   MAIN JAVASCRIPT FILE
   DevOps Portfolio - Vanilla JS
   ======================================== */

/**
 * DOMContentLoaded Event Handler
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeFormValidation();
    initializeSmoothScroll();
    initializeScrollEffects();
    handleResponsive();
});

/**
 * NAVIGATION FUNCTIONALITY
 * Handle mobile menu toggle and navigation interactions
 */
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navbar__link');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        const navbar = document.querySelector('.navbar');
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle navbar appearance on scroll
    let scrolled = false;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 0 && !scrolled) {
            scrolled = true;
            navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
        } else if (window.scrollY === 0 && scrolled) {
            scrolled = false;
            navbar.style.boxShadow = 'none';
        }
    });
}

/**
 * SMOOTH SCROLL FUNCTIONALITY
 * Enable smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * FORM VALIDATION
 * Let Netlify Forms handle the submission
 * Just do client-side validation
 */
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Add client-side validation but allow Netlify to handle submission
    form.addEventListener('submit', (e) => {
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form - show errors but don't prevent submission
        const isValid = validateForm(name, email, message);
        
        // If validation fails, prevent submission
        if (!isValid) {
            e.preventDefault();
        }
        // If valid, let form submit naturally to Netlify
    });
}

/**
 * Validate form inputs
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} message - User message
 * @returns {boolean} - Whether form is valid
 */
function validateForm(name, email, message) {
    let isValid = true;
    
    // Clear all previous errors
    document.querySelectorAll('.form__error').forEach(error => {
        error.classList.remove('show');
    });
    
    // Validate name
    if (name.length < 2) {
        showError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show error message for a form field
 * @param {string} fieldId - ID of the form field
 * @param {string} errorText - Error message to display
 */
function showError(fieldId, errorText) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    
    if (error) {
        error.textContent = errorText;
        error.classList.add('show');
    }
    
    if (input) {
        input.style.borderColor = '#ff6b6b';
    }
    
    // Reset on input
    input.addEventListener('input', () => {
        input.style.borderColor = '';
        error.classList.remove('show');
    }, { once: true });
}

/**
 * Netlify handles form submissions automatically
 * No need for manual submission function
 * 
 * Form will be submitted to Netlify and you'll receive email notifications
 */

/**
 * SCROLL EFFECTS
 * Handle scroll-triggered animations and effects
 */
function initializeScrollEffects() {
    // Use Intersection Observer for performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animations on skill cards
                if (entry.target.classList.contains('skill-card')) {
                    animateProgressBar(entry.target);
                }
                
                // Mark section as in view
                if (entry.target.classList.contains('section')) {
                    entry.target.classList.add('in-view');
                }
                
                // Remove observer after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all skill cards and sections
    document.querySelectorAll('.skill-card, .section').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Animate progress bar when it comes into view
 * @param {HTMLElement} skillCard - The skill card element
 */
function animateProgressBar(skillCard) {
    const progressBar = skillCard.querySelector('.skill-card__progress');
    if (progressBar) {
        // Trigger animation by re-flowing the element
        progressBar.style.width = '0';
        setTimeout(() => {
            const progress = progressBar.style.getPropertyValue('--progress');
            progressBar.style.width = progress;
        }, 10);
    }
}

/**
 * RESPONSIVE FUNCTIONALITY
 * Handle responsive design behaviors
 */
function handleResponsive() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // Close menu on window resize if needed
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * UTILITY FUNCTIONS
 */

/**
 * Debounce function to prevent excessive function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
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
 * Throttle function to limit function call frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - Whether element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

/**
 * Add event listener with passive flag for performance
 * @param {HTMLElement} element - Element to add listener to
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {boolean} passive - Whether to use passive flag
 */
function addPassiveListener(element, event, handler, passive = true) {
    element.addEventListener(event, handler, { passive });
}

// Export functions for use in other scripts
window.PortfolioApp = {
    validateForm,
    submitForm,
    debounce,
    throttle,
    isInViewport,
    addPassiveListener
};

console.log('Portfolio app initialized successfully!');