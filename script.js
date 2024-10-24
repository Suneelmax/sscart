let cart = [];
let total = 0;
const conversionRate = 83; // 1 dollar = 83 rupees

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = 
            `<span>${item.name} - ₹${(item.price * conversionRate).toFixed(2)} x <input type="number" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)"></span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartDiv.appendChild(itemDiv);
    });

    document.getElementById('total').textContent = `Total: ₹${(total * conversionRate).toFixed(2)}`;
}

function updateQuantity(name, quantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}
