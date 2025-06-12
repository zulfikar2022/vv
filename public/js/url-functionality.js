const copyButtons = document.querySelectorAll(".copyButton");
const deleteButtons = document.querySelectorAll(".btnDelete");
const userId = document.getElementById("userId").value;
const urlForm = document.getElementById("urlForm");
const generateShortUrlButton = document.getElementById(
  "generateShortUrlButton"
);

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
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  });
});

urlForm.addEventListener("submit", (event) => {
  event.preventDefault();
  generateShortUrlButton.disabled = true;
  generateShortUrlButton.textContent = "Generating...";
  const urlField = document.getElementById("url");
  const url = urlField.value.trim();
  if (!url) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter a URL.",
    });
    generateShortUrlButton.disabled = false;
    generateShortUrlButton.textContent = "Generate Short URL";
    return;
  }
  try {
    const requestUrl = `https://www.viralvabi.com/api/users/${userId}/urls`;
    console.log(requestUrl);
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actual_url: url }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          generateShortUrlButton.disabled = false;
          generateShortUrlButton.textContent = "Generate Short URL";
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Failed to create URL.",
          });
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        generateShortUrlButton.disabled = false;
        generateShortUrlButton.textContent = "Generate Short URL";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create URL.",
        });
      });
  } catch (error) {
    generateShortUrlButton.disabled = false;
    generateShortUrlButton.textContent = "Generate Short URL";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An unexpected error occurred.",
    });
  }
});
