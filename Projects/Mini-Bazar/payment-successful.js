const orderSummaryEl = document.getElementById('orderSummary');
const totalAmountPaidEl = document.getElementById('totalAmountPaid');

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = getCurrentUserCart();
    
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    totalAmountPaidEl.textContent = total.toFixed(2);

    orderSummaryEl.innerHTML = '';
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
        itemDiv.innerHTML = `
            <span>${item.title}</span>
            <span>₹${item.price}</span>
        `;
        orderSummaryEl.appendChild(itemDiv);
    });

    // Clear the cart from the logged-in user's profile
    updateCartItems([]);
});