import "./index.css";
import Footer from "./components/common/Footer.jsx";
import Header from "./components/common/Header.jsx";
import LoginRegisterHeader from "./components/common/LoginRegisterHeader.jsx";
import { Outlet } from "react-router-dom";
// import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import SideBar from "./components/common/SideBar.jsx";
// import cr7Image from './assets/cr7.jpg';

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <div className="header-container">
        {/* Hiển thị header riêng cho login và register */}
        {location.pathname === "/dang-nhap" || location.pathname === "/dang-ky" ? (
        {location.pathname === "/dang-nhap" ||
        location.pathname === "/dang-ky" ? (
          <LoginRegisterHeader />
        ) : (
          <Header />
        )}
      </div>
      <div className="main-container">
        <div className="sideNav-container ">
          {/* {location.pathname === '/admin' || location.pathname === '/admin-books' 
          || location.pathname === '/admin-users' || location.pathname === '/admin-orders'
          ? (<SideBar />) 
          : ( null )} */}
        </div>
        <div className="app-content">
          <Outlet />
        </div>
        {/* <div className='h-lvh'>
          height div
          <img src={cr7Image}
            className='transform  transition-all 
            hover:scale-125' alt='asdasd'
          />
        </div> */}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default App;
