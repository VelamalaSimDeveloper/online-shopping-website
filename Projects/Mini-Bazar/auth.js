const usersKey = 'minibazaar_users';
const loggedInUserKey = 'minibazaar_loggedInUser';

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    users.push(user);
    localStorage.setItem(usersKey, JSON.stringify(users));
}

function findUser(email) {
    const users = JSON.parse(localStorage.getItem(usersKey)) || [];
    return users.find(user => user.email === email);
}

function loginUser(email, password) {
    const user = findUser(email);
    if (user && user.password === password) {
        localStorage.setItem(loggedInUserKey, JSON.stringify(user));
        return true;
    }
    return false;
}

function registerUser(email, password) {
    if (findUser(email)) {
        return false;
    }
    const newUser = {
        email,
        password,
        cartItems: []
    };
    saveUser(newUser);
    return true;
}