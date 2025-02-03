// Placehilder-wave working just during the img or iframe is downloading
const placeholders = document.querySelectorAll(".placeholder-wave");

placeholders.forEach((element) => {
  element.onload = function () {
    element.classList.remove("placeholder-wave");
  };

  if (element.complete) {
    element.onload();
  }
});

// Scroll button
window.onscroll = function () {
  toggleScrollButton();
};

function toggleScrollButton() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

// Go to top on click
document.getElementById("scrollTopBtn").onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// notification on the top
document.addEventListener("DOMContentLoaded", function () {
  // create HTML for notification
  const notificationHTML = `
    <aside class="notification">
      <h2>Attention!
        <svg class="close-icon" aria-label="Info">
          <use href="images/symbol-defs.svg#info"></use>
        </svg>
      </h2>
      <p>
        This website has no affiliation with the mentioned online store. We are not responsible for the products, prices, or services provided through third-party websites.
      </p>
      <p>
        Please contact the store directly for any assistance or support. We are not official representatives of the store.
      </p>
      <p>
        If you have any questions, feel free to reach out to us via <a href="mailto:aanytkaa@gmail.com">email</a>.
      </p>
      <button class="close-btn" onclick="this.parentElement.style.display='none';" aria-label="Close">
        <svg class="close-icon" aria-label="Close">
          <use href="images/symbol-defs.svg#close"></use>
        </svg>
      </button>
    </aside>
  `;

  // get the container for the notification
  const container = document.getElementById("notification-container");

  // add notification to the container
  container.innerHTML = notificationHTML;
});
