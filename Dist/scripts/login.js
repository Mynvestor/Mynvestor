
// Login Form
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form inputs
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Error elements
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');

    // Reset error messages
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    toast.classList.remove('show', 'success', 'error');

    // Validation
    let isValid = true;

    // Username: Not empty
    if (!username) {
        usernameError.style.display = 'block';
        isValid = false;
    }

    // Password: At least 6 characters
    if (password.length < 6) {
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (!isValid) {
        // Show error toast for validation failure
        toast.classList.add('error');
        toastIcon.className = 'bi bi-exclamation-circle';
        toastMessage.textContent = 'Please fix the errors in the form.';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show', 'error');
        }, 1000); // Hide toast after 3 seconds
        return;
    }

    // Show success toast
    toast.classList.add('success');
    toastIcon.className = 'bi bi-check-circle';
    toastMessage.textContent = 'Login Successful!';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show', 'success');
    }, 1000); // Hide toast after 3 seconds

    // Redirect to investor.html
    setTimeout(() => {
        window.location.href = '../../main/investor/investor.html';
    }, 1000); // Delay redirect to show toast
});
