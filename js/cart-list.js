const cartQuantityElement = document.querySelectorAll(".my-cart-quantity");
const cartSumElement = document.querySelectorAll(".my-cart-sum");
updateCartInfo();

// Function to render cart items from local storage
function renderCartItems() {
  const cartLists = document.querySelectorAll(".my-cart-list");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Iterate through all cart lists on the page
  cartLists.forEach((cartList) => {
    // Clear the previous list
    cartList.innerHTML = "";

    // Show a message if the cart is empty
    if (cart.length === 0) {
      cartList.innerHTML = "<li class='dropdown-item'>Your cart is empty.</li>";
    } else {
      // Render each item in the cart
      cart.forEach((item) => {
        const cartItemHTML = `
          <li class="dropdown-item my-cart-item d-flex justify-content-between align-items-center">
            <h4 class="fs-6 col-8 text-wrap">${item.name}</h4>
            <span class="fs-6 col-1">${item.quantity}</span>
            <button type="button" class="btn my-remove-item-btn col-1 py-1 fw-bolder d-flex align-items-center justify-content-center" aria-label="Delete" data-plant-id="${item.id}"><span>&times;</span></button>
          </li>
        `;
        cartList.innerHTML += cartItemHTML;
      });

      // Append the Clear Cart and Checkout buttons at the end of each list
      const actionsHTML = `
        <li class="dropdown-item text-center my-cart-actions">
          <button type="button" class="btn my-clear-cart-btn" aria-label="Clear Cart">Clear Cart</button>
          <button type="button" class="btn my-checkout-btn" aria-label="Checkout">Checkout</button>
        </li>
      `;
      cartList.innerHTML += actionsHTML;
    }
  });
}

// Function to remove an item from the cart
function removeCartItem(event) {
  if (event.target.classList.contains("my-remove-item-btn")) {
    const plantId = event.target.getAttribute("data-plant-id");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.id !== plantId);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    renderCartItems(); // Re-render the cart after removal
    updateCartInfo(); // Update the cart info on the main page if necessary
  }
}

// Function to clear the entire cart
function clearCart() {
  localStorage.removeItem("cart");
  renderCartItems(); // Re-render the cart to show it is empty
  updateCartInfo(); // Update the cart info on the main page if necessary
}

// Function to handle checkout (dummy implementation)
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to cart before checking out.");
    return;
  }
  alert("Proceeding to checkout...");
}

// Event listeners for cart actions
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems(); // Render cart items on page load

  // Event delegation for remove, clear, and checkout buttons in each cart list
  document.querySelectorAll(".my-cart-list").forEach((cartList) => {
    cartList.addEventListener("click", (event) => {
      if (event.target.classList.contains("my-remove-item-btn")) {
        removeCartItem(event);
      } else if (event.target.classList.contains("my-clear-cart-btn")) {
        clearCart();
      } else if (event.target.classList.contains("my-checkout-btn")) {
        handleCheckout();
      }
    });
  });
});

// Function to count quantity and sum in cart
function updateCartInfo() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSum = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (totalQuantity === 0) {
    cartQuantityElement.forEach((element) => {
      element.textContent = "";
    });
    cartSumElement.forEach((element) => {
      element.textContent = "Cart is empty";
    });
  } else {
    cartQuantityElement.forEach((element) => {
      element.textContent = totalQuantity;
    });
    cartSumElement.forEach((element) => {
      element.textContent = `€ ${totalSum}`;
    });
  }

  renderCartItems();
}
