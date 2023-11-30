// import { PrintImage } from "../function/PrintImage";
import { UploadFile } from "../function/UploadFile";

function Ml() {
  return (
    <div className="container">
      <h1 className="container-title">Чтение текста с картинки</h1>
      <UploadFile />
      {/* <PrintImage /> */}
    </div>
  );
}

export { Ml };
