/**
 * TechVision Solutions - Main JavaScript
 * 
 * Features:
 * - Smooth scrolling navigation
 * - Mobile menu toggle
 * - Scroll-based animations
 * - Form validation
 * - Counter animations
 * - Navbar scroll effects
 * - Scroll to top button
 */

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initContactForm();
    initScrollToTop();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe about features
    const aboutFeatures = document.querySelectorAll('.about-feature');
    aboutFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(feature);
    });

    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });
}

// ==========================================
// COUNTER ANIMATIONS
// ==========================================

function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                stats.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }
}

// ==========================================
// CONTACT FORM
// ==========================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-submit');
    const formMessage = document.getElementById('formMessage');

    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            message: 'First name must be at least 2 characters'
        },
        lastName: {
            required: true,
            minLength: 2,
            message: 'Last name must be at least 2 characters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\d\s\-\+\(\)]+$/,
            message: 'Please enter a valid phone number'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Subject must be at least 5 characters'
        },
        message: {
            required: true,
            minLength: 20,
            message: 'Message must be at least 20 characters'
        }
    };

    // Validate single field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { valid: true };

        // Required check
        if (rules.required && !value.trim()) {
            return {
                valid: false,
                message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
            };
        }

        // Skip other validations if field is empty and not required
        if (!rules.required && !value.trim()) {
            return { valid: true };
        }

        // Min length check
        if (rules.minLength && value.trim().length < rules.minLength) {
            return {
                valid: false,
                message: rules.message
            };
        }

        // Pattern check
        if (rules.pattern && !rules.pattern.test(value)) {
            return {
                valid: false,
                message: rules.message
            };
        }

        return { valid: true };
    }

    // Show error message
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    // Clear error message
    function clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            // Validate on blur
            field.addEventListener('blur', function() {
                const validation = validateField(fieldName, this.value);
                if (!validation.valid) {
                    showError(fieldName, validation.message);
                } else {
                    clearError(fieldName);
                }
            });

            // Clear error on focus
            field.addEventListener('focus', function() {
                clearError(fieldName);
            });

            // Validate on input (with debounce)
            let timeout;
            field.addEventListener('input', function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    const validation = validateField(fieldName, this.value);
                    if (this.value.trim() && !validation.valid) {
                        showError(fieldName, validation.message);
                    } else if (validation.valid) {
                        clearError(fieldName);
                    }
                }, 500);
            });
        }
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous messages
        formMessage.classList.remove('show', 'success', 'error');
        formMessage.textContent = '';

        // Validate all fields
        let isValid = true;
        const formData = {};

        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                const value = field.value;
                const validation = validateField(fieldName, value);
                
                if (!validation.valid) {
                    showError(fieldName, validation.message);
                    isValid = false;
                } else {
                    clearError(fieldName);
                    formData[fieldName] = value;
                }
            }
        });

        if (!isValid) {
            showFormMessage('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        try {
            // In a real application, you would send the data to your server here
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Log form data (for demonstration)
            console.log('Form submitted with data:', formData);

        } catch (error) {
            // Error
            showFormMessage('Sorry, something went wrong. Please try again later.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Show form message
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.classList.add('show', type);
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }
    }
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
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
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
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
 * @param {Element} element - DOM element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images (if needed)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Skip to main content link
document.addEventListener('keydown', function(e) {
    // If Tab key is pressed
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Trap focus in mobile menu when open
const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
        
        // Close menu on Escape key
        if (e.key === 'Escape') {
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.focus();
            }
        }
    });
};

const navMenu = document.getElementById('navMenu');
if (navMenu) {
    trapFocus(navMenu);
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c TechVision Solutions ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
console.log('%c Website loaded successfully! ', 'color: #10b981; font-size: 14px;');
console.log('%c Developed with ?? for digital transformation ', 'color: #94a3b8; font-size: 12px;');
