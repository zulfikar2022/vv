const copyButtons = document.querySelectorAll(".copyButton");

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
