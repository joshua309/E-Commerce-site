// Basic Cart Logic
let cart = [];

// Load cart from localStorage if it exists
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

// Function to add products to the cart
function addToCart(productName, price, quantity) {
    quantity = parseInt(quantity); // Ensure quantity is an integer

    // Check if product already exists in cart
    let existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count display
    updateCartCount();
    alert(`${productName} has been added to your cart!`);
}

// Function to update the cart item count in the header
function updateCartCount() {
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart display and count
    updateCartDisplay();
    updateCartCount();
}

// Function to update the cart display on the cart page
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>Price: KSh ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalPrice += item.price * item.quantity;
    });

    totalPriceContainer.textContent = `Total: KSh ${totalPrice}`;
}

// Function to handle checkout
function checkout() {
    if (cart.length > 0) {
        alert('Checkout successful!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    } else {
        alert('Your cart is empty!');
    }
}

// Call these functions when the page loads
window.onload = function() {
    updateCartCount();
    updateCartDisplay();
}
