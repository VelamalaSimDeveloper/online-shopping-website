document.addEventListener('DOMContentLoaded', () => {
    const user = getLoggedInUser();
    const userEmailSpan = document.getElementById('user-email');
    if (user && userEmailSpan) {
        userEmailSpan.textContent = user.email;
    }
});