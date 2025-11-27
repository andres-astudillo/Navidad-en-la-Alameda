// Toggle event details
function toggleEventDetails(button) {
    const card = button.closest('.event-card');
    const details = card.querySelector('.event-details');
    const expandText = button.querySelector('.expand-text');
    const expandIcon = button.querySelector('.expand-icon');

    if (details.style.display === 'none') {
        // Expandir
        details.style.display = 'block';
        expandText.textContent = 'Ver menos';
        expandIcon.style.transform = 'rotate(180deg)';
        button.classList.add('expanded');

        // Smooth scroll animation
        // We use a small timeout to allow the display:block to apply before animating opacity
        details.style.opacity = '0';
        setTimeout(() => {
            details.style.opacity = '1';
        }, 10);
    } else {
        // Colapsar
        details.style.opacity = '0';

        setTimeout(() => {
            details.style.display = 'none';
            expandText.textContent = 'Ver más detalles';
            expandIcon.style.transform = 'rotate(0deg)';
            button.classList.remove('expanded');
        }, 300); // Wait for opacity transition
    }
}
