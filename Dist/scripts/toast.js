
export function showToast(message, type = 'success' || 'error', duration = 1200) {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toastIcon.className = `bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}`;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}
