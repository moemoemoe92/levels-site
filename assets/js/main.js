/* ====================================
   Main JavaScript
   ملف الجافا سكريبت الرئيسي
   ==================================== */

// Utility Functions - دوال مساعدة
const utils = {
    // Debounce function - دالة تأخير
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function - دالة تقييد
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport - التحقق من ظهور العنصر
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element - التمرير السلس
    smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - 70; // Account for navbar height
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
};

// Navbar Handler - معالج شريط التنقل
class NavbarHandler {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleNavLinks();
    }

    // Handle scroll effects - معالجة تأثيرات التمرير
    handleScroll() {
        const handleScrollEvent = utils.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add scrolled class
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > this.lastScrollTop && scrollTop > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }

            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, 100);

        window.addEventListener('scroll', handleScrollEvent);
    }

    // Handle mobile menu toggle - معالجة قائمة الموبايل
    handleMobileMenu() {
        if (!this.mobileToggle || !this.navLinks) return;

        this.mobileToggle.addEventListener('click', () => {
            this.mobileToggle.classList.toggle('active');
            this.navLinks.classList.toggle('active');
            document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Handle navigation links - معالجة روابط التنقل
    handleNavLinks() {
        const links = document.querySelectorAll('.nav-links a');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Check if it's an internal link
                if (href.startsWith('#')) {
                    e.preventDefault();
                    utils.smoothScrollTo(href);

                    // Close mobile menu if open
                    if (this.navLinks.classList.contains('active')) {
                        this.mobileToggle.classList.remove('active');
                        this.navLinks.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }

                    // Update active link
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
    }
}

// Hero Animation Handler - معالج رسوم القسم الرئيسي
class HeroAnimationHandler {
    constructor() {
        this.canvas = document.getElementById('coffee-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.init();
        }
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        let angle = 0;
        const colors = ['#A27B5C', '#8B6B4F', '#C29A7A', '#654321'];

        const drawLoop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw multiple floating circles
            for (let i = 0; i < 5; i++) {
                angle += 0.01;
                const radius = 60 + Math.sin(angle + i) * 20;
                const x = this.canvas.width / 2 + Math.cos(angle * 0.5 + i * Math.PI / 2.5) * (100 + i * 50);
                const y = this.canvas.height / 2 + Math.sin(angle * 0.3 + i * Math.PI / 2.5) * (80 + i * 40);

                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                this.ctx.fillStyle = colors[i % colors.length] + '40'; // Add transparency
                this.ctx.fill();
            }

            requestAnimationFrame(drawLoop);
        };

        drawLoop();
    }
}

// Performance Monitor - مراقب الأداء
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();

        // Preload critical resources
        this.preloadResources();

        // Monitor page load performance
        this.monitorPerformance();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadResources() {
        // Preload fonts
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap'
        ];

        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = font;
            document.head.appendChild(link);
        });
    }

    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor First Contentful Paint
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`Performance metric: ${entry.name} - ${entry.startTime}ms`);
                }
            });

            perfObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        }

        // Log page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Accessibility Handler - معالج إمكانية الوصول
class AccessibilityHandler {
    constructor() {
        this.init();
    }

    init() {
        // Add keyboard navigation support
        this.handleKeyboardNavigation();

        // Add ARIA labels
        this.addAriaLabels();

        // Handle focus visible
        this.handleFocusVisible();
    }

    handleKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Handle Tab key
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }

            // Handle Enter key on interactive elements
            if (e.key === 'Enter') {
                const activeElement = document.activeElement;
                if (activeElement.classList.contains('category-btn') ||
                    activeElement.classList.contains('gaming-card')) {
                    activeElement.click();
                }
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    addAriaLabels() {
        // Add aria-labels to navigation
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', link.textContent);
            }
        });

        // Add aria-labels to buttons
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', button.textContent || 'Button');
            }
        });
    }

    handleFocusVisible() {
        // Only show focus outline when using keyboard
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-focus');
            }
        });

        document.body.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-focus');
        });
    }
}

// Analytics Handler - معالج التحليلات
class AnalyticsHandler {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackClicks();
        this.trackScrollDepth();
    }

    trackPageView() {
        this.logEvent('page_view', {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
    }

    trackClicks() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                this.logEvent('click', {
                    element: target.tagName,
                    text: target.textContent,
                    href: target.href || null
                });
            }
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;

        const handleScroll = utils.throttle(() => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = Math.round(scrollPercent / 25) * 25; // Track in 25% increments
                this.logEvent('scroll_depth', { depth: maxScroll });
            }
        }, 1000);

        window.addEventListener('scroll', handleScroll);
    }

    logEvent(eventName, data) {
        this.events.push({
            event: eventName,
            data: data,
            timestamp: new Date().toISOString()
        });

        // In production, send to analytics service
        console.log(`Analytics Event: ${eventName}`, data);
    }
}

// Initialize Application - تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }

    // Initialize all handlers
    new NavbarHandler();
    new HeroAnimationHandler();
    new PerformanceMonitor();
    new AccessibilityHandler();
    new AnalyticsHandler();

    // Add page loaded class
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

    console.log('✅ Levels Café website initialized successfully!');
});

// Service Worker Registration - تسجيل Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils, NavbarHandler, PerformanceMonitor };
}
