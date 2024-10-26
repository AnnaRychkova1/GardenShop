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
