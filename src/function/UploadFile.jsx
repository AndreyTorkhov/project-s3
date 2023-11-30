import React, { useState } from "react";

export const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState();

  const hadleChange = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("http://localhost:3000/recognition", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setUploaded(data);
  };

  return (
    <>
      <form method="post" id="form-input" encType="multipart/form-data">
        <p id="input-parag" className="parag">
          *изображение должно быть в формате jpg, jpeg или pdf
        </p>
        <label className="input-file">
          <input
            type="file"
            id="imageInput"
            accept=".jpg, .jpeg, .pdf"
            onChange={hadleChange}
          />
          <span>Выберите файл</span>
        </label>
      </form>
      <button className="outputBtn" onClick={handleUpload}>
        Старт
      </button>

      {uploaded && (
        <div>
          <h2>{uploaded.fileName}</h2>
          <img src="input file" alt={uploaded.filePath} width="300" />
        </div>
      )}
    </>
  );
};
