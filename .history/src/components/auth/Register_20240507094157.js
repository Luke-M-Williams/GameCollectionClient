import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_user, register_user } from "../../managers/userManager";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id.split('-')[0]]: value // Simplified to handle setting based on the id
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Check if all fields are filled
    const { first_name, last_name, username, email, password } = formData;
    const missingValues = [first_name, last_name, username, email, password].some(value => value === "");
  
    if (missingValues) {
      window.alert("Please fill out all fields before clicking Register.");
      return;
    }
  
    try {
      const registrationResult = await register_user(formData);
      if (registrationResult.token) {
        // Store the token and user information in localStorage
        const userCredentials = {
          token: registrationResult.token,
          valid: true,
          id: registrationResult.id,
          // Include any other relevant user data
        };
        localStorage.setItem("game_collection_user", JSON.stringify(userCredentials));
  
        // Navigate to the home page after successful registration
        navigate("/");
      } else {
        window.alert(registrationResult.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      window.alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="form-heading">Register</h2>
        {["first_name", "last_name", "username", "email", "password"].map(field => (
          <fieldset className="form-item" key={field}>
            <label htmlFor={`${field}-input`}>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}: </label>
            <input
              className="form-input"
              type={field === "password" ? "password" : "text"}
              id={`${field}-input`}
              value={formData[field]}
              onChange={handleInputChange}
            />
          </fieldset>
        ))}
        <fieldset className="form-btn">
          <button type="submit" className="register-btn">
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};