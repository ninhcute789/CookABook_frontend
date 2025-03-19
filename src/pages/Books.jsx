import { FaSearch } from "react-icons/fa";
// import Header from "../components/common/Header";
// import SideBar from "../components/common/SideBar";
import { NavLink } from "react-router";
// import { IoIosArrowBack } from "react-icons/io";
import { useRef, useState } from "react";
// import { newsArticles } from "../data/dataBooks";
import BookItem from "../components/common/BookItem";
import SidebarBooks from "../components/sideBar/sideBarBooks";

const Books = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <div className=" mx-auto py-5 px-[5%] flex gap-4 bg-gray-100">
      {/* <h1 className="text-3xl font-bold mb-4">Tin tức về sách</h1> */}
      <SidebarBooks />
      <div>
        <header className="news-header shadow-xl sticky top-4 z-10 backdrop-blur-lg rounded-2xl opacity-100 bg-white">
          <div className=" mx-auto flex items-center justify-between p-4">
            {/* Logo / Tên trang */}
            <NavLink
              onClick={() => {
                setSelectedArticle(null),
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
              }}
              className="text-2xl font-medium text-gray-800 hover:cursor-pointer"
            >
              Nhà sách CaB
            </NavLink>
            {/* Ô tìm kiếm */}
            <div className="relative">
              <input
                ref={inputRef} // Ref cho input
                type="text"
                placeholder="Tìm sách..."
                className={`transition-all duration-300 ease-in-out border rounded-full px-4 py-2 shadow-sm outline-none 
                ${isFocused ? "w-80 border-gray-400" : "w-48 border-gray-300"}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-700 translate-y-0.5" />
            </div>
          </div>
        </header>

        <BookItem />
      </div>
    </div>
  );
};

export default Books;
