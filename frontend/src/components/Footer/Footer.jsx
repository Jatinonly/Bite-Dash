import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Link to="/" className="footer-logo">
            Bite Dash.
          </Link>
          <p>Delicious meals, made fresh and delivered to your door.</p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <a
              href="https://www.linkedin.com/in/jatin-kumar-9697a728b"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Jatin Kumar on LinkedIn"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/Jatinonly/Bite-Dash"
              target="_blank"
              rel="noopener noreferrer"
              className="github-social-icon"
              aria-label="Visit the Bite Dash project on GitHub"
            >
              <img src={assets.github} alt="GitHub" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9588522559</li>
            <li>jatin@bitedash.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ Bite Dash - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
