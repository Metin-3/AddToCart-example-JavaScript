const apiUrl = 'https://fakestoreapi.com/products';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//! Cart sayını yeniləmək
function updateCartCount() {
    const count = cart.length;
    document.getElementById('cart-count').innerText = count;
}

//! Məhsulları göstərmək
async function fetchProducts() {
    try {
        const response = await axios.get(apiUrl);
        const products = response.data;
        const productList = document.getElementById('product-list');

        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.price} USD</p>
                <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

//! Məhsulu səbətə əlavə etmək
function addToCart(id, title, price) {
    const existingItem = cart.find((item) => item.id === id);
    if (!existingItem) {
        cart.push({ id, title, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

//! İlk funksiyaları işə salmaq
fetchProducts();
updateCartCount();

//! Səbət səhifəsinə yönləndirmək
document.querySelector('.cart-icon').onclick = () => {
    window.location.href = './assets/pages/cart.html';
};