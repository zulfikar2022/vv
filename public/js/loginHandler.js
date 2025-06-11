const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page reload

  loginButton.innerText = "Logging in...";
  loginButton.disabled = true;

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // Optional: Basic validation
  if (!email || !password) {
    alert("Please fill in both fields.");
    loginButton.innerText = "Login";
    loginButton.disabled = false;
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
    loginButton.innerText = "Login";
    loginButton.disabled = false;
    console.error("Login error:", error);
    alert("An error occurred. Please try again.");
  }
});
