document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});
