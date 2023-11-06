"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const outputText = document.getElementById("outputText");
  const uploadedImage = document.getElementById("uploadedImage");
  const imageContainer = document.getElementById("imageContainer");
  const submitButton = document.getElementById("submitButton");

  let textToType = "Саня - гей";
  let currentIndex = 0;
  let intervalId;

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.src = e.target.result;
        uploadedImage.style.maxHeight = "300px";
        imageContainer.style.textAlign = "center";
      };
      reader.readAsDataURL(file);
    }
  });

  submitButton.addEventListener("click", () => {
    currentIndex = 0;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (currentIndex < textToType.length) {
        outputText.textContent += textToType[currentIndex];
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);
  });

  imageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitButton.click();
    }
  });

  submitButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      currentIndex = 0;
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (currentIndex < textToType.length) {
          outputText.textContent += textToType[currentIndex];
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 100);
    }
  });
});
