const orderSummaryEl = document.getElementById('orderSummary');
const totalAmountPaidEl = document.getElementById('totalAmountPaid');

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = getCurrentUserCart();
    
    // Calculate total
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    totalAmountPaidEl.textContent = total.toFixed(2);

    // Display order summary
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

    // Save current cart as a new order in purchase history
    if (cartItems.length > 0) {
        let user = getLoggedInUser();
        if (user) {
            // Ensure the purchaseHistory array exists
            if (!user.purchaseHistory) {
                user.purchaseHistory = [];
            }
            const newOrder = {
                date: new Date().toISOString(),
                total: total,
                items: cartItems
            };
            user.purchaseHistory.push(newOrder);
            updateLoggedInUser(user);
        }
    }

    // Clear the cart from the logged-in user's profile
    updateCartItems([]);
});