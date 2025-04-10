(function() {
    "use strict";
    
    // Configuration
    const slideTimeout = 5000;
    const transitionDuration = 600;
    const easing = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
    
    // Elements
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const $slides = document.querySelectorAll('.slide');
    let $dots;
    let intervalId;
    let currentSlide = 0;
    let isAnimating = false;

    // Initialize carousel
    function initCarousel() {
        // Create dots
        const dotsContainer = document.querySelector('.carousel-dots');
        dotsContainer.innerHTML = '';
        
        $slides.forEach((_, index) => {
            const dotClass = index === currentSlide ? 'active' : 'inactive';
            const $dot = document.createElement('span');
            $dot.className = `dot ${dotClass}`;
            $dot.dataset.slideId = index;
            dotsContainer.appendChild($dot);
        });

        $dots = document.querySelectorAll('.dot');
        
        // Set initial positions
        updateSlidePositions();
    }

    // Update slide positions with smooth transition
    function updateSlidePositions() {
        isAnimating = true;
        $slides.forEach((slide, index) => {
            slide.style.transition = `transform ${transitionDuration}ms ${easing}`;
            slide.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Reset transition after animation completes
            slide.addEventListener('transitionend', () => {
                isAnimating = false;
            }, { once: true });
        });
        
        updateDots();
    }

    // Update dot indicators
    function updateDots() {
        $dots.forEach(($dot, index) => {
            $dot.classList.remove('active', 'inactive');
            $dot.classList.add(index === currentSlide ? 'active' : 'inactive');
        });
    }

    // Navigate to specific slide
    function slideTo(index) {
        if (isAnimating) return;
        
        // Handle wrap-around
        if (index >= $slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = $slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        updateSlidePositions();
        resetInterval();
    }

    // Auto-advance slides
    function showNextSlide() {
        slideTo(currentSlide + 1);
    }

    // Reset autoplay interval
    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(showNextSlide, slideTimeout);
    }

    // Event listeners
    function setupEventListeners() {
        // Dot navigation
        $dots.forEach(($dot, index) => {
            $dot.addEventListener('click', () => slideTo(index));
        });

        // Arrow navigation
        prev.addEventListener('click', () => {
            slideTo(currentSlide - 1);
        });
        
        next.addEventListener('click', () => {
            slideTo(currentSlide + 1);
        });

        // Pause on hover/touch
        $slides.forEach($slide => {
            // Mouse events
            $slide.addEventListener('mouseenter', () => {
                clearInterval(intervalId);
            });
            
            $slide.addEventListener('mouseleave', resetInterval);

            // Touch events
            let touchStartX = 0;
            let touchEndX = 0;
            
            $slide.addEventListener('touchstart', (e) => {
                clearInterval(intervalId);
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            
            $slide.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                handleSwipe();
                resetInterval();
            }, { passive: true });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                slideTo(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                slideTo(currentSlide + 1);
            }
        });
    }

    // Handle swipe gestures
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (difference > swipeThreshold) {
            slideTo(currentSlide + 1); // Swipe left
        } else if (difference < -swipeThreshold) {
            slideTo(currentSlide - 1); // Swipe right
        }
    }

    // Initialize everything
    initCarousel();
    setupEventListeners();
    intervalId = setInterval(showNextSlide, slideTimeout);

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlidePositions();
    });

})();