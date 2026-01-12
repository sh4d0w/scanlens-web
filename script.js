/**
 * ScanLens Landing Page - Interactive Scripts
 * Handles animations, scroll effects, and mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollAnimations();
    initMobileNavigation();
    initSmoothScroll();
    initFloatingElements();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .step, .testimonial-card, .pricing-card, .section-header'
    );

    // Add animation class to elements
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Mobile navigation toggle
 */
function initMobileNavigation() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const nav = document.querySelector('.nav');

    if (!toggle) return;

    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav-mobile-menu';
    mobileMenu.innerHTML = `
        <div class="nav-mobile-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#pricing">Pricing</a>
            <a href="https://apps.apple.com/app/scanlens" class="nav-btn-primary">Download App</a>
        </div>
    `;

    // Add styles for mobile menu
    const styles = document.createElement('style');
    styles.textContent = `
        .nav-mobile-menu {
            position: fixed;
            top: var(--nav-height);
            left: 0;
            right: 0;
            background: rgba(245, 245, 247, 0.98);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            padding: var(--space-6);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
            border-bottom: 1px solid var(--color-border-subtle);
        }

        .nav-mobile-menu.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav-mobile-links {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
        }

        .nav-mobile-links a {
            font-size: var(--font-size-lg);
            font-weight: 500;
            color: var(--color-text-secondary);
            padding: var(--space-3) 0;
            border-bottom: 1px solid var(--color-border-subtle);
            transition: color var(--transition-fast);
        }

        .nav-mobile-links a:hover {
            color: var(--color-text);
        }

        .nav-mobile-links .nav-btn-primary {
            display: inline-flex;
            justify-content: center;
            margin-top: var(--space-4);
            padding: var(--space-4);
            background: var(--color-primary);
            color: white !important;
            border-radius: var(--radius-xl);
            border: none;
        }

        .nav-mobile-toggle.open span:first-child {
            transform: rotate(45deg) translate(4px, 4px);
        }

        .nav-mobile-toggle.open span:last-child {
            transform: rotate(-45deg) translate(4px, -4px);
        }

        .nav-mobile-toggle span {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(styles);
    nav.appendChild(mobileMenu);

    // Toggle menu
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            toggle.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const navHeight = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--nav-height'));

            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Enhanced floating elements with parallax effect
 */
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-card, .float-badge');

    if (floatingElements.length === 0 || window.innerWidth < 769) return;

    // Parallax on mouse move
    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function updateParallax() {
        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 5;
            const x = mouseX * speed;
            const y = mouseY * speed;

            el.style.transform = `translate(${x}px, ${y}px) rotate(var(--rotation, 0deg))`;
        });

        rafId = requestAnimationFrame(updateParallax);
    }

    // Only run parallax on desktop
    if (window.matchMedia('(min-width: 1024px)').matches) {
        updateParallax();
    }

    // Cleanup on page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && rafId) {
            cancelAnimationFrame(rafId);
        } else if (!document.hidden && window.matchMedia('(min-width: 1024px)').matches) {
            updateParallax();
        }
    });
}

/**
 * Navigation background change on scroll
 */
(function initNavScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(245, 245, 247, 0.95)';
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = 'rgba(245, 245, 247, 0.8)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    }, { passive: true });
})();

/**
 * Stats counter animation
 */
(function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-value');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    function animateValue(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasDecimal = text.includes('.');
        const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));

        if (isNaN(numericValue)) return;

        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = numericValue * easeProgress;

            if (hasDecimal) {
                element.textContent = currentValue.toFixed(1) + (hasPlus ? '+' : '');
            } else {
                const suffix = text.includes('M') ? 'M' : (text.includes('K') ? 'K' : '');
                element.textContent = Math.floor(currentValue) + suffix + (hasPlus ? '+' : '');
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
})();
