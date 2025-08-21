import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
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
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("users")) || {};
    const userCheck = user[email];
    if (!userCheck) {
      toast.error("User not found.Please Register");
      return;
    }
    if (userCheck.password !== password) {
      toast.error("Incorrect password.");
      return;
    }
    localStorage.setItem("currentUser", email);
    toast.success("Login successfully!");
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
          <InputField
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            placeholder="Enter password"
            required
            onChange={handleChange}
          />
          <div className="btn-container">
            <button className="loginbtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
