let cart = JSON.parse(localStorage.getItem('cart')) || [];

//! Cart sayını yeniləmək
function updateCartCount() {
    const count = cart.length;
    document.getElementById('cart-count').innerText = count;
}

//! Səbət məlumatlarını göstərmək
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="product">
                <h3>${item.title}</h3>
                <p>Price: ${item.price} USD</p>
                <p>Quantity: 
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalPrice.innerText = total.toFixed(2);
}

//! Məhsulun sayını dəyişmək
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

//! Məhsulu səbətdən silmək
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

//! İlk funksiyaları işə salmaq
displayCart();
updateCartCount();