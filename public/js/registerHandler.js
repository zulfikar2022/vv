const registrationForm = document.getElementById("registrationForm");
const submitButton = document.getElementById("submitButton");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitButton.innerText = "Registering...";
  submitButton.disabled = true;

  const emailField = registrationForm.email;
  const nameField = registrationForm.name;
  const passwordField = registrationForm.password;
  const confirmPasswordField = registrationForm.confirmPassword;

  const email = registrationForm.email.value;
  const name = registrationForm.name.value;
  const password = registrationForm.password.value;
  const confirmPassword = registrationForm.confirmPassword.value;

  // Optional: Basic validation
  if (!email || !name || !password || !confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields are required.",
    });
    submitButton.innerText = "Register";
    submitButton.disabled = false;
    return;
  }
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Passwords do not match.",
    });
    submitButton.innerText = "Register";
    submitButton.disabled = false;
    return;
  }
  try {
    // Example: Programmatic registration logic (fake endpoint used here)
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await response.json();
    if (data.success) {
      submitButton.innerText = "Register";
      submitButton.disabled = false;

      emailField.value = "";
      nameField.value = "";
      passwordField.value = "";
      confirmPasswordField.value = "";

      Swal.fire({
        icon: "success",
        title: "Yay!",
        text: "We have sent you a verification email. Please check your inbox.",
      });
    } else {
      submitButton.innerText = "Register";
      submitButton.disabled = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data?.message || "An error occurred. Please try again.",
      });
    }
  } catch (error) {
    // console.error("Registration error:", error);
    // alert("An error occurred. Please try again.");
    submitButton.innerText = "Register";
    submitButton.disabled = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred. Please try again.",
    });
  }
});
