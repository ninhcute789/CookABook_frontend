import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi"; // Icon Menu & Close
import { getUserAvatarById, getUsersById } from "../../services/UserSevices";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
import ava from "../../assets/ava.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return; // Nếu không có user trong localStorage, không làm gì cả

      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("🚀 storedUser ID:", parsedUser.id);

        const userData = await getUsersById(parsedUser.id);
        console.log("🚀 User từ API:", userData);

        setUser(userData); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Lỗi khi lấy user từ API:", error);
      }
    };

    fetchUser();
  }, []); // Chỉ chạy 1 lần khi component mount

  // console.log("🚀 ~ file: Header.jsx ~ line 45 ~ user", user);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.id) return;

        const res = await getUserAvatarById(user.id);
        console.log("🚀 ~ file: Header.jsx ~ line 51 ~ fetchUser ~ res", res);
        setUser((prev) => {
          // Chỉ cập nhật nếu avatar thay đổi để tránh render không cần thiết
          if (prev && prev.avatar !== res) {
            return { ...prev, avatar: res };
          }
          return prev;
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu user:", error);
      }
    };
    fetchUser();
  }, [user]);

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
      setUser(""); // Reset lại state
      toast.success(response.data.message);
      navigate("/dang-nhap"); // Chuyển về trang đăng nhập
    } catch (error) {
      console.error(
        "❌ Lỗi khi đăng xuất:",
        error.response?.data || error.message
      );
      toast.error("Không thể đăng xuất, vui lòng thử lại!");
    }
  };

  // useEffect(() => {
  //   const Test = async () => {
  //     //   const user1 = JSON.parse(user);
  //     //   // setUser(JSON.parse(user));
  //     //   // console.log(user1.id);
  //     //   const res = await getUserById(user1.id);
  //     //   // console.log(res); // Lấy thông tin người dùng từ API
  //     //   setUser(res);
  //     getUserById(JSON.parse(user).id).then((res) => {
  //       console.log(res);
  //       setUser(res);
  //     });
  //   };
  //   Test();
  // }, [user]);

  // const handleLogout = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("❌ Không tìm thấy token!");
  //       return;
  //     }

  //     const response = await axiosInstance.post(
  //       "/auth/logout",
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     // console.log(
  //     //   "🚀 ~ file: Header.jsx ~ line 68 ~ handleLogout ~ token",
  //     //   token
  //     // );
  //     // Xóa token & username sau khi logout thành công
  //     // localStorage.removeItem("token");
  //     localStorage.removeItem("username");
  //     localStorage.removeItem("user");
  //     setLoggedInUser(""); // Reset lại state
  //     toast.success(response.data.message);
  //     navigate("/dang-nhap"); // Chuyển về trang đăng nhập
  //   } catch (error) {
  //     console.error(
  //       "❌ Lỗi khi đăng xuất:",
  //       error.response?.data || error.message
  //     );
  //     alert("Không thể đăng xuất, vui lòng thử lại!");
  //   }
  // };

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
            {loggedInUser === "admin123" // Nếu tài khoản là Admin thì có phần header Admin
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
        <div className="hidden md:flex items-center ">
          {/* <Link to="/dang-nhap" className="text-gray-600 hover:text-gray-900 duration-300
          hover:scale-130">
            Đăng nhập
          </Link> */}
          {loggedInUser ? (
            <div className="flex items-center">
              <img
                src={user?.avatar || ava}
                alt="Avatar"
                className="w-10 h-10 mr-6 rounded-full object-cover border-2 border-gray-200"
              />
              {console.log("✅ Avatar đã cập nhật - 271:", user?.avatar)}
              <div
                className="flex items-center relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button
                  className=" hover:scale-120 duration-300 hover:cursor-pointer py-2"
                  // onClick={() => navigate("/user-profile")}
                >
                  Chào, {loggedInUser}!
                </button>
                {isHovered && (
                  <div
                    className=" z-50 absolute duration-300 top-9 shadow-lg shadow-neutral-400
                  left-1/2 -translate-x-1/2 mt-2 bg-white p-2 rounded-md text-left w-44 "
                  >
                    <div className="space-y-2">
                      <div
                        className="hover:bg-gray-100 p-2 cursor-pointer 
                      duration-150 rounded"
                        onClick={() => navigate("/user-profile")}
                      >
                        Thông tin tài khoản
                      </div>
                      <div
                        className="hover:bg-gray-100 p-2 cursor-pointer 
                      duration-150 rounded"
                      >
                        Đơn hàng của tôi
                      </div>
                      <div
                        className="hover:bg-gray-100 p-2 cursor-pointer 
                        duration-150 rounded"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <button
                onClick={handleLogout}
                className="hover:cursor-pointer hover:scale-130 duration-300"
              >
                Đăng xuất
              </button> */}
            </div>
          ) : (
            <Link to="/dang-nhap" className="hover:scale-120 duration-300">
              Đăng nhập
            </Link>
          )}
          <Link to="/gio-hang" className="ml-6 text-gray-700 ">
            <div className="hover:bg-gray-200 p-2 rounded duration-300 relative">
              <div
                className="text-white absolute -top-1 -right-1
               bg-[#f93333] rounded-full w-5 h-5 font-medium
                justify-center flex items-center text-xs"
              >
                23
              </div>
              <BsCart3 className="size-6" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
