import "./index.css";
import Footer from "./components/common/Footer.jsx";
import Header from "./components/common/Header.jsx";
import LoginRegisterHeader from "./components/common/LoginRegisterHeader.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axiosInstance from "./services/axiosInstance.jsx";
import { useEffect, useState } from "react";
import { AppProvider } from "./context/AppContext.jsx";
import { FaArrowUp } from "react-icons/fa6";
// import Cookies from 'js-cookie';

const App = () => {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setShowScrollTop(window.scrollY > 300); // Hiển thị nút khi scroll > 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    refreshToken(); // Gọi khi app khởi động
  }, []);

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axiosInstance.get(`/auth/refresh`);
      // const refreshToken = Cookies.get("refresh_token");

      if (res.data.status === 200 && res.data.data?.accessToken) {
        // Lưu access token vào localStorage
        localStorage.setItem("token", res.data.data.accessToken);

        console.log("Refresh token đã lưu vào cookie!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy refresh token:", error);
    }
  };

  return (
    <AppProvider>
      <div className="app-container">
        <div className="header-container">
          {/* Hiển thị header riêng cho login và register */}
          {location.pathname === "/dang-nhap" ||
          location.pathname === "/dang-ky" ||
          location.pathname === "/quen-mat-khau/nhap-otp" ||
          location.pathname === "/quen-mat-khau/nhap-mat-khau-moi" ||
          location.pathname === "/quen-mat-khau/nhap-email" 
          ? (
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
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-16 right-16 bg-red-500 text-white p-3 
          rounded-full shadow-lg hover:bg-red-600 transition-all duration-300
          hover:scale-110 active:scale-95 z-50"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-xl" />
          </button>
        )}
        <div className="footer-container">
          <Footer />
        </div>
        <Toaster position="top-right" />
      </div>
    </AppProvider>
  );
};

export { App };
