document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');
    const user = getLoggedInUser();

    if (!user || !user.purchaseHistory || user.purchaseHistory.length === 0) {
        historyList.innerHTML = `<p class="text-center text-muted">You have no past orders.</p>`;
        return;
    }

    user.purchaseHistory.forEach((order, index) => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('card', 'mb-4', 'shadow-sm');
        orderCard.innerHTML = `
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Order #${index + 1}</h5>
                <small>${new Date(order.date).toLocaleString()}</small>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    ${order.items.map(item => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <img src="${item.thumbnail}" alt="${item.title}" style="width: 50px; height: auto; margin-right: 10px;">
                                <span>${item.title}</span>
                            </div>
                            <span>₹${item.price}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <strong>Total:</strong>
                <span class="fs-5">₹${order.total.toFixed(2)}</span>
            </div>
        `;
        historyList.appendChild(orderCard);
    });
});