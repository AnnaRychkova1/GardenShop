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

// Behavior of the form after submission - outputting data to the console, calling toast and clearing form data

document.querySelector(".my-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  // Clear all previous error messages
  document.querySelectorAll(".invalid-feedback").forEach(function (el) {
    el.classList.remove("show-error");
  });

  // Re-validate all fields again on submit
  if (!validateEmail()) isValid = false;
  if (!validateName()) isValid = false;
  if (!validatePhone()) isValid = false;
  if (!validateSubject()) isValid = false;
  if (!validateMessage()) isValid = false;

  // If everything is correct, submit the form

  if (isValid) {
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
    document.querySelector(".my-form").submit();
  }
});

// ERROR FORM HANDLING

// Function for email validation
function validateEmail() {
  const email = document.getElementById("inputEmail");
  const emailError = document.getElementById("emailError");

  // Check for validity
  if (!email.validity.valid) {
    // Check if the field is empty
    if (email.validity.valueMissing) {
      emailError.textContent = "Email is required.";

      // Check for validity
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "Please enter a valid email address.";
    } else {
      emailError.textContent = "Invalid email format.";
    }

    emailError.classList.add("show-error");
    return false;
  } else {
    emailError.classList.remove("show-error");
    return true;
  }
}

// Function for name validation (min 3 symbol, max 10 symbol)
function validateName() {
  const name = document.getElementById("inputName");
  const nameError = document.getElementById("nameError");

  // Check if the field is empty
  if (name.validity.valueMissing) {
    nameError.textContent = "Name is required."; // Error message for empty field
    nameError.classList.add("show-error");
    return false;
  }

  // Check the length
  if (name.value.length < 3 || name.value.length > 10) {
    nameError.textContent = "Name must be between 3 and 10 characters.";
    nameError.classList.add("show-error");
    return false;
  }

  // If all checks pass, remove error messages
  nameError.classList.remove("show-error");
  return true;
}

// Function for phone number validation (10 numbers)
function validatePhone() {
  const phone = document.getElementById("inputPhone");
  const phoneError = document.getElementById("phoneError");

  // Check the length
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.value)) {
    phoneError.textContent = "Phone number must be exactly 10 digits.";
    phoneError.classList.add("show-error");
    return false;
  } else {
    phoneError.classList.remove("show-error");
    return true;
  }
}

// Function for subject validation (min 3 symbol, max 20 symbol)
function validateSubject() {
  const subject = document.getElementById("inputSubject");
  const subjectError = document.getElementById("subjectError");

  // Check if the field is empty
  if (!subject.value) {
    subjectError.textContent = "Subject is required.";
    subjectError.classList.add("show-error");
    return false;

    // Check the length
  } else if (subject.value.length < 3 || subject.value.length > 20) {
    subjectError.textContent = "Subject must be between 3 and 20 characters.";
    subjectError.classList.add("show-error");
    return false;
  } else {
    subjectError.classList.remove("show-error");
    return true;
  }
}

// Function for message validation (min 6 symbol, max 500 symbol)
function validateMessage() {
  const message = document.getElementById("inputMessage");
  const messageError = document.getElementById("messageError");

  // Check if the field is empty
  if (!message.value) {
    messageError.textContent = "Message is required.";
    messageError.classList.add("show-error");
    return false;

    // Check the length
  } else if (message.value.length < 6 || message.value.length > 500) {
    messageError.textContent = "Message must be between 6 and 500 characters.";
    messageError.classList.add("show-error");
    return false;
  } else {
    messageError.classList.remove("show-error");
    return true;
  }
}

// Validate each field on blur (when focus is lost) or when the Enter key is pressed
document.getElementById("inputEmail").addEventListener("blur", validateEmail);
document.getElementById("inputName").addEventListener("blur", validateName);
document.getElementById("inputPhone").addEventListener("blur", validatePhone);
document
  .getElementById("inputSubject")
  .addEventListener("blur", validateSubject);
document
  .getElementById("inputMessage")
  .addEventListener("blur", validateMessage);

// Also adding handling for the Enter key press
document.querySelectorAll(".form-control").forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      switch (input.id) {
        case "inputEmail":
          validateEmail();
          break;
        case "inputName":
          validateName();
          break;
        case "inputPhone":
          validatePhone();
          break;
        case "inputSubject":
          validateSubject();
          break;
        case "inputMessage":
          validateMessage();
          break;
      }
    }
  });
});
