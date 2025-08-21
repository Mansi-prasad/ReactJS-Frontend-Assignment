import React, { useState } from "react";
import "./SignUp.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    agency: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleRadioChange = (e) => {
    setUserData((prev) => ({ ...prev, agency: e.target.value }));
  };
  const validate = () => {
    const { fullName, email, password, phone, companyName, agency } = userData;
    if (!fullName || !email || !password || !phone || !companyName || !agency) {
      toast.error("Please fill all the required field.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email.");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const User = JSON.parse(localStorage.getItem("users")) || {};
    if (User[userData.email]) {
      toast.error("Email Already exists.");
    }
    // save the user
    User[userData.email] = userData;
    localStorage.setItem("users", JSON.stringify(User));
    localStorage.setItem("currentUser", userData.email);
    toast.success("Account created successfully!");
    navigate("/profile");
    setUserData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      companyName: "",
      agency: "",
    });
  };
  return (
    <div className="container">
      <div className="head">
        <h1 className="title">
          Create your <br /> PopX account
        </h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>

          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            value={userData.fullName}
            placeholder="Marry doe"
            required
            onChange={handleChange}
          />

          <InputField
            label="Phone number"
            name="phone"
            type="text"
            value={userData.phone}
            placeholder="8787676767"
            required
            onChange={handleChange}
          />

          <InputField
            label="Email address"
            name="email"
            type="email"
            value={userData.email}
            placeholder="marry@mail.com"
            required
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            placeholder="Enter password"
            required
            onChange={handleChange}
          />

          <InputField
            label="Company name"
            name="companyName"
            type="text"
            value={userData.companyName}
            placeholder="Enter company name"
            required
            onChange={handleChange}
          />
          <div className="agency">
            <label>
              Are you an Agency? <span className="required">*</span>
            </label>
            <div className="radio-options">
              <label htmlFor="agency-yes">
                <input
                  type="radio"
                  id="agency-yes"
                  value="yes"
                  name="agency"
                  checked={userData.agency === "yes"}
                  required
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label htmlFor="agency-no">
                <input
                  type="radio"
                  id="agency-no"
                  value="no"
                  name="agency"
                  checked={userData.agency === "no"}
                  required
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>
          <div className="bottom-container">
            <button className="submit-button">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
