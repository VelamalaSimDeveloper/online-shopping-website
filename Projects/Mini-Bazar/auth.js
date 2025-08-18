const usersKey = 'minibazaar_users';
const loggedInUserKey = 'minibazaar_loggedInUser';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleFormLink = document.getElementById('toggle-form-link');
    const formTitle = document.getElementById('form-title');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordSubmit = document.getElementById('forgot-password-submit');
    const forgotPasswordStatus = document.getElementById('forgot-password-status');

    // Toggle between login and registration forms
    toggleFormLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.toggle('d-none');
        registerForm.classList.toggle('d-none');
        const isRegistering = registerForm.classList.contains('d-none');
        formTitle.textContent = isRegistering ? 'Login to Mini-BAZAAR' : 'Register for an Account';
        toggleFormLink.innerHTML = isRegistering ? 'Not a member? <a href="#">Register</a>' : 'Already a member? <a href="#">Login</a>';
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem(usersKey)) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem(loggedInUserKey, JSON.stringify(user));
            alert('Login successful! Redirecting to products page.');
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password.');
        }
    });

    // Handle Registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const users = JSON.parse(localStorage.getItem(usersKey)) || [];
        const userExists = users.some(u => u.email === email);

        if (userExists) {
            alert('This email is already registered. Please login.');
        } else {
            // RESTORED: Add purchaseHistory to the new user object
            const newUser = { email: email, password: password, cartItems: [], purchaseHistory: [] };
            users.push(newUser);
            localStorage.setItem(usersKey, JSON.stringify(users)); 
            alert('Registration successful! You can now log in.');
            loginForm.classList.remove('d-none');
            registerForm.classList.add('d-none');
            formTitle.textContent = 'Login to Mini-BAZAAR';
            toggleFormLink.innerHTML = 'Not a member? <a href="#">Register</a>';
        }
    });

    // Handle Forgot Password
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgot-password-modal'));
        forgotPasswordModal.show();
    });

    forgotPasswordSubmit.addEventListener('click', () => {
        const email = document.getElementById('forgot-email').value;
        const users = JSON.parse(localStorage.getItem(usersKey)) || [];
        const user = users.find(u => u.email === email);
        if (user) {
            forgotPasswordStatus.textContent = `Password hint: Your password is "${user.password}". Please remember it next time.`;
            forgotPasswordStatus.classList.remove('text-danger');
            forgotPasswordStatus.classList.add('text-success');
        } else {
            forgotPasswordStatus.textContent = 'Email not found.';
            forgotPasswordStatus.classList.remove('text-success');
            forgotPasswordStatus.classList.add('text-danger');
        }
    });
});