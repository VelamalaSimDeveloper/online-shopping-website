const mainDiv = document.getElementById("productsList");

const fetchData = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    displayData(data.products);
}

fetchData();

function displayData(data) {
    mainDiv.textContent = "";
    data.forEach((val) => {
        const proDiv = document.createElement('div');
        proDiv.classList.add('product');
        const proImage = document.createElement('img');
        proImage.src = val.thumbnail;
        const proTitle = document.createElement('h2');
        proTitle.textContent = val.title;
        const proPrice = document.createElement('p');
        proPrice.textContent = "Price: ₹" + val.price;
        const proLink = document.createElement('a');
        proLink.append(proTitle);
        proLink.href = `./product.html?pid=${val.id}`;
        const proButton = document.createElement('button');
        proButton.textContent = "ADD to Cart";
        proButton.addEventListener("click", () => {
            let user = getLoggedInUser();
            if (user) {
                user.cartItems.push(val);
                updateCartItems(user.cartItems);
                alert('Item added to cart!');
            } else {
                alert('Please log in to add items to your cart.');
                window.location.href = 'login.html';
            }
        });
        proDiv.append(proImage, proLink, proPrice, proButton);
        mainDiv.appendChild(proDiv);
    });
}

function fetchCategories() {
    fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((o) => {
                const op = document.createElement("option");
                op.value = o.slug;
                op.textContent = o.name;
                document.getElementById('cat').append(op);
            });
        });
}

fetchCategories();

document.getElementById('cat').addEventListener('input', function (e) {
    fetch(`https://dummyjson.com/products/category/${e.target.value}`)
        .then((res) => res.json())
        .then((data) => displayData(data.products))
        .catch((err) => console.log(err));
});