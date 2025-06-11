const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = registrationForm.email.value;
  const name = registrationForm.name.value;
  const password = registrationForm.password.value;
  const confirmPassword = registrationForm.confirmPassword.value;

  // Optional: Basic validation
  if (!email || !name || !password || !confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Passwords do not match.",
    });
    return;
  }
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Passwords do not match.",
    });
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
      Swal.fire({
        icon: "success",
        title: "Yay!",
        text: "We have sent you a verification email. Please check your inbox.",
      });

      //   window.location.href = "/web";
    } else {
      console.log(data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data?.message || "An error occurred. Please try again.",
      });
    }
  } catch (error) {
    // console.error("Registration error:", error);
    // alert("An error occurred. Please try again.");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred. Please try again.",
    });
  }
});
