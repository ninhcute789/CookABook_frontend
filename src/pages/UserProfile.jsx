import { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import axiosInstance from "../services/axiosInstance";
import { getAllArticlesByUserId, getUsersById } from "../services/UserSevices";
import UserUpdate from "../components/update/UserUpdate";
import { handleDelete } from "../services/ArticleServices";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import ArticleUpdate from "../components/update/ArticleUpdate";
import { truncateText } from "../services/CommonServices";
import AddArticle from "../components/addForm/AddAritcle";
import ava from "../assets/ava.png"; // Thay bằng ảnh đại diện thực tế
import { AppContext } from "../context/AppContext";
import { Outlet, useNavigate } from "react-router";
import { FaBell } from "react-icons/fa";
import { RiFileList2Fill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { PiAddressBookFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const UserProfile = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Thông tin tài khoản");

  const menuItems = [
    {
      label: "Thông tin tài khoản",
      icon: <FaUser />,
      path: "/thong-tin-tai-khoan",
    },
    { label: "Thông báo của bạn", icon: <FaBell />, path: "#" },
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
  ];
  return (
    <div
      className=" shadow-2xl w-full bg-[#e6e6e6] 
    shadow-neutral-600 text-black min-h-fit px-6 flex lg:flex-row flex-col"
    >
      <div className="flex mx-auto min-h-screen w-18/24">
        {/* Sidebar */}
        <div className="min-w-55 w-9/48 bg-transparent p-4">
          <div className="flex items-center space-x-3">
            <img
              src={context.user?.avatar || ava}
              alt="Avatar"
              className="w-12 h-12 rounded-full "
            />
            <div className="flex flex-col">
              <p className="text-sm text-gray-900">Tài khoản của</p>
              <p className="font-medium">{context?.user.name}</p>
            </div>
          </div>
          <ul className="mt-2 space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={`p-2 text-sm flex items-center duration-100 rounded cursor-pointer 
            ${
              activeItem === item.label
                ? "bg-neutral-600 text-white"
                : "hover:bg-gray-400"
            }`}
                onClick={() => {
                  setActiveItem(item.label);
                  if (item.path !== "#") navigate(item.path);
                }}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export { UserProfile };
