import PropTypes from "prop-types";
import { createContext, use, useEffect, useState } from "react";
import { getQuantityOfCartItems } from "../services/CartServices";
import { getUserAvatarById, getUsersById } from "../services/UserSevices";
import { set } from "@cloudinary/url-gen/actions/variable";
import { FaBell, FaUser } from "react-icons/fa";
import { RiFileList2Fill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { PiAddressBookFill } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

// 1. Tạo Context
const AppContext = createContext();

// 2. Provider để bọc toàn bộ ứng dụng
const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    dob: "",
    avatar: "",
    gender: "",
    email: "",
    password: "",
    id: "",
    cartId: "",
  }); // Thay đổi giá trị mặc định của user

  const userSidebar = [
    {
      label: "Thông tin tài khoản",
      icon: <FaUser />,
      path: "/thong-tin-tai-khoan",
    },
    {
      label: "Quản lý đơn hàng",
      icon: <RiFileList2Fill />,
      path: "/thong-tin-tai-khoan/don-hang",
    },
    {
      label: "Bài báo của bạn",
      icon: <IoNewspaper />,
      path: "/thong-tin-tai-khoan/tin-tuc-cua-toi",
    },
    {
      label: "Địa chỉ",
      icon: <PiAddressBookFill />,
      path: "/thong-tin-tai-khoan/dia-chi",
    },
    {
      label: "Hỗ trợ khách hàng",
      icon: <TfiHeadphoneAlt />,
      path: "/thong-tin-tai-khoan/ho-tro",
    },
  ];

  const [activeItem, setActiveItem] = useState("Thông tin tài khoản");

  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");

  const [quantity, setQuantity] = useState(0); // Thêm state quantity
  const [headerQuantity, setHeaderQuantity] = useState(0); // Thêm state headerQuantity
  //   const [avatar, setAvatar] = useState(null); // Thêm state avatar

  // Hàm đăng nhập
  const login = (userData) => setUser(userData);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return; // Nếu không có user trong localStorage, không làm gì cả

      try {
        const parsedUser = JSON.parse(storedUser);
        // console.log("🚀 storedUser ID:", parsedUser.id);

        const userData = await getUsersById(parsedUser.id);
        console.log("🚀 User từ API:", userData);
        setUser(userData); // Cập nhật state quantity với dữ liệu từ API
      } catch (error) {
        console.error("Lỗi khi lấy user từ API:", error);
      }
    };
    fetchUser(); // Gọi hàm fetchQuantity khi component mount
  }, []);

  useEffect(() => {
    const fetchQuantity = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return; // Nếu không có user trong localStorage, không làm gì cả

      try {
        const parsedUser = JSON.parse(storedUser);
        // console.log("🚀 storedUser ID:", parsedUser.id);

        const userData = await getQuantityOfCartItems(parsedUser.cartId);
        // console.log("🚀 User từ API:", userData);
        setHeaderQuantity(userData); // Cập nhật state quantity với dữ liệu từ API
      } catch (error) {
        console.error("Lỗi khi lấy user từ API:", error);
      }
    };
    fetchQuantity(); // Gọi hàm fetchQuantity khi component mount
  }, []);

  // Hàm đăng xuất
  const logout = () => setUser(null);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => setCart([...cart, item]);

  // Chuyển đổi theme
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const value = {
    login,
    logout,
    cart,
    addToCart,
    theme,
    toggleTheme,
    quantity, // Thêm quantity vào value
    setQuantity, // Thêm setQuantity vào value
    // avatar, // Thêm avatar vào value
    // setAvatar, // Thêm setAvatar vào value
    user,
    setUser, // Thêm setUser vào value
    userSidebar,
    activeItem,
    setActiveItem,
    headerQuantity,
    setHeaderQuantity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// 3. Hook để dùng Context
export { AppContext, AppProvider }; // Chỉ export Context
