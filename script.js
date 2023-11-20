"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const outputText = document.getElementById("outputText");
  const uploadedImage = document.getElementById("uploadedImage");
  const imageContainer = document.getElementById("imageContainer");
  const submitButton = document.getElementById("submitButton");

  let currentIndex = 0;
  let intervalId;

  // Функция для сохранения изображения в локальное хранилище
  function saveImageToLocalStorage() {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        let savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
        savedImages.push(imageData);
        localStorage.setItem("savedImages", JSON.stringify(savedImages));
      };
      reader.readAsDataURL(file);
    }
  }
  let textToInput;

  // Функция для отправки изображения на сервер
  function sendImageToServer() {
    const savedImage = localStorage.getItem("savedImage");

    if (savedImage) {
      fetch("/recognition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: savedImage }),
      })
        .then((response) => response.json())
        .then((data) => {
          textToInput = data;
          console.log(data);
        })
        .catch((error) => {
          console.error("Ошибка отправки изображения на сервер:", error);
        });
    }
  }

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
        if (currentIndex < textToInput.length) {
          outputText.textContent += textToInput[currentIndex];
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

  submitButton.addEventListener("click", () => {
    if (!imageInput.files[0]) {
      const modal = document.getElementById("myModal");
      if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block";
      }
    } else {
      saveImageToLocalStorage();
      sendImageToServer();
      currentIndex = 0;
      clearInterval(intervalId);
      outputText.textContent = "";
      intervalId = setInterval(() => {
        if (currentIndex < textToInput.length) {
          outputText.textContent += textToInput[currentIndex];
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
