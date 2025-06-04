        // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburgerIcon = hamburger.querySelector('i');

        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburgerIcon.classList.toggle('bi-list');
            hamburgerIcon.classList.toggle('bi-x');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburgerIcon.classList.add('bi-list');
                hamburgerIcon.classList.remove('bi-x');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburgerIcon.classList.add('bi-list');
                hamburgerIcon.classList.remove('bi-x');
            }
        });

        // Contact Modal Functionality
        const openModalButton = document.querySelector('#openContactModal');
        const openModalButtonBottom = document.querySelector('#openContactModalBottom');
        const contactModal = document.querySelector('#contactModal');
        const closeModalButton = document.querySelector('#closeModal');
        const contactForm = document.querySelector('#contactForm');
        const toast = document.querySelector('#toast');

        openModalButton.addEventListener('click', () => {
            contactModal.classList.remove('hidden');
            contactModal.classList.add('show');
        });

        openModalButtonBottom.addEventListener('click', () => {
            contactModal.classList.remove('hidden');
            contactModal.classList.add('show');
        });

        closeModalButton.addEventListener('click', () => {
            contactModal.classList.remove('show');
            setTimeout(() => contactModal.classList.add('hidden'), 300);
        });

        // Close modal when clicking outside
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('show');
                setTimeout(() => contactModal.classList.add('hidden'), 300);
            }
        });

        // Handle form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://formspree.io/f/xzzrgopq', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    // Show toast notification
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000); // Hide toast after 3 seconds

                    // Reset form and close modal
                    contactForm.reset();
                    contactModal.classList.remove('show');
                    setTimeout(() => contactModal.classList.add('hidden'), 300);
                } else {
                    console.error('Form submission failed:', response.statusText);
                    alert('There was an error sending your message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            }
        });
