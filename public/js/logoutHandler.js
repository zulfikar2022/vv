const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async () => {
  Swal.fire({
    title: "Are you sure to logout?",
    text: "You will need to log in again to access your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Log Out!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch("/web/logout", { method: "POST" });
        const data = await res.json();
        if (data.success) {
          window.location.href = "/web/login";
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message || "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Network error. Please check your connection and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  });
});
