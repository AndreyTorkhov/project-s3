import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Дополнительная логика после успешного входа, например, редирект на другую страницу
      } else {
        console.error("Login failed");
        // Дополнительная логика в случае неудачного входа
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
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
      <button className="outputBtn" onClick={handleLogin}>
        Вход
      </button>
    </div>
  );
}

export { Login };
