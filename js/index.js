// Placehilder-wave

const placeholders = document.querySelectorAll(".placeholder-wave");

placeholders.forEach((element) => {
  element.onload = function () {
    element.classList.remove("placeholder-wave");
  };

  if (element.complete) {
    element.onload();
  }
});

// add symbol "*" for the required field in my form

document.addEventListener("DOMContentLoaded", function () {
  const requiredFields = document.querySelectorAll(
    "input[required], textarea[required]"
  );

  requiredFields.forEach(function (field) {
    const label = document.querySelector(`label[for="${field.id}"]`);

    if (label) {
      const star = document.createElement("span");
      star.textContent = " *";
      star.style.color = "red";
      star.style.fontWeight = "bold";

      label.appendChild(star);
    }
  });
});

// behavior of the form after submission - outputting data to the console, calling toast and clearing form data

document.querySelector(".my-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  console.log(
    `Email: ${formData.get("email")}\n` +
      `Name: ${formData.get("name")}\n` +
      `Phone: ${formData.get("phone")}\n` +
      `Subject: ${formData.get("subject")}\n` +
      `Message: ${formData.get("message")}`
  );

  const toastElement = document.getElementById("successToast");
  const toast = new bootstrap.Toast(toastElement);
  toast.show();

  event.currentTarget.reset();
});
