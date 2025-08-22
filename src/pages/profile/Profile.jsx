import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const currentLoggedinEmail = localStorage.getItem("currentUser");
    // console.log("Current logged in email:", currentLoggedinEmail);
    // console.log("Users object:", users);
    if (currentLoggedinEmail && users[currentLoggedinEmail]) {
      setUser(users[currentLoggedinEmail]);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="container">
      <div className="profile-top">
        <p>Account Settings</p>
        {/* <button onClick={handleLogout} className="logout-btn">
          Logout
        </button> */}
      </div>
      <div className="profile-middle">
        <div className="profile-data">
          <div className="profile-img">
            <img
              src="/profile-img.png"
              alt="profile-img"
              className="profile-img"
            />
            <div className="camera-wrapper">
              <FaCamera />
            </div>
          </div>
          <div className="profile-info">
            <p className="profile-name">{user?.fullName}</p>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
        <div className="profile-data">
          <p className="profile-desc">
            Lorem ipsum dolor, sit amet sd consectetur adipisicing elit. Id
            exercitationem df minus s cons fd equuntur est nostrum sf blanditiis as
          </p>
        </div>
      </div>
      <hr className="dashed-line first-line" />
      <div className="profile-bottom">
        <hr className="dashed-line second-line" />
      </div>
    </div>
  );
};

export default Profile;
