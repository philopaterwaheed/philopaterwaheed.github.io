// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.get('name').trim()) {
            errors.push('Name is required');
        }
        
        if (!formData.get('email').trim()) {
            errors.push('Email is required');
        } else if (!isValidEmail(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.get('subject').trim()) {
            errors.push('Subject is required');
        }
        
        if (!formData.get('message').trim()) {
            errors.push('Message is required');
        }
        
        return errors;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message to user
    function showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Insert at the beginning of the form
        contactForm.insertBefore(messageDiv, contactForm.firstChild);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);

        // Scroll to top of form to show message
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            showMessage(errors.join('. '), 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            showMessage('Thank you for your message! I\'ll get back to you as soon as possible.', 'success');

            // Reset form
            contactForm.reset();

            // I'll deploy a server soon for that

        }, 2000); // Simulate network delay
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.classList.remove('error');
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');

        // Remove existing error styling
        field.classList.remove('error');

        if (isRequired && !value) {
            field.classList.add('error');
            return false;
        }

        if (field.type === 'email' && value && !isValidEmail(value)) {
            field.classList.add('error');
            return false;
        }

        return true;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add some interactive animations
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });

    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.classList.add('fade-in');
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    .contact-item {
        opacity: 0;
        transform: translateX(-20px);
        animation: slideInLeft 0.6s ease forwards;
    }

    @keyframes slideInLeft {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .social-icon {
        opacity: 0;
        transform: scale(0.8);
        animation: scaleIn 0.6s ease forwards;
    }

    @keyframes scaleIn {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
