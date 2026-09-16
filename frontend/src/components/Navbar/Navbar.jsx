import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const updateActiveSection = () => {
      const sections = [
        { selector: ".header", name: "home" },
        { selector: "#explore-menu", name: "menu" },
        { selector: "#app-download", name: "mobile-app" },
        { selector: "#footer", name: "contact us" },
      ];
      const scrollPosition = window.scrollY + 120;
      let activeSection = "home";

      sections.forEach(({ selector, name }) => {
        const section = document.querySelector(selector);
        if (section && section.offsetTop <= scrollPosition) {
          activeSection = name;
        }
      });

      setMenu(activeSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <span className="logo">Bite Dash.</span>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <label className="navbar-search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 30 30"
            fill="#6B7280"
            aria-hidden="true"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input type="search" placeholder="Search" aria-label="Search" />
        </label>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
