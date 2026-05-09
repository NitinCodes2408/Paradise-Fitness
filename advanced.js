// ===========================
// ADVANCED JS FEATURES
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Hide Loader
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800); // Give it a slight delay for smooth transition
    }

    // 2. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect to links and buttons
        const interactables = document.querySelectorAll('a, button, .faq-question, .fruit-card, .plan-card, .programs-card, input');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 3. Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Offer Popup Modal (Show once per session)
    const offerModal = document.getElementById('offerModal');
    if (offerModal && !sessionStorage.getItem('offerShown')) {
        setTimeout(() => {
            offerModal.classList.add('active');
            sessionStorage.setItem('offerShown', 'true');
        }, 3000); // Show after 3 seconds
    }
    const closeOffer = document.getElementById('closeOffer');
    if (closeOffer && offerModal) {
        closeOffer.addEventListener('click', () => {
            offerModal.classList.remove('active');
        });
    }

    // 5. Toast Notification System
    window.showToast = function(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // 6. Typing Animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        typingElement.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        setTimeout(typeWriter, 1200); // Start after loader
    }

    // 7. Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const animateCounter = (el) => {
            const target = +el.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    el.innerText = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    el.innerText = target + '+';
                }
            };
            updateCounter();
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statObserver.observe(stat));
    }

    // 8. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            // Open clicked if it wasn't active
            if (!isActive) item.classList.add('active');
        });
    });

    // 9. BMI Calculator Logic
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('bmiWeight').value);
            const heightCm = parseFloat(document.getElementById('bmiHeight').value);
            
            if (weight > 0 && heightCm > 0) {
                const heightM = heightCm / 100;
                const bmi = (weight / (heightM * heightM)).toFixed(1);
                
                let category = '';
                let color = '';
                
                if (bmi < 18.5) {
                    category = 'Underweight (Time to bulk up!)';
                    color = '#facc15';
                } else if (bmi >= 18.5 && bmi < 24.9) {
                    category = 'Normal weight (Keep it up!)';
                    color = '#2ECC71';
                } else if (bmi >= 25 && bmi < 29.9) {
                    category = 'Overweight (Let\'s shred!)';
                    color = '#fb923c';
                } else {
                    category = 'Obese (Join our fat loss program!)';
                    color = '#ef4444';
                }

                const resultBox = document.getElementById('bmiResult');
                resultBox.innerHTML = `<h3 style="color: ${color}; font-size: 28px;">BMI: ${bmi}</h3><p style="margin-top: 10px;">${category}</p>`;
                resultBox.classList.add('active');
                
                // Show toast
                window.showToast("BMI Calculated!");
            }
        });
    }
});
