const params = new URLSearchParams(window.location.search);
const pid = params.get('pid');

const fetchData = async () => {
    const res = await fetch(`https://dummyjson.com/products/${pid}`);
    const data = await res.json();
    displayData(data);
};

fetchData();

const leftDiv = document.getElementById('left');
const rightDiv = document.getElementById('right');

function displayData(data) {
    const proImage = document.createElement('img');
    proImage.src = data.thumbnail;
    proImage.alt = data.title;
    leftDiv.appendChild(proImage);
    const protitle = document.createElement('h2');
    protitle.textContent = data.title;
    const proDesc = document.createElement('p');
    proDesc.textContent = data.description;
    const proPrice = document.createElement('p');
    proPrice.textContent = "₹" + data.price;
    const addCartButton = document.createElement('button');
    addCartButton.textContent = "Add to Cart";
    addCartButton.addEventListener('click', () => {
        let user = getLoggedInUser();
        if (user) {
            user.cartItems.push(data);
            updateCartItems(user.cartItems);
            alert('Item added to cart!');
        } else {
            alert('Please log in to add items to your cart.');
            window.location.href = 'login.html';
        }
    });
    rightDiv.append(protitle, proDesc, proPrice, addCartButton);
}