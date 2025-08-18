const mainDiv = document.getElementById("cartList");

function displayData(data) {
    mainDiv.textContent = '';
    data.forEach((p, i) => {
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cartItem');
        const cartImage = document.createElement('img');
        cartImage.src = p.thumbnail;
        cartImage.alt = p.title;
        const cartTitle = document.createElement('h2');
        cartTitle.textContent = p.title;
        const cartPrice = document.createElement('p');
        cartPrice.textContent = "₹" + p.price;
        const cartRemoveButton = document.createElement('button');
        cartRemoveButton.textContent = "❎";
        cartRemoveButton.addEventListener('click', () => removeCart(i));
        cartDiv.append(cartImage, cartTitle, cartPrice, cartRemoveButton);
        mainDiv.appendChild(cartDiv);
    });
}

function updatePrice(data) {
    const totalPrice = data.reduce((prev, curr) => prev + curr.price, 0).toFixed(2);
    document.getElementById('total').textContent = "₹" + totalPrice;
}

function removeCart(ind) {
    let cartItems = getCurrentUserCart();
    cartItems.splice(ind, 1);
    updateCartItems(cartItems);
    displayData(cartItems);
    updatePrice(cartItems);
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = getCurrentUserCart();
    displayData(cartItems);
    updatePrice(cartItems);
});