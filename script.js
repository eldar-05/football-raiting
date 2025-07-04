document.addEventListener('DOMContentLoaded', () => {
    const playerCards = document.querySelectorAll('.player-card');
    const heroSection = document.querySelector('.hero'); 

    const animateNumber = (element, target) => {
        let current = 0;
        const duration = 2000; 
        const increment = target / (duration / 10); 

        const timer = setInterval(() => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 10);
    };

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const animatedNumbers = entry.target.querySelectorAll('.animated-number');
                animatedNumbers.forEach(num => {
                    const target = parseInt(num.dataset.target);
                    animateNumber(num, target);
                });
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    playerCards.forEach(card => {
        observer.observe(card);
    });

});