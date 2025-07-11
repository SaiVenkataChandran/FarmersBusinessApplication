import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import agribridgeLogo from "../assets/logo.png"
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={agribridgeLogo} alt="AgriBridge Logo" className="logo" />
        <h1>Agribridge</h1>
        <p className="subtitle">Bridging Farmers and Buyers, Directly</p>
        <div className="button-group">
          {/* Consumer Login Button */}
          <Link to="/consumer-login">
            <button className="role-button">Consumer</button>
          </Link>

          {/* Farmer Login Button */}
          <Link to="/farmer-login">
            <button className="role-button">Farmer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;