import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="bottom-content">
        <div className="">
          <p className="head">Welcome to PopX</p>
        </div>
        <div className="description">
          <p>
            Lorem, ipsum dolor sit amet co adipisicing elit. Numquam!
          </p>
        </div>
        <div className="btn-con">
          <Link to="/register" className="btn register-btn">
            Create Account
          </Link>
        </div>
        <div className="btn-con">
          <Link to="/login" className="btn login-btn">
            Already Registered? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
