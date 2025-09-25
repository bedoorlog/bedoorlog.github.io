// Mobile Navigation

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}

navSlide();

// Typewriter Effect
document.addEventListener('DOMContentLoaded', () => {
    // Define the texts for the typewriter
    const line1_part1 = "Hallo daar! ";
    const line1_part2 = " Ik ben";
    const line2Text = "Jesse Verhave";
    const line3Text = "🔗 Expert in IT, Systems and Devices,";
    const line4Text = "🔎 Best Effort ICT Troubleshooter,";
    const line5Text = "💻 Ervaren in Microsoft Intune.";
    
    // Get the elements
    const line1 = document.getElementById('typewriter-line1');
    const line2 = document.getElementById('typewriter-line2');
    const line3 = document.getElementById('typewriter-line3');
    const line4 = document.getElementById('typewriter-line4');
    const line5 = document.getElementById('typewriter-line5');
    const button = document.querySelector('.btn');

    const typeSpeed = 40;
    const delayBetweenLines = 200;

    // Improved typewriter function
    function typeWriter(element, text, callback) {
        let i = 0;
        element.classList.add('typewriter-cursor');
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typeSpeed);
            } else {
                element.classList.remove('typewriter-cursor');
                if (callback) {
                    setTimeout(callback, delayBetweenLines);
                }
            }
        }
        type();
    }

    // Start the typing sequence
    typeWriter(line1, line1_part1, () => {
        // Add the animated emoji after the first part
        const waveSpan = document.createElement('span');
        waveSpan.className = 'wave';
        waveSpan.innerHTML = '👋';
        line1.appendChild(waveSpan);

        // Type the second part of the line into a new span to continue the effect
        const tempSpan = document.createElement('span');
        line1.appendChild(tempSpan);
        typeWriter(tempSpan, line1_part2, () => {
            // After line 1 is complete, type line 2
            typeWriter(line2, line2Text, () => {
                // After line 2, type line 3
                typeWriter(line3, line3Text, () => {
                    typeWriter(line4, line4Text, () => {
                        typeWriter(line5, line5Text, () => {
                            // Finally, reveal the button
                            button.classList.remove('btn-hidden');
                            button.classList.add('btn-visible');
                        });
                    });
                });
            });
        });
    });
});

// Contact Form Functionality
// You can configure your email address here:
const YOUR_EMAIL_ADDRESS = 'jesseverhave2809@gmail.com';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_r5he6hp';
const EMAILJS_TEMPLATE_ID = 'template_ae00ygx'; // You'll need to provide this
const EMAILJS_PUBLIC_KEY = 'yxWPp3fW03VM87XDp'; // You'll need to provide this

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Validate required fields
            if (!name || !email || !message) {
                formStatus.textContent = 'Vul alle velden in voordat je het bericht verzendt.';
                formStatus.className = 'form-status error';
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 3000);
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.contact-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bezig met verzenden...';
            submitBtn.disabled = true;

            try {
                // EmailJS integration
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    to_email: YOUR_EMAIL_ADDRESS,
                    message: message,
                    reply_to: email
                };

                console.log('📧 Sending email with parameters:', templateParams);

                // Send email using EmailJS
                const result = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                );

                console.log('📧 EmailJS response:', result);

                if (result.status === 200) {
                    // Show success message
                    formStatus.textContent = 'Bericht succesvol verzonden! Ik neem snel contact met je op.';
                    formStatus.className = 'form-status success';

                    // Reset form
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }, 5000);
                } else {
                    throw new Error('Email sending failed');
                }

            } catch (error) {
                console.error('📧 EmailJS Error:', error);
                console.error('📧 Error details:', {
                    message: error.message,
                    status: error.status,
                    text: error.text
                });

                // Show error message
                formStatus.textContent = 'Sorry, er is een fout opgetreden bij het verzenden. Probeer het opnieuw of e-mail mij direct.';
                formStatus.className = 'form-status error';

                // Hide error message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Console message to show email configuration
console.log('📧 Contact Form Configuration:');
console.log('📧 Your email address is set to:', YOUR_EMAIL_ADDRESS);
console.log('📧 To change your email address, edit the YOUR_EMAIL_ADDRESS variable in script.js');
console.log('📧 For production use, consider using EmailJS, Formspree, or a backend service.');
