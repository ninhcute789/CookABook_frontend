import "./index.css";
import Footer from "./components/common/Footer.jsx";
import Header from "./components/common/Header.jsx";
import LoginRegisterHeader from "./components/common/LoginRegisterHeader.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axiosInstance from "./services/axiosInstance.jsx";
import { useEffect } from "react";
import { AppProvider } from "./context/AppContext.jsx";

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
    <AppProvider>
      <div className="app-container">
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
          <div className="app-content">
            <Outlet />
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
        <Toaster position="top-right" />
      </div>
    </AppProvider>
  );
};

export { App };
