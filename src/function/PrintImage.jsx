// import React, { useState, useEffect } from "react";

// function PrintImage() {
//   const [imageSrc, setImageSrc] = useState("");
//   const [textToType, setTextToType] = useState("Текст с картинки");

//   useEffect(() => {
//     const imageInput = document.getElementById("imageInput");
//     const outputText = document.getElementById("outputText");
//     const uploadedImage = document.getElementById("uploadedImage");
//     const imageContainer = document.getElementById("imageContainer");

//     const handleImageChange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setImageSrc(e.target.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     };

//     imageInput.addEventListener("change", handleImageChange);

//     return () => {
//       // Очистите слушатели событий при размонтировании компонента
//       imageInput.removeEventListener("change", handleImageChange);
//     };
//   }, []); // Пустой массив зависимостей означает, что useEffect выполнится только один раз после монтирования компонента

//   const handleButtonClick = () => {
//     // Действия, когда кнопка "Старт" нажата
//     // Например, вывод текста
//     console.log("Text typed:", textToType);
//   };

//   return (
//     <div>
//       <div id="imageContainer" style={{ textAlign: "center" }}>
//         {imageSrc && (
//           <img
//             id="uploadedImage"
//             src={imageSrc}
//             alt="Uploaded"
//             style={{ maxHeight: "300px" }}
//           />
//         )}
//       </div>
//       <button className="outputBtn" onClick={handleButtonClick}>
//         Старт
//       </button>
//       <div id="outputText">{/* Вывод текста здесь */}</div>
//     </div>
//   );
// }

// export { PrintImage };
