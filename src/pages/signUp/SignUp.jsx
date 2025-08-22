import React, { useState } from "react";
import "./Signup.css";
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
  const [errors, setErrors] = useState({
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
    let tempErrors = {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      companyName: "",
      agency: "",
    };
    let valid = true;
    if (!fullName) {
      tempErrors.fullName = "Please enter your full name.";
      valid = false;
    }

    if (!phone) {
      tempErrors.phone = "Please enter your phone number.";
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      tempErrors.phone = "Phone number must be 10 digits.";
      valid = false;
    }

    if (!email) {
      tempErrors.email = "Please enter your email.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = "Invalid email.";
        valid = false;
      }
    }

    if (!password) {
      tempErrors.password = "Please enter your password.";
      valid = false;
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    if (!companyName) {
      tempErrors.companyName = "Please enter your company name.";
      valid = false;
    }

    if (!agency) {
      tempErrors.agency = "Please select if you are an agency.";
      valid = false;
    }
    setErrors(tempErrors);
    return valid;
  };

  // handle register
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const User = JSON.parse(localStorage.getItem("users")) || {};
    if (User[userData.email]) {
      setErrors((prev) => ({ ...prev, email: "Email already exists." }));
      return;
    }
    // save the user
    User[userData.email] = userData;
    localStorage.setItem("users", JSON.stringify(User));
    localStorage.setItem("currentUser", userData.email);

    navigate("/profile");

    // reset form
    setUserData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      companyName: "",
      agency: "",
    });

    setErrors({
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
        <p className="title">
          Create your <br /> PopX account
        </p>
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
          {errors.fullName && <p className="error">{errors.fullName}</p>}
          <InputField
            label="Phone number"
            name="phone"
            type="text"
            value={userData.phone}
            placeholder="8787676767"
            required
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <InputField
            label="Email address"
            name="email"
            type="email"
            value={userData.email}
            placeholder="marry@mail.com"
            required
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            placeholder="Enter password"
            required
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <InputField
            label="Company name"
            name="companyName"
            type="text"
            value={userData.companyName}
            placeholder="Enter company name"
            required
            onChange={handleChange}
          />
          {errors.companyName && <p className="error">{errors.companyName}</p>}

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
            {errors.agency && <p className="error">{errors.agency}</p>}
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
