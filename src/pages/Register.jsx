import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import "../styles/register.css";

export default observer(function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { store } = useContext(Context);
  const navigate = useNavigate();

  const validateUsername = () => {
    if (username.length < 6) {
      setUsernameError("Имя пользователя должно содержать не менее 6 символов");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Введите корректный адрес электронной почты");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "Пароль должен содержать не менее 6 символов, 1 строчную, 1 заглавную букву и 1 спецзнак"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleRegistration = () => {
    validateUsername();
    validateEmail();
    validatePassword();

    if (!usernameError && !emailError && !passwordError) {
      store.registration(username, email, password);
      navigate("/");
    } else {
      alert("Пожалуйста, заполните форму корректно");
    }
  };

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
              onBlur={validateUsername}
            />
            <p className="error-message">{usernameError}</p>
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
              onBlur={validateEmail}
            />
            <p className="error-message">{emailError}</p>
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
              onBlur={validatePassword}
            />
            <p className="error-message">{passwordError}</p>
          </div>
        </div>
      </form>
      <button onClick={handleRegistration} className="registerBtn">
        далее
      </button>
    </div>
  );
});
