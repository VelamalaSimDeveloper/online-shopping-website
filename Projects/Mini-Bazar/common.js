
const usersKey = 'minibazaar_users';
const loggedInUserKey = 'minibazaar_loggedInUser';

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem(loggedInUserKey));
}

function updateLoggedInUser(user) {
    const users = JSON.parse(localStorage.getItem(usersKey)) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem(usersKey, JSON.stringify(users));
        localStorage.setItem(loggedInUserKey, JSON.stringify(user));
    }
}

function getCurrentUserCart() {
    const user = getLoggedInUser();
    return user ? user.cartItems : [];
}

function updateCartItems(cartArr) {
    let user = getLoggedInUser();
    if (user) {
        user.cartItems = cartArr;
        updateLoggedInUser(user);
    }
    updateCartCount();
}

function updateCartCount() {
    const headCount = document.getElementById("headCount");
    if (headCount) {
        const user = getLoggedInUser();
        if (user) {
            headCount.textContent = user.cartItems.length;
        } else {
            headCount.textContent = 0;
        }
    }
}

// Handles login status and page redirection
function checkLoginStatus() {
    const currentUser = getLoggedInUser();
    const currentPage = window.location.pathname.split('/').pop();

    if (!currentUser && currentPage !== 'login.html') {
        window.location.href = 'login.html';
    }
}

// Updates the nav bar based on login status
function updateNavBar() {
    const navUl = document.querySelector('nav .navbar-nav');
    const currentUser = getLoggedInUser();
    
    if (!navUl) return;
    
    navUl.innerHTML = '';
    
    const productsLi = document.createElement('li');
    productsLi.classList.add('nav-item');
    productsLi.innerHTML = `<a href="./index.html" class="nav-link text-white">Products</a>`;
    navUl.appendChild(productsLi);

    const cartLi = document.createElement('li');
    cartLi.classList.add('nav-item');
    cartLi.innerHTML = `<a href="./cart.html" class="nav-link text-white">Cart: <span id="headCount"></span></a>`;
    navUl.appendChild(cartLi);

    const historyLi = document.createElement('li');
    historyLi.classList.add('nav-item');
    historyLi.innerHTML = `<a href="./purchase-history.html" class="nav-link text-white">History</a>`;
    navUl.appendChild(historyLi);

    const contactLi = document.createElement('li');
    contactLi.classList.add('nav-item');
    contactLi.innerHTML = `<a href="./contact.html" class="nav-link text-white">Contact</a>`;
    navUl.appendChild(contactLi);

    if (currentUser) {
        const userLi = document.createElement('li');
        userLi.classList.add('nav-item');
        userLi.innerHTML = `<span class="nav-link text-white text-capitalize">${currentUser.email.split('@')[0]}</span>`;
        navUl.appendChild(userLi);

        const logoutLi = document.createElement('li');
        logoutLi.classList.add('nav-item');
        const logoutBtn = document.createElement('button');
        logoutBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        logoutBtn.textContent = 'Logout';
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem(loggedInUserKey);
            window.location.href = 'login.html';
        });
        logoutLi.appendChild(logoutBtn);
        navUl.appendChild(logoutLi);
    } else {
        const loginLi = document.createElement('li');
        loginLi.classList.add('nav-item');
        loginLi.innerHTML = `<a href="./login.html" class="nav-link text-white btn btn-primary">Login</a>`;
        navUl.appendChild(loginLi);
    }
    
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    updateNavBar();
});
