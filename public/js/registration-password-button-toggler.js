document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const confirmPassword = document.getElementById("confirmPassword");

  function setupPasswordToggle(toggleBtn, passwordField) {
    toggleBtn.addEventListener("click", () => {
      const type =
        passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);
      toggleBtn.textContent = type === "password" ? "👁️" : "🙈";
    });
  }

  setupPasswordToggle(togglePassword, password);
  setupPasswordToggle(toggleConfirmPassword, confirmPassword);
});
