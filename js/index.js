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
