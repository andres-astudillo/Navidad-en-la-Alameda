// ============================================
// NAVIGATION SCROLL BEHAVIOR
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL TO SECTIONS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// GALLERY SLIDER
// ============================================

let currentSlide = 0;
const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');
const totalSlides = slides.length;

// Create dots
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Update dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Move slide
function moveSlide(direction) {
    currentSlide += direction;

    // Loop around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateSlider();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Update slider position
function updateSlider() {
    const offset = -currentSlide * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Auto-advance slides
let autoSlideInterval = setInterval(() => {
    moveSlide(1);
}, 5000);

// Reset auto-advance when user interacts
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

// Add event listeners to slider navigation
const prevBtn = document.querySelector('.slider-nav.prev');
const nextBtn = document.querySelector('.slider-nav.next');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        moveSlide(-1);
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        moveSlide(1);
        resetAutoSlide();
    });
}

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (sliderTrack) {
    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            moveSlide(1);
        } else {
            // Swipe right - previous slide
            moveSlide(-1);
        }
        resetAutoSlide();
    }
}

// Initialize slider
if (dotsContainer) {
    createDots();
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

// Observe all images
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to card sections
const cardSections = document.querySelectorAll('.card-section');
cardSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
});

// ============================================
// PREVENT CONTEXT MENU ON IMAGES (OPTIONAL)
// ============================================

// Uncomment if you want to prevent right-click on images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c✨ Navidad en Mendoza 2025 ✨', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cUn reencuentro de esperanza', 'color: #8B0000; font-size: 16px; font-style: italic;');
