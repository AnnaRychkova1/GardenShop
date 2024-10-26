# 🏡 GardenShop

## :dart: Overview

This project is created as a comprehensive web application for showcasing and selling garden plants. The application features various sections to provide users with detailed information about plants, an interactive shopping cart, and a means to contact support.

The application consists of three main pages:

- **Home Page**: General introduction to the site and links to the main tips - delivery, reading blog, how to garden, social media etc.
- **Garden Plants Page**: A catalog showcasing garden plants with detailed descriptions, images, and pricing.
- **Contact Us Page**: A contact information, family history, work hours, feedback form and google-map.

## :star: Features

- **Plant Cards**: Each plant is displayed with an image, name, price, availability status, and an option to add to the cart. The data for the product images is sourced from a custom JSON file.
- **Image Carousel**: Users can view multiple images of each plant in a modal with navigation buttons to switch between images.
- **Responsive Design**: The website is fully responsive, ensuring a seamless experience across devices.
- **Real-time Cart Updates**: The shopping cart displays real-time data, including the total number of items and the total price, sourced from local storage.
- **Modal for Enlarged Images**: Clicking on a product image opens a modal displaying a larger version of the image.
- **Form Validation**: The contact form validates all input fields to ensure users provide correct data.
- **Dropdown Cart Selection**: A dropdown list allows users to select their query type when contacting the support team.

## :computer: Technical Stack

### :large_blue_diamond: Front-end

<p>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
</a>
<a href="https://www.w3schools.com/w3css/" target="_blank" rel="noreferrer">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html" width="40" height="40"/>
</a>
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css" width="40" height="40"/>
</a>
</p>

### :large_blue_diamond: Tools

- **Local Storage**: Utilized for saving cart data, including total items and total price, which updates in real-time.
- **Image Carousel**: Bootstrap's carousel component for displaying plant images.
- **Modal**: Custom modal for displaying larger images of plants with navigation controls.
- **Form Validation**: Basic JavaScript for form validation to check all input fields.

```javascript
// Function for phone number validation (10 numbers)
function validatePhone() {
  const phone = document.getElementById("inputPhone");
  const phoneError = document.getElementById("phoneError");
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.value)) {
    phoneError.textContent = "Phone number must be exactly 10 digits.";
    phoneError.classList.add("my-show-error");
    return false;
  } else {
    phoneError.classList.remove("my-show-error");
    return true;
  }
}
```

### :large_blue_diamond: Utilities

<a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" target="_blank" rel="noreferrer">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original-wordmark.svg" alt="bootstrap" width="40" height="40" />       
</a>
<a href="https://github.com" target="_blank" rel="noreferrer">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg" alt="github" width="40" height="40" />
</a>

## Completed by:
**Anna Rychkova**  
[![Static Badge](https://img.shields.io/badge/GitHub-0A66C2?style=flat&logo=github&logoColor=black&labelColor=white&color=181717&link=https%3A%2F%2Fgithub.com%2FAnnaRychkova1)](https://www.linkedin.com/in/annarychkova1/)
[![Static Badge](https://img.shields.io/badge/LinkedIn%20-%230A66C2?style=flat&logo=linkedin&logoColor=%230A66C2&labelColor=white&color=%230A66C2&link=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fannarychkova1%2F)](https://www.linkedin.com/in/annarychkova1/)

This project is part of the "Web Design" module from the Higher Diploma in Science in Computing program at

# NCI  <a href="https://github.com" target="_blank" rel="noreferrer"><img src="images/NCI_logo.png" alt="bootstrap" width="100" height="40" /></a>
