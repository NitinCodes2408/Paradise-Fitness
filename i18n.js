document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('languageSelector');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangDisplay = document.querySelector('.current-lang');
    
    // Initialize language
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(currentLang);

    // Dropdown toggle logic
    if (langSelector) {
        langSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (langSelector) langSelector.classList.remove('active');
    });

    // Language selection logic
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            if (langSelector) langSelector.classList.remove('active');
        });
    });

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Update UI display
        if (currentLangDisplay) {
            const selectedOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
            if (selectedOption) {
                currentLangDisplay.innerHTML = selectedOption.innerHTML;
            }
        }

        // Apply translations
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // If it's an input or textarea, update placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        // Special case: Typing animation
        const typingText = document.querySelector('.typing-text');
        if (typingText && translations[lang]['hero_typing']) {
            typingText.setAttribute('data-text', translations[lang]['hero_typing']);
            // Restart typing animation if it exists in advanced.js
            if (typeof typeWriter === 'function') {
                typingText.textContent = '';
                typeWriter();
            }
        }

        // Add fade transition effect
        document.body.classList.add('switching-lang');
        setTimeout(() => {
            document.body.classList.remove('switching-lang');
        }, 300);
    }
});