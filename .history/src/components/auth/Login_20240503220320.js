import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_user } from "../../managers/userManager";

export const login_user = async (username, password) => {
  try {
    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      // Handle non-success responses
      const errorData = await response.text();
      throw new Error(`Authentication failed: ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error authenticating:', error);
    throw error;
  }
};

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
          <button className="login-btn" type="submit" disabled={!username.trim() || !password.trim()}>
            Login
          </button>
        </fieldset>
      </form>
      <div className="message-container">
        <h4>Not a user yet?</h4>
        <button
          className="register-link"
          onClick={() => navigate("/register")}
        >
          Click Here To Register
        </button>
      </div>
    </div>
  )
}