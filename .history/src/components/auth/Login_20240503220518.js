import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_user } from "../../managers/userManager";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    login_user(username, password)
      .then((token) => {
        if (token.valid) {
          localStorage.setItem("game_collection_user", JSON.stringify(token));
          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      })
      .catch((error) => {
        window.alert("Login error: " + error.message);
      });
  };

  // Move the return statement inside the Login component function
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-heading">Login</h2>
        <fieldset className="form-item">
          <label htmlFor="username-input">Username: </label>
          <input
            className="form-input"
            type="text"
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>
        <fieldset className="form-item">
          <label htmlFor="password-input">Password: </label>
          <input
            className="form-input"
            type="password"
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset className="form-btn">
          <button
            className="login-btn"
            type="submit"
            disabled={!username.trim() || !password.trim()}
          >
            Login
          </button>
        </fieldset>
      </form>
      <div className="message-container">
        <h4>Not a user yet?</h4>
        <button className="register-link" onClick={() => navigate("/register")}>
          Click Here To Register
        </button>
      </div>
    </div>
  );
};