import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    let valid = true;
    let tempErrors = { email: "", password: "" };

    if (!email) {
      tempErrors.email = "Please enter your email.";
      valid = false;
    }

    if (!password) {
      tempErrors.password = "Please enter your password.";
      valid = false;
    }

    const user = JSON.parse(localStorage.getItem("users")) || {};
    const userCheck = user[email];

    if (email && !userCheck) {
      tempErrors.email = "User not found. Please register.";
      valid = false;
    }
    if (userCheck && password && userCheck.password !== password) {
      tempErrors.password = "Incorrect password.";
      valid = false;
    }
    setErrors(tempErrors);
    if (!valid) return;

    localStorage.setItem("currentUser", email);
    navigate("/profile");
  };
  return (
    <div className="container">
      <div className="head">
        <p className="title">
          Signin to your <br /> PopX account
        </p>
      </div>
      <div className="description">
        <p>
          Lorem ipsum dolor sit amet cons tetur, adipisicing elit doloremque
        </p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email address"
            name="email"
            type="email"
            value={loginData.email}
            placeholder="Enter email address"
            required
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            placeholder="Enter password"
            required
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <div className="btn-container">
            <button className="loginbtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
