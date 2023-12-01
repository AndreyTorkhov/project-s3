import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

export default observer(function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useContext(Context);

  return (
    <div className="row">
      <h1 className="container-title">Регистрация</h1>
      <form className="register-container">
        <div className="row">
          <div className="input-field">
            <h3 className="input-name">Имя пользователя</h3>
            <input
              id="username"
              type="text"
              className="validate"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <h3 className="input-name">Email</h3>
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
            <h3 className="input-name">Пароль</h3>
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
      <Link to="/" className="register">
        <button
          onClick={() => store.registration(username, email, password)}
          className="btn"
        >
          Зарегистрироваться
        </button>
      </Link>
    </div>
  );
});
