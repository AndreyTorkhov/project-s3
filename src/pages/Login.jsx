function Login() {
  return (
    <div className="row">
      <h1 className="container-title">Авторизация</h1>
      <form className="login-container">
        <div className="row">
          <div className="input-field">
            <h3 className="input-name">email</h3>
            <input id="email" type="email" className="validate" />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <h3 className="input-name">пароль</h3>
            <input id="password" type="password" className="validate" />
          </div>
        </div>
      </form>
      <button className="outputBtn">Вход</button>
    </div>
  );
}

export { Login };
