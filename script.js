const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const mobileLayout = window.matchMedia('(max-width: 53rem)');

function setMenuOpen(open) {
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
}

hamburger.addEventListener('click', () => setMenuOpen(!navMenu.classList.contains('active')));
navMenu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('click', event => {
    if (!navbar.contains(event.target)) setMenuOpen(false);
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenuOpen(false);
        hamburger.focus();
    }
});
mobileLayout.addEventListener('change', () => setMenuOpen(false));

const track = document.getElementById('sliderTrack');
const slides = Array.from(track.children);
const gallery = track.closest('.gallery-slider');
const dotsContainer = document.getElementById('sliderDots');
const playback = document.getElementById('galleryPlayback');
const status = document.getElementById('galleryStatus');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide = 0;
let autoAdvance;
let touchStart;

const dots = slides.map((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Ver foto ' + (index + 1));
    dot.addEventListener('click', () => selectPhoto(index));
    dotsContainer.append(dot);
    return dot;
});

function showPhoto(index, announce = false) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
    slides.forEach((slide, position) => {
        slide.setAttribute('aria-hidden', String(position !== currentSlide));
        dots[position].setAttribute('aria-current', String(position === currentSlide));
    });
    if (announce) status.textContent = 'Foto ' + (currentSlide + 1) + ' de ' + slides.length;
}

function setPlayback(playing) {
    window.clearInterval(autoAdvance);
    autoAdvance = playing ? window.setInterval(() => showPhoto(currentSlide + 1), 5000) : undefined;
    playback.textContent = playing ? 'Pausar galería' : 'Reproducir galería';
}

function selectPhoto(index) {
    setPlayback(false);
    showPhoto(index, true);
}

gallery.querySelector('.prev').addEventListener('click', () => selectPhoto(currentSlide - 1));
gallery.querySelector('.next').addEventListener('click', () => selectPhoto(currentSlide + 1));
playback.addEventListener('click', () => setPlayback(autoAdvance === undefined));
reducedMotion.addEventListener('change', event => {
    if (event.matches) setPlayback(false);
});

track.addEventListener('touchstart', event => {
    touchStart = event.changedTouches[0].clientX;
}, { passive: true });
track.addEventListener('touchend', event => {
    const distance = touchStart - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 50) selectPhoto(currentSlide + Math.sign(distance));
}, { passive: true });

showPhoto(0);
setPlayback(!reducedMotion.matches);
