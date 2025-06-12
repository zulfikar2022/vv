const copyButtons = document.querySelectorAll(".copyButton");
const deleteButtons = document.querySelectorAll(".btnDelete");
const userId = document.getElementById("userId").value;

copyButtons.forEach((copyButton) => {
  copyButton.addEventListener("click", (event) => {
    const id = event.target.id;
    const key = id.split("-")[1];
    const linkId = `urlToCopy-${key}`;
    const linkSpan = document.getElementById(linkId);
    const link = linkSpan.textContent;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        const copyButton = document.getElementById(`key-${key}`);
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy short url";
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  });
});

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (event) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const id = event.target.id;
        const _id = id.split("-")[1];
        const hitUrl = `https://www.viralvabi.com/api/users/${userId}/urls/${_id}`;
        console.log(hitUrl);
        fetch(hitUrl, {
          method: "DELETE",
          credentials: "same-origin",
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.success) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message || "Failed to delete URL.",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  });
});
