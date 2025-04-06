import { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from "react-router";
import { RiBookShelfLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { FaRegCircleUser, FaNewspaper } from "react-icons/fa6";
import { FiPenTool } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

const SideBar = () => {
  const [outlineState, setOutlineState] = useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      id: 0,
      className: "opacity-0",
      path: "/admin",
      icon: LuLayoutDashboard,
      label: "Tổng quan",
    },
    {
      id: 1,
      className: "opacity-0",
      path: "/admin/admin-orders",
      icon: BsCart3,
      label: "Đơn hàng",
    },
    {
      id: 2,
      className: "opacity-0",
      path: "/admin/admin-books",
      icon: RiBookShelfLine,
      label: "Sách",
    },
    {
      id: 3,
      className: "opacity-0",
      path: "/admin/admin-users",
      icon: FaRegCircleUser,
      label: "Người dùng",
    },
    {
      id: 4,
      className: "opacity-0",
      path: "/admin/admin-news",
      icon: FaNewspaper,
      label: "Bài báo",
    },
    {
      id: 5,
      className: "opacity-0",
      path: "/admin/admin-authors",
      icon: FiPenTool,
      label: "Tác giả",
    },
    {
      id: 6,
      className: "opacity-0",
      path: "/admin/admin-categories",
      icon: MdOutlineCategory,
      label: "Thể loại",
    },
  ]);

  const outLine = () => setOutlineState(!outlineState);

  useEffect(() => {
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        setMenuItems((prev) =>
          prev.map((menuItem) =>
            menuItem.id === index
              ? { ...menuItem, className: "goes-in" }
              : menuItem
          )
        );
      }, index * 100);
    });
  }, [outlineState, menuItems]);

  return (
    <>
      {!outlineState ? (
        <div
          className="relative min-h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 
          text-gray-100 shadow-lg border-r border-gray-700/50 transition-all duration-300"
        >
          <div className="p-4 m-4">
            <HiOutlineBars3
              className="absolute right-4 top-4 cursor-pointer w-8 h-8 p-1.5
                bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 
                transition-colors duration-300"
              onClick={outLine}
            />
          </div>
          <hr className="my-4 border-gray-700/50 w-[85%] mx-auto fade-in" />
          <div className="px-3 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/admin"} // Thêm prop end cho Tổng quan
                className={({ isActive }) => `
                  text-base flex items-center ${item.className}
                  px-3 py-2.5 rounded-lg w-full
                  hover:bg-gray-700/50 hover:translate-x-2
                  transition-all duration-300
                  ${isActive ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
          <hr className="my-4 border-gray-700/50 w-[85%] mx-auto fade-in" />
        </div>
      ) : (
        <div
          className="relative min-h-full w-16 bg-gradient-to-b from-gray-800 to-gray-900 
          text-gray-100 shadow-lg border-r border-gray-700/50 transition-all duration-300"
        >
          <div className="p-4 m-4">
            <HiOutlineBars3
              className="absolute right-4 top-4 cursor-pointer w-8 h-8 p-1.5
                bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 
                transition-colors duration-300"
              onClick={outLine}
            />
          </div>
          <hr className="my-4 border-gray-700/50 w-[85%] mx-auto" />
          <div className="px-1.5 space-y-2 goes-out">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/admin"} // Thêm prop end cho Tổng quan
                className={({ isActive }) => `
                  flex justify-center p-2 rounded-lg
                  hover:bg-gray-700/50 transition-all duration-300
                  ${isActive ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                `}
              >
                <item.icon className="w-5 h-5" />
              </NavLink>
            ))}
          </div>
          <hr className="my-4 border-gray-700/50 w-[85%] mx-auto" />
        </div>
      )}
    </>
  );
};

export default SideBar;
