import { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from "react-router";
import { RiBookShelfLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";
import { FiPenTool } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

const SideBar = () => {
  const [outlineState, setOutlineState] = useState(false);
  const [className0, setClassName0] = useState("opacity-0");
  const [className1, setClassName1] = useState("opacity-0");
  const [className2, setClassName2] = useState("opacity-0");
  const [className3, setClassName3] = useState("opacity-0");
  const [className4, setClassName4] = useState("opacity-0");
  const [className5, setClassName5] = useState("opacity-0");
  const [className6, setClassName6] = useState("opacity-0");

  const outLine = () => {
    setOutlineState(!outlineState);
  };
  useEffect(() => {
    setTimeout(() => {
      setClassName0("goes-in");
    }, 0); // Delay 0.8 giây
    setTimeout(() => {
      setClassName1("goes-in");
    }, 100); // Delay 1 giây
    setTimeout(() => {
      setClassName2("goes-in");
    }, 200); // Delay 1.2 giây
    setTimeout(() => {
      setClassName3("goes-in");
    }, 300); // Delay 1.4 giây
    setTimeout(() => {
      setClassName4("goes-in");
    }, 400); // Delay 1.6 giây
    setTimeout(() => {
      setClassName5("goes-in");
    }, 500); // Delay 1.8 giây
    setTimeout(() => {
      setClassName6("goes-in");
    }, 600); // Delay 2 gi
  }, []);

  return (
    <>
      {outlineState === false ? (
        <div className="relative top-0 left-0 w-55 min-h-96 bg-gray-700 text-white transition-all duration-300 ease-in-out">
          <div className="h-10">
            <HiOutlineBars3
              className="absolute top-2 right-2 cursor-pointer size-8
                         bg-white text-gray-700 rounded"
              onClick={() => outLine()}
            />
          </div>
          <hr className="my-5 w-5/6 mx-auto fade-in" />
          <div className=" pl-3 pr-3 space-y-4">
            <NavLink
              to="/admin"
              className={`text-xl flex ${className0}
              hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1`}
            >
              <LuLayoutDashboard className="translate-y size-7 mr-3" />
              Dash Board
            </NavLink>
            <NavLink
              to="/admin/admin-books"
              className={`text-xl flex ${className1}
              hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1`}
            >
              <RiBookShelfLine className="translate-y size-7 mr-3" />
              Books
            </NavLink>
            <NavLink
              to="/admin/admin-orders"
              className={`text-xl flex ${className2}
              hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1`}
            >
              <BsCart3 className="translate-y size-7 mr-3" />
              Orders
            </NavLink>
            <NavLink
              to="/admin/admin-users"
              className={`text-xl flex ${className3}
              hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1`}
            >
              <FaRegCircleUser className="translate-y size-7 mr-3" />
              Users
            </NavLink>
            <NavLink
              to="/admin/admin-news"
              className={`text-xl flex ${className4}
              hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1`}
            >
              <FaNewspaper className="translate-y size-7 mr-3" />
              News
            </NavLink>
            <NavLink
              to="/admin/admin-authors"
              className={`text-xl flex ${className5}
              hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1`}
            >
              <FiPenTool className="translate-y size-7 mr-3" />
              Authors
            </NavLink>
            <NavLink
              to="/admin/admin-categories"
              className={`text-xl flex ${className6}
              hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1`}
            >
              <MdOutlineCategory className="translate-y size-7 mr-3" />
              Categories
            </NavLink>
          </div>
          <hr className="my-5 w-5/6 mx-auto fade-in transition-all" />
        </div>
      ) : (
        <div className="relative top-0 left-0 w-13 min-h-96 bg-gray-700 text-white transition-all duration-300 ease-in-out">
          <div className="h-10">
            <HiOutlineBars3
              className="absolute top-2 right-2 cursor-pointer size-8
                         bg-white text-gray-700 rounded"
              onClick={() => outLine()}
            />
          </div>
          <hr className="my-5 w-5/6 mx-auto " />
          <div className="space-y-4 goes-out mx-auto">
            <NavLink
              to="/admin"
              className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1"
            >
              <LuLayoutDashboard className="translate-y size-7 mx-auto" />
            </NavLink>
            <NavLink
              to="/admin/admin-books"
              className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1"
            >
              <RiBookShelfLine className="translate-y size-7 mx-auto" />
            </NavLink>
            <NavLink
              to="/admin/admin-orders"
              className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1"
            >
              <BsCart3 className="translate-y size-7 mx-auto" />
            </NavLink>
            <NavLink
              to="/admin/admin-users"
              className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1"
            >
              <FaRegCircleUser className="translate-y size-7 mx-auto" />
            </NavLink>
            <NavLink
              to="/admin/admin-news"
              className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1"
            >
              <FaNewspaper className="translate-y size-7 mx-auto" />
            </NavLink>
            <NavLink
              to="/admin/admin-authors"
              className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1"
            >
              <FiPenTool className="translate-y size-7 mx-auto" />
            </NavLink>
            <NavLink
              to="/admin/admin-categories"
              className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1"
            >
              <MdOutlineCategory className="translate-y size-7 mx-auto" />
            </NavLink>
          </div>
          <hr className="my-5 w-5/6 mx-auto " />
        </div>
      )}
    </>
  );
};

export default SideBar;
