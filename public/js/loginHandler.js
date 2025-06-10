const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page reload

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // Optional: Basic validation
  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    // Example: Programmatic login logic (fake endpoint used here)
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      window.location.href = "/web";
    }

    // if (response.success) {
    //   alert("Login successful!");
    //   // You can redirect or update UI here
    // } else {
    //   alert(data.message || "Login failed.");
    // }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again.");
  }
});
