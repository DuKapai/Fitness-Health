
document.getElementById('reset-cart').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCartDisplay();
    alert("Scan the code to pay!");
});

const addToCartButtons = document.querySelectorAll('.add-cart');

// Function to update cart information
function updateCart(productInfo) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productIndex = cartItems.findIndex(item => item.name === productInfo.name);

    if (productIndex !== -1) {
        cartItems[productIndex].quantity++;
    } else {
        cartItems.push({ ...productInfo, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

// Function to remove item from cart
function removeItemFromCart(productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.name !== productName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

// Function to update cart display on the page
function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalQuantity = 0;
    let totalPrice = 0;

    const cartDisplay = document.createElement('div');
    cartDisplay.classList.add('cart-display');

    if (cartItems.length === 0) {
        cartDisplay.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartDisplay.innerHTML = `<h2>Cart Items:</h2>`;
        cartItems.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
            cartDisplay.innerHTML += `
                <div class="cart-item">
                    <p>${item.name} x ${item.quantity} - $${item.price.toFixed(2)}</p>
                    <button class="remove-item" data-product="${item.name}">Remove</button>
                </div>
            `;
        });
        cartDisplay.innerHTML += `<h2>Total: ${totalQuantity} items - $${totalPrice.toFixed(2)}</h2>`;
    }

    const existingDisplay = document.querySelector('.cart-display');
    if (existingDisplay) {
        existingDisplay.parentNode.removeChild(existingDisplay);
    }
    document.body.appendChild(cartDisplay);

    // Add event listeners to remove item buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            removeItemFromCart(productName);
        });
    });
}

// Add click event listener to each "Add to cart" button
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productInfo = {
            name: button.parentNode.querySelector('h3').textContent,
            price: parseFloat(button.parentNode.querySelector('h2').textContent.slice(1)),
        };
        updateCart(productInfo);
    });
});

// Check if cart information exists in local storage and update display on load
updateCartDisplay();

document.getElementById('reset-cart').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCartDisplay();
    showQRCode(); // Thêm hàm này để hiển thị hình ảnh QR code sau khi bấm "Buy"
});

// Tạo QR code từ thông tin thanh toán
document.getElementById('reset-cart').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCartDisplay();
    showAlertWithImage("Thank you for your successful payment!", "../picture/QR_code.jpg"); // Hiển thị hình ảnh sau khi thanh toán thành công
});

// Hàm để hiển thị hộp thoại cảnh báo tùy chỉnh với hình ảnh
function showAlertWithImage(message, imageUrl) {
    // Tạo phần tử div cho hộp thoại
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('custom-alert');

    // Tạo phần tử hình ảnh
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl; // Đặt nguồn của hình ảnh
    imageElement.alt = 'Image';

    // Tạo phần tử văn bản cho thông báo
    const messageElement = document.createElement('p');
    messageElement.textContent = message;

    // Thêm hình ảnh và thông báo vào phần tử div
    alertDiv.appendChild(imageElement);
    alertDiv.appendChild(messageElement);

    // Hiển thị phần tử div
    document.body.appendChild(alertDiv);

    // Sau một khoảng thời gian, xóa phần tử div
    setTimeout(function() {
        alertDiv.remove();
    }, 6000); // 8000 milliseconds (3 seconds) sau đó xóa
}