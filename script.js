"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const outputText = document.getElementById("outputText");
  const uploadedImage = document.getElementById("uploadedImage");
  const imageContainer = document.getElementById("imageContainer");
  const submitButton = document.getElementById("submitButton");

  let textToType = "Текст с картинки";
  let currentIndex = 0;
  let intervalId;

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      outputText.textContent = "";
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.src = e.target.result;
        uploadedImage.style.maxHeight = "300px";
        imageContainer.style.textAlign = "center";
      };
      reader.readAsDataURL(file);
    }
  });

  submitButton.addEventListener(
    "click",
    () => {
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
    },
    { once: true }
  );

  imageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitButton.click();
    }
  });

  submitButton.addEventListener("click", (event) => {
    if (!imageInput.files[0]) {
      const modal = document.getElementById("myModal");
      if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block";
        event.preventDefault();
      }
    } else {
      currentIndex = 0;
      clearInterval(intervalId);
      outputText.textContent = "";
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
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  });
});
