import "./index.css";
import Footer from "./components/common/Footer.jsx";
import Header from "./components/common/Header.jsx";
import LoginRegisterHeader from "./components/common/LoginRegisterHeader.jsx";
import { Outlet } from "react-router-dom";
// import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axiosInstance from "./services/axiosInstance.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import { UserProvider } from "./components/user/UserContext.jsx";
// import SideBar from "./components/common/SideBar.jsx";
// import cr7Image from './assets/cr7.jpg';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    refreshToken(); // Gọi khi app khởi động
  }, []);

  const refreshToken = () => {
    axiosInstance
      .get("/auth/refresh", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200 && response.data.data?.accessToken) {
          document.cookie = `refreshToken=${response.data.data.accessToken}; path=/; Secure; HttpOnly`;
          console.log("Refresh token đã lưu vào cookie!");
        }
      })
      .catch((error) => console.error("Lỗi khi lấy refresh token:", error));
  };

  return (
    <div className="app-container">
      <UserProvider>
        <div className="header-container">
          {/* Hiển thị header riêng cho login và register */}
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
        <Toaster position="top-right" />
      </UserProvider>
    </div>
  );
};

export default App;
