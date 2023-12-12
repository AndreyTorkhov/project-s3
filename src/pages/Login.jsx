import { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import "../styles/login.css";

export default observer(function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  return (
    <div className="row">
      <h1 className="container-title">Авторизация</h1>
      <form className="login-container">
        <div className="row">
          <div className="input-field">
            <h3 className="input-name">email</h3>
            <input
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <h3 className="input-name">пароль</h3>
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </form>
      <Link to="/register">
        <button className="registerBtn">
          <span>регистрация</span>
        </button>
      </Link>
      <Link to="/">
        <button
          className="outputBtn"
          onClick={() => store.login(email, password)}
        >
          Вход
        </button>
      </Link>
    </div>
  );
});
