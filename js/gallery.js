const mainGallery = document.querySelector(".my-main-gallery");
const searchGallery = document.querySelector(".my-search-gallery");
const searchList = document.querySelector(".my-search-plants");
const searchInput = document.getElementById("my-search-input");
const cartQuantityElement = document.querySelectorAll(".my-cart-quantity");
const cartSumElement = document.querySelectorAll(".my-cart-sum");

document.addEventListener("DOMContentLoaded", function () {
  // fetch my plants.json data
  fetchPlantsData().then((plantsData) => {
    createStarRating();

    // Render plants for each category
    renderPlantsByType("indoor", "my-indoor-plants", plantsData);
    renderPlantsByType("climbing", "my-climbing-plants", plantsData);
    renderPlantsByType("bulbs", "my-bulbs-plants", plantsData);
    renderPlantsByType("fruit-herbs", "my-fruit-plants", plantsData);
    renderPlantsByType("trees", "my-trees-plants", plantsData);

    // Event listener for search input
    searchInput.addEventListener("input", function () {
      handleSearchPlants(plantsData);
    });

    // Add event listener to detect clicks outside search input and clear results
    document.addEventListener("click", handleClickOutsideSearch);

    // Event listeners for quantity buttons
    document.body.addEventListener("click", handleClickQuantity);

    // Event listeners for "Add to Cart" button
    document.body.addEventListener("click", (event) =>
      handleClickAddCart(event, plantsData)
    );
  });

  updateCartInfo();
});

// function for fetching data from JSON
function fetchPlantsData() {
  return fetch("plants.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Failed to fetch plants data:", error);
    });
}

// Function to create star rating
function createStarRating(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="${
      i <= rating ? "my-star my-filled" : "my-star"
    }">★</span>`;
  }
  return stars;
}

// Function to render plants by type
function renderPlantsByType(type, containerClass, plantsData) {
  const container = document.querySelector(`.${containerClass}`);
  container.innerHTML = ""; // Clear previous content

  // Filter plants by type
  const filteredPlants = plantsData.filter((plant) => plant.type === type);

  // Filter the plants by type if filteredPlants are provided, otherwise use full data
  const plantsToRender =
    filteredPlants || plantsData.filter((plant) => plant.type === type);
  plantsToRender.forEach((plant) => {
    const plantHTML = createPlantList(plant);
    container.innerHTML += plantHTML;
  });
}

// Function to handle form search
function handleSearchPlants(plantsData) {
  mainGallery.classList.add("visually-hidden");
  searchGallery.classList.remove("visually-hidden");
  const searchTerm = searchInput.value.toLowerCase();

  // Filter plants based on search term
  const filteredPlants = plantsData.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm)
  );

  // Render plants for each category
  renderPlantsBySearch(filteredPlants);
}

// Function to render all plants without filtering
function renderPlantsBySearch(plantsData) {
  searchList.innerHTML = ""; // Clear previous content

  if (plantsData.length === 0) {
    searchList.innerHTML = `<li class="py-2 px-1">No plants found matching your search criteria.</li>`;
    return;
  }

  plantsData.forEach((plant) => {
    const plantHTML = createPlantList(plant);
    searchList.innerHTML += plantHTML;
  });
}

// Function to handle clicks outside the search input
function handleClickOutsideSearch(event) {
  if (
    !searchInput.contains(event.target) &&
    !searchGallery.contains(event.target)
  ) {
    // Clear search results and hide the search gallery
    searchGallery.classList.add("visually-hidden");
    mainGallery.classList.remove("visually-hidden");
    searchInput.value = ""; // Reset the input field
    searchList.innerHTML = ""; // Clear the search results
  }
}

// Function to handle quantity of products
function handleClickQuantity(event) {
  // Handle adding quantity
  if (event.target.classList.contains("my-add-btn")) {
    const quantityElement = event.target.previousElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent, 10);
    quantityElement.textContent = currentQuantity + 1;
  }

  // Handle subtracting quantity
  if (event.target.classList.contains("my-subtract-btn")) {
    const quantityElement = event.target.nextElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent, 10);

    // Ensure quantity doesn't go below 1
    if (currentQuantity > 1) {
      quantityElement.textContent = currentQuantity - 1;
    }
  }
}

// Function to handle adding products to cart
function handleClickAddCart(event, plantsData) {
  if (event.target.classList.contains("my-add-to-cart-btn")) {
    const plantItem = event.target.closest(".my-plant-item");
    const plantId = event.target.getAttribute("data-plant-id");
    const quantityElement = plantItem.querySelector(".my-quantity");
    const currentQuantity = parseInt(quantityElement.textContent, 10);

    // Find the plant in plantsData
    const plant = plantsData.find((p) => p.id === String(plantId)); // Ensure we are comparing strings

    // Check if plant was found
    if (!plant) {
      console.error("Plant not found in data"); // Log the error
      return; // Exit if plant is not found
    }

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingPlantIndex = currentCart.findIndex(
      (item) => item.id === plantId
    );

    if (existingPlantIndex !== -1) {
      // If the plant is already in the cart, increase its quantity
      currentCart[existingPlantIndex].quantity += currentQuantity;
    } else {
      // If not, add it to the cart
      currentCart.push({ ...plant, quantity: currentQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert("Item added to cart!");

    updateCartInfo();
  }
}

// Function to create plant HTML
function createPlantList(plant) {
  return `
    <li class="my-plant-item d-flex flex-column justify-content-between  position-relative rounded-1">
      ${
        plant.discounted
          ? `<img src="images/garden-plants/discounted.png" alt="Discount" class="my-discounted position-absolute">`
          : ""
      }
      <div id="carousel-${
        plant.id
      }" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            ${plant.src
              .map(
                (image, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${image}" class="d-block w-100 rounded-1" alt="${
                  plant.name
                }" style="width:150px; height:300px;">
            </div>
            `
              )
              .join("")}
        </div>
        ${
          plant.src.length > 1
            ? `<button class="carousel-control-prev custom-carousel-control" type="button" aria-label="Previous" data-bs-target="#carousel-${plant.id}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next custom-carousel-control" type="button" aria-label="Next" data-bs-target="#carousel-${plant.id}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button >`
            : ""
        }
        <p class="mb-0 text-center">${createStarRating(plant.rating)}</p>
      </div>
      <div class="p-3">  
          <h4 class="fs-5 fw-bold">${plant.name}</h4>
          <p class="mb-0">Price:<span class="fw-bold my-price-text"> &euro;${
            plant.price
          }</span></p>
          <p class="my-2 fw-medium fs-5" style="color: ${
            plant.availability ? "green" : "red"
          };">${plant.availability ? "In Stock" : "Out of Stock"}</p>
          <div class="my-container-quantity d-flex gap-3 align-items-center">
              <span>Quantity</span>
              <button class="my-subtract-btn btn fw-bold fs-5 p-2" aria-label="Subtract quantity" ${
                !plant.availability ? "disabled" : ""
              }>&minus;</button>    
              <span class="my-quantity fw-medium fs-5">${
                plant.availability ? "1" : "0"
              }</span>
              <button class="my-add-btn btn fw-bold fs-5 p-2" aria-label="Add quantity" ${
                !plant.availability ? "disabled" : ""
              }>&plus;</button> 
          </div>
          <div class="d-flex justify-content-center"> <button class="my-add-to-cart-btn btn text-white fs-5 fw-medium px-5 py-2 mt-2" aria-label="Add to cart" data-plant-id="${
            plant.id
          }"  ${!plant.availability ? "disabled" : ""}>Add to Cart</button> 
          </div> 
      </div>
    </li>
    `;
}

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
      element.textContent = `Total: €${totalSum}`;
    });
  }
}
