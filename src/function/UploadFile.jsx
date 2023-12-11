import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Preloader } from "../components/Preloader";

// import Store from "../store/store";

export default observer(function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const res = await fetch("http://localhost:5500/recognition", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
      },
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setUploaded(data);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form method="post" id="form-input" encType="multipart/form-data">
        <p id="input-parag" className="parag">
          *изображение должно быть в формате jpg, jpeg или png
        </p>
        <label className="input-file">
          <input
            type="file"
            id="imageInput"
            accept=".jpg, .jpeg, .png"
            onChange={hadleChange}
          />
          <span>Выберите файл</span>
        </label>
      </form>

      {imageSrc && (
        <img className="uploadedImage" src={imageSrc} alt="Selected" />
      )}

      <button className="outputBtn" onClick={handleUpload}>
        Старт
      </button>

      {loading && <Preloader />}

      {uploaded && (
        <div>
          <h2>{uploaded.response}</h2>
        </div>
      )}
    </div>
  );
});
