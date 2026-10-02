import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2800}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<div className="content-container"><Cart setShowLogin={setShowLogin} /></div>} />
          <Route path="/order" element={<div className="content-container"><PlaceOrder /></div>} />
          <Route path="/verify" element={<div className="content-container"><Verify /></div>} />
          <Route path="/myorders" element={<div className="content-container"><MyOrders /></div>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
