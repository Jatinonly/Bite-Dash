import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Fresh flavours, delicious choices, and doorstep delivery.</p>
        <a href="#explore-menu">View Menu</a>
      </div>
    </div>
  );
};

export default Header;
