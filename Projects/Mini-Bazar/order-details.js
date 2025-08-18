const itemCountEl = document.getElementById('itemCount');
const orderTotalEl = document.getElementById('orderTotal');

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = getCurrentUserCart();
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    itemCountEl.textContent = cartItems.length;
    orderTotalEl.textContent = total.toFixed(2);
});