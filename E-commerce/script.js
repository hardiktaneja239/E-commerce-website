let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the message container with dynamic messages
function showMessage(message) {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        messageContainer.textContent = message;
        setTimeout(() => {
            messageContainer.textContent = ''; // Hide message after 5 seconds
        }, 5000); // Hide after 5 seconds
    }
}

// Add item to cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
}

function buyNow(productName, price) {
    addToCart(productName, price); // Add to cart first
    window.location.href = "checkout.html"; // Redirect to checkout immediately
}


// Display items in the cart
function displayCart() {
    let cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

if (document.getElementById("cart-items")) {
    displayCart();
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
let selectedSize = null;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Size selection
function selectSize(element, size) {
    document.querySelectorAll('.size-box').forEach(box => box.classList.remove('selected'));
    element.classList.add('selected');
    selectedSize = size;
}

// Add to Cart with size validation
function addToCartWithSize(productName, productPrice) {
    if (!selectedSize) {
        // Show message to prompt size selection
        showMessage("Please select a size before adding to cart.");
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: productPrice, size: selectedSize });
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show confirmation message
    showMessage(`${productName} (Size: ${selectedSize}) added to cart!`);
}

// Load cart on page load
document.addEventListener("DOMContentLoaded", function() {
  loadCart();
});

// Load cart items
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartTable = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");
  cartTable.innerHTML = ""; // Clear previous data

  let total = 0;
  cart.forEach((item, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.size}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td><button class="remove-button" onclick="removeFromCart(${index})">Remove</button></td>
      `;
      cartTable.appendChild(row);
      total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // Refresh cart
}

// Load checkout items
document.addEventListener("DOMContentLoaded", function() {
  loadCheckout();
});

function loadCheckout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orderTable = document.getElementById("order-items");
  let orderTotal = document.getElementById("order-total");
  orderTable.innerHTML = ""; // Clear previous data

  let total = 0;
  cart.forEach((item) => {
      let row = document.createElement("tr");
      row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.size}</td>
          <td>$${item.price.toFixed(2)}</td>
      `;
      orderTable.appendChild(row);
      total += item.price;
  });

  orderTotal.textContent = total.toFixed(2);
}

// Place order
function placeOrder() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let zip = document.getElementById("zip").value;
  let paymentMethod = document.getElementById("payment-method").value;

  if (!name || !email || !address || !city || !zip) {
      // Show message to prompt user to complete the form
      showMessage("Please fill in all the details to proceed.");
      return;
  }

  // Order Confirmation (Message instead of alert)
  showMessage(`Thank you, ${name}! Your order has been placed successfully.`);
  
  // Clear cart after placing the order
  localStorage.removeItem("cart");
  window.location.href = "index.html"; // Redirect to homepage
}
