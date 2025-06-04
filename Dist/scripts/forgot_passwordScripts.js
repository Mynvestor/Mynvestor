
        // Function to show toast notification
        function showToast(message, type = 'success', duration = 3000) {
            const toast = document.getElementById('toast');
            const toastIcon = document.getElementById('toastIcon');
            const toastMessage = document.getElementById('toastMessage');

            // Set message and icon
            toastMessage.textContent = message;
            toastIcon.className = `bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}`;

            // Set toast type (success or error)
            toast.className = `toast ${type} show`;

            // Hide toast after duration
            setTimeout(() => {
                toast.classList.remove('show');
            }, duration);
        }

        document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value.trim();
            const emailError = document.getElementById('resetEmailError');

            emailError.style.display = 'none';

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.style.display = 'block';
                return;
            }

            // Simulate sending reset link
            showToast(`Password reset link sent to ${email}. Please check your inbox.`, 'success');
            this.reset();

            // Redirect to login after toast
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
