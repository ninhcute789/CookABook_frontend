import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi"; // Icon Menu & Close
// import axios from "axios";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  //setLoggedInUser(localStorage.getItem("username"));
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("username"));
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("username");
  //   setLoggedInUser(""); // Reset lại state
  //   navigate("/dang-nhap"); // Chuyển về trang đăng nhập sau khi logout
  // };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(
      //   "🚀 ~ file: Header.jsx ~ line 68 ~ handleLogout ~ token",
      //   token
      // );
      // Xóa token & username sau khi logout thành công
      // localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user");
      setLoggedInUser(""); // Reset lại state
      toast.success(response.data.message);
      navigate("/dang-nhap"); // Chuyển về trang đăng nhập
    } catch (error) {
      console.error(
        "❌ Lỗi khi đăng xuất:",
        error.response?.data || error.message
      );
      alert("Không thể đăng xuất, vui lòng thử lại!");
    }
  };

  return (
    <header className="bg-white shadow-md top-0 z-50 px-6 md:px-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">CookABook</Link>
        </div>

        {/* Nút mở menu trên mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <HiX className="text-3xl z-50 absolute top-4.5 right-6" />
          ) : (
            <HiMenu className="text-3xl z-50" />
          )}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`z-40 absolute md:relative top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all ${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center`}
        >
          <ul className="md:flex lg:space-x-8 text-center md:text-left">
            {loggedInUser === "admin" // Nếu tài khoản là Admin thì có phần header Admin
              ? ["Trang chủ", "Sách", "Tin tức", "Về chúng tôi", "Admin"].map(
                  (item, index) => {
                    const path =
                      item === "Trang chủ"
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s/g, "-")}`;

                    return (
                      <li key={index} className="py-2 md:py-0">
                        <Link
                          to={path}
                          className="block text-gray-600 duration-300
                      xl:px-4 lg:py-2 md:px-1 hover:scale-130  
                      hover:text-gray-900"
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  }
                )
              : ["Trang chủ", "Sách", "Tin tức", "Về chúng tôi"].map(
                  (item, index) => {
                    const path =
                      item === "Trang chủ"
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s/g, "-")}`;

                    return (
                      <li key={index} className="py-2 md:py-0">
                        <Link
                          to={path}
                          className="block text-gray-600 duration-300
                    xl:px-4 lg:py-2 md:px-1 hover:scale-130  
                    hover:text-gray-900"
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  }
                )}
          </ul>
        </nav>

        {/* Login & Cart */}
        <div className="hidden md:flex items-center space-x-6">
          {/* <Link to="/dang-nhap" className="text-gray-600 hover:text-gray-900 duration-300
          hover:scale-130">
            Đăng nhập
          </Link> */}
          {loggedInUser ? (
            <div className="flex items-center space-x-6">
              <button className="hover:-translate-x-2 duration-300 hover:cursor-pointer"
              onClick={() => navigate("/user-profile")}>
                Chào, {loggedInUser}!
              </button>
              <button
                onClick={handleLogout}
                className="hover:cursor-pointer hover:scale-130 duration-300"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/dang-nhap">Đăng nhập</Link>
          )}
          <Link to="/gio-hang" className="text-gray-700 hover:text-gray-900">
            <div className="bg-gray-400 p-2 rounded">
              <BsCart3 className="size-6" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
