import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo" aria-label="Bite Dash Admin Panel">
        <span>Bite Dash.</span>
        <small>Admin Panel</small>
      </div>
      <img className="profile" src={assets.profile_image} alt="Admin profile" />
    </div>
  );
};

export default Navbar;
