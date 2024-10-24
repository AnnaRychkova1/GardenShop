document.addEventListener("DOMContentLoaded", function () {
  // catch my plants.json data as response
  fetch("/plants.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((plantsData) => {
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

      // Function to create plant HTML
      function createPlantHTML(plant) {
        return `
            <li class="my-plant-item d-flex flex-column justify-content-between  position-relative rounded-1">
            ${
              plant.discounted
                ? `<img src="images/garden-plants/discounted.png" alt="Discount" class="my-discounted position-absolute">`
                : ""
            }
            <div id="carousel-${plant.name.replace(
              /\s+/g,
              ""
            )}" class="carousel carousel-dark slide" data-bs-ride="carousel">
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
             ? `<button class="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#carousel-${plant.name.replace(
                 /\s+/g,
                 ""
               )}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next custom-carousel-control" type="button" data-bs-target="#carousel-${plant.name.replace(
          /\s+/g,
          ""
        )}" data-bs-slide="next">
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
                <button class="my-subtract-btn fw-bold fs-5 p-2" ${
                  !plant.availability ? "disabled" : ""
                }>&minus;</button>    
                <span class="my-quantity fw-medium fs-5">${
                  plant.availability ? "1" : "0"
                }</span>
                <button class="my-add-btn fw-bold fs-5 p-2" ${
                  !plant.availability ? "disabled" : ""
                }>&plus;</button> 
            </div>
            <div class="d-flex justify-content-center"> <button class="my-add-to-cart-btn btn text-white fs-5 fw-medium px-5 py-2 mt-2" ${
              !plant.availability ? "disabled" : ""
            }>Add to Cart</button> </div> 
        </div>
      </li>
    `;
      }

      // Function to render plants by type
      function renderPlantsByType(type, containerClass) {
        const container = document.querySelector(`.${containerClass}`);
        const filteredPlants = plantsData.filter(
          (plant) => plant.type === type
        );
        filteredPlants.forEach((plant) => {
          const plantHTML = createPlantHTML(plant);
          container.innerHTML += plantHTML;
        });
      }

      // Render plants for each category
      renderPlantsByType("indoor", "my-indoor-plants");
      renderPlantsByType("climbing", "my-climbing-plants");
      renderPlantsByType("bulbs", "my-bulbs-plants");
      renderPlantsByType("fruit-herbs", "my-fruit-plants");
      renderPlantsByType("trees", "my-trees-plants");

      // Event listeners for quantity buttons and "Add to Cart" buttons
      document.body.addEventListener("click", function (event) {
        // Handle adding quantity
        if (event.target.classList.contains("my-add-btn")) {
          console.log("hi");
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

        // Handle adding to cart
        if (event.target.classList.contains("my-add-to-cart-btn")) {
          alert("Item added to cart!");
        }
      });
    });
});
