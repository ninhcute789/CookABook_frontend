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
        <header className="news-header mb-5 shadow-xl sticky top-4 z-10 backdrop-blur-lg rounded-2xl opacity-100 bg-white">
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

        {/* {!selectedArticle ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 ">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500 p-6"
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-72 object-cover mx-auto rounded shadow-gray-100 shadow-sm"
              />
              <div className="text-xl font-medium my-4">
                {truncateText(article.title, 7)}
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-[12px]">{article.date}</div>
                <div className="font-bold hover:underline cursor-pointer text-[12px]">
                  {article.author}
                </div>
              </div>
              <p className="text-gray-700 mb-5">
                {truncateText(article.content, 10)}
              </p>
              <NavLink
                onClick={() => {
                  setSelectedArticle(article),
                    window.scrollTo({
                      top: 70,
                      behavior: "smooth",
                    });
                }}
                className=" text-yellow-500 hover:underline "
              >
                Đọc thêm
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setSelectedArticle(null),
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
            }}
            className="mb-4 px-4 py-2 hover:opacity-50 mt-5
            bg-gray-200 rounded hover:cursor-pointer"
          >
            <IoIosArrowBack className="inline-block -translate-y-0.5 -translate-x-1" />
            Quay lại
          </button>
          <h2 className="text-2xl font-bold ">{selectedArticle.title}</h2>
          <p className="text-gray-600">
            Bởi {selectedArticle.author} - {selectedArticle.date}
          </p>
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className=" max-h-96 object-cover rounded-md my-4 mx-auto"
          />
          <p>{selectedArticle.content}</p>
        </div>
      )} */}

        <BookItem />
      </div>
    </div>
  );
};

export default Books;
