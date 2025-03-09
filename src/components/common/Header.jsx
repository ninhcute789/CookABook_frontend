import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi"; // Icon Menu & Close




const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  
  //setLoggedInUser(localStorage.getItem("username"));
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("username"));
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedInUser(""); // Reset lại state
    navigate("/dang-nhap"); // Chuyển về trang đăng nhập sau khi logout
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
          <ul className="md:flex md:space-x-8 text-center md:text-left">
            {["Trang chủ", "Sách", "Tin tức", "Về chúng tôi", "Admin"].map(
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
                      md:px-4 md:py-2 hover:scale-130  
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
            <>
              <span>Chào, {loggedInUser}!</span>
              <button onClick={handleLogout} className="hover:cursor-pointer">Đăng xuất</button>
            </>
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
