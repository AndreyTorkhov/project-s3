import { UploadFile } from "../function/UploadFile";
import { Link } from "react-router-dom";

function Ml() {
  return (
    <div className="container">
      <h1 className="container-title">Чтение текста с картинки</h1>
      <UploadFile />
      <div className="login">
        <Link to={`/login`} className="btn">
          Авторизация
        </Link>
      </div>
    </div>
  );
}

export { Ml };
