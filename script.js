document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const scrollUp = document.querySelector('.scroll-up');
    const scrollDown = document.querySelector('.scroll-down');

    // Function to update navigation state
    function updateNavigation() {
        const currentSection = document.querySelector('.section.active');
        const currentIndex = Array.from(sections).indexOf(currentSection);

        // Update arrows state
        scrollUp.classList.toggle('disabled', currentIndex === 0);
        scrollDown.classList.toggle('disabled', currentIndex === sections.length - 1);

        // Update nav items
        navItems.forEach((nav, index) => {
            nav.classList.toggle('active', index === currentIndex);
        });
    }

    // Navigation click handlers
    scrollUp.addEventListener('click', function() {
        const currentSection = document.querySelector('.section.active');
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex > 0) {
            sections.forEach(section => section.classList.remove('active'));
            sections[currentIndex - 1].classList.add('active');
            updateNavigation();
        }
    });

    scrollDown.addEventListener('click', function() {
        const currentSection = document.querySelector('.section.active');
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex < sections.length - 1) {
            sections.forEach(section => section.classList.remove('active'));
            sections[currentIndex + 1].classList.add('active');
            updateNavigation();
        }
    });

    // Navigation items click handler
    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            sections.forEach(section => section.classList.remove('active'));
            sections[index].classList.add('active');
            updateNavigation();
        });
    });

    // Initial navigation state
    updateNavigation();

    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");

    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
            .then(function() {
                // Show success message
                alert('Message sent successfully!');
                form.reset();
            }, function(error) {
                // Show error message
                alert('Failed to send message. Please try again.');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });

    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Only mark as touched after user interacts with the field and leaves it
        input.addEventListener('blur', function() {
            this.classList.add('touched');
        });

        // Remove touched class when user starts typing again
        input.addEventListener('focus', function() {
            this.classList.remove('touched');
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const invalidInputs = this.querySelectorAll('input:invalid, textarea:invalid');
            invalidInputs.forEach(input => {
                input.classList.add('touched');
            });
        });
    }
});

function createPortfolio() {
    return {
        name: 'Omar Yoness',
        role: 'Frontend Developer',
        passion: 'Creating awesome UIs',
        compile: function() {
            return `Hello! I'm ${this.name}, a ${this.role} who loves ${this.passion}`;
        }
    }
}

function triggerCompile() {
    const effect = document.querySelector('.compilation-effect');
    const output = document.querySelector('.output');
    const portfolio = createPortfolio();
    
    // Show compilation effect
    effect.classList.add('active');
    
    // Simulate compilation
    output.innerHTML = '> Compiling...';
    
    setTimeout(() => {
        // Show result
        output.innerHTML = `> ${portfolio.compile()}`;
        effect.classList.remove('active');
    }, 1000);
}

function evaluateCode() {
    const codeInput = document.querySelector('.code-input').value;
    const output = document.querySelector('.output');
    const effect = document.querySelector('.compilation-effect');

    effect.classList.add('active');
    output.innerHTML = '> Compiling...';

    setTimeout(() => {
        try {
            const evalFunction = new Function(`
                "use strict";
                ${codeInput}
            `);
            
            const result = evalFunction();
            // Create a sentence from the object
            const sentence = `Hi, I'm ${result.name}, a ${result.role} passionate about ${result.passion}`;
            output.innerHTML = `> ${sentence}`;
            output.classList.remove('error');
        } catch (error) {
            output.innerHTML = `> Error: ${error.message}`;
            output.classList.add('error');
        }
        effect.classList.remove('active');
    }, 1000);
}

// Initialize code editor
function initCodeEditor() {
    const textarea = document.querySelector('.code-input');
    textarea.value = `const portfolio = {
    name: 'Omar Yoness',
    role: 'Frontend Developer',
    passion: 'Creating awesome UIs'
}

return portfolio;`;
}

// Initialize when page loads
window.onload = initCodeEditor; 