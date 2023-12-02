import { useContext, useEffect } from "react";
import UploadFile from "../function/UploadFile";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";

function Ml() {
  const { store } = useContext(Context);
  const navigation = useNavigate();

  useEffect(() => {
    store.checkAuth().then(() => {
      if (!localStorage.getItem("token_access")) {
        navigation("/login");
      }
    });
  }, [store, navigation]);

  return (
    <div className="container">
      <h1 className="container-title">Чтение текста с картинки</h1>
      <UploadFile />
      <div className="login">
        <Link to={`/login`} className="btn">
          Авторизация
        </Link>
        <Link to={`/register`} className="btn">
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export { Ml };
