const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const hospitalRadio = document.querySelector('#hospital-radio');
const clinicRadio = document.querySelector('#clinic-radio');
const specializationCheckboxes = document.querySelectorAll('.specialization-checkbox');
const slides = document.querySelectorAll('.carousel-slide');
const slidesToShow = 3; // Number of slides to show at once
let index = 0;

function updateCarousel() {
    const showClass = hospitalRadio.checked ? '.hospital-slide' : '.clinic-slide';
    const slidesToShow = document.querySelectorAll(showClass);

    if (slidesToShow.length === 0) {
        // If no slides exist for the selected category, do nothing
        console.warn(`No slides found for: ${showClass}`);
        return;
    }

    const selectedSpecializations = Array.from(specializationCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    slides.forEach(slide => {
        const specialization = slide.getAttribute('data-specialization');
        const shouldShow = slide.matches(showClass) && 
                           (selectedSpecializations.length === 0 || 
                            selectedSpecializations.includes(specialization));
        slide.classList.toggle('show', shouldShow);
    });

    const visibleSlides = document.querySelectorAll('.carousel-slide.show');
    if (visibleSlides.length > 0) {
        const totalVisibleSlides = Math.min(visibleSlides.length, slidesToShow);
        const offset = -index * (100 / slidesToShow);
        document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
    }
}


prevButton.addEventListener('click', () => {
    const visibleSlides = document.querySelectorAll('.carousel-slide.show');
    if (visibleSlides.length > 0) {
        index = (index - 1 + Math.ceil(visibleSlides.length / slidesToShow)) % Math.ceil(visibleSlides.length / slidesToShow);
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    const visibleSlides = document.querySelectorAll('.carousel-slide.show');
    if (visibleSlides.length > 0) {
        index = (index + 1) % Math.ceil(visibleSlides.length / slidesToShow);
        updateCarousel();
    }
});

hospitalRadio.addEventListener('change', () => {
    index = 0; // Reset index when changing between hospital and clinic
    updateCarousel();
});
clinicRadio.addEventListener('change', () => {
    index = 0; // Reset index when changing between hospital and clinic
    updateCarousel();
});
specializationCheckboxes.forEach(checkbox => checkbox.addEventListener('change', () => {
    index = 0; // Reset index when changing specializations
    updateCarousel();
}));

updateCarousel(); // Initialize
