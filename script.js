/* ============================================
   NAVIDAD EN MENDOZA 2025 - JAVASCRIPT
   All interactive functionality
   ============================================ */

// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero background parallax
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Section parallax layers
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== FADE-IN ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});

// ===== GALLERY SLIDER =====
let currentSlide = 0;
let autoSlideInterval;
let isTransitioning = false;

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');

    if (!slides.length || !dotsContainer) return;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    startAutoSlide();
}

function moveSlide(direction) {
    if (isTransitioning) return;

    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    isTransitioning = true;
    currentSlide += direction;

    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    updateSlider();
    resetAutoSlide();

    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

function goToSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentSlide = index;
    updateSlider();
    resetAutoSlide();

    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

function updateSlider() {
    const track = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.dot');

    if (!track) return;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// ===== EVENT EXPAND/COLLAPSE =====
function toggleEventExpand(button) {
    const card = button.closest('.event-card-new');
    const expandedContent = card.querySelector('.event-expanded');

    if (!expandedContent) return;

    const isExpanded = expandedContent.style.display === 'block';

    if (isExpanded) {
        expandedContent.style.display = 'none';
        button.textContent = 'Ver detalles';
    } else {
        expandedContent.style.display = 'block';
        button.textContent = 'Ver menos';

        // Smooth scroll to expanded content
        setTimeout(() => {
            expandedContent.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for # only (popup triggers)
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== KEYBOARD NAVIGATION FOR SLIDER =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});

// ===== TOUCH SWIPE FOR GALLERY =====
let touchStartX = 0;
let touchEndX = 0;

const sliderElement = document.querySelector('.gallery-slider');

if (sliderElement) {
    sliderElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                moveSlide(1); // Swipe left
            } else {
                moveSlide(-1); // Swipe right
            }
        }
    }
}

// ===== LAZY LOADING IMAGES =====
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

// ===== PREVENT SCROLL RESTORATION =====
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ===== INITIALIZE ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    initSlider();

    // Add smooth reveal animation to page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    console.log('✨ Navidad en Mendoza 2025 - Website loaded successfully');
});

// ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
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

// Apply debounce to scroll-heavy functions if needed
const debouncedScrollHandler = debounce(() => {
    // Additional scroll handling if needed
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY: FOCUS MANAGEMENT =====
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== ERROR HANDLING FOR IMAGES =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        // Image failed to load - placeholder is already set via onerror in HTML
        console.warn(`Failed to load image: ${this.src}`);
    });
});
