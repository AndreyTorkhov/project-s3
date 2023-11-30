import React, { useState } from "react";

export const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const [imageSrc, setImageSrc] = useState(null);

  const hadleChange = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("http://localhost:5500/recognition", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setUploaded(data);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form method="post" id="form-input" encType="multipart/form-data">
        <p id="input-parag" className="parag">
          *изображение должно быть в формате jpg, jpeg, png или pdf
        </p>
        <label className="input-file">
          <input
            type="file"
            id="imageInput"
            accept=".jpg, .jpeg, .pdf, .png"
            onChange={hadleChange}
          />
          <span>Выберите файл</span>
        </label>
      </form>

      {imageSrc && (
        <img
          src={imageSrc}
          alt="Selected"
          style={{
            width: "300px",
            marginTop: "3rem",
            marginBottom: "3rem",
            display: "inline-block",
            alignSelf: "center",
            border: "1px solid",
          }}
        />
      )}

      <button className="outputBtn" onClick={handleUpload}>
        Старт
      </button>

      {uploaded && (
        <div>
          <h2>{uploaded.response}</h2>
        </div>
      )}
    </div>
  );
};
