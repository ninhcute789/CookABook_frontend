import { FaSearch } from "react-icons/fa";
// import Header from "../components/common/Header";
// import SideBar from "../components/common/SideBar";
import { NavLink } from "react-router";
// import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
// import { newsArticles } from "../data/dataBooks";
import BookItem from "../components/common/BookItem";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Books = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  // const categories = [
  //   "English Books",
  //   "Sách tiếng Việt",
  //   "Văn phòng phẩm",
  //   "Quà lưu niệm",
  // ];

  // const Sidebar = () => {
  //   return (
  //     <div className="w-1/3 p-4  rounded-lg shadow-lg bg-white h-fit sticky top-4">
  //       <h2 className="text-md font-bold mb-3">Khám phá theo danh mục</h2>
  //       {categories.map((category, index) => (
  //         <div
  //           key={index}
  //           className="py-2 border-b cursor-pointer hover:text-blue-500"
  //         >
  //           {category}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };
  const categories = [
    {
      name: "English Books",
      subcategories: [
        "Art & Photography",
        "Biographies & Memoirs",
        "Business & Economics",
        "How-to - Self Help",
        "Children's Books",
        "Dictionary",
        "Education - Teaching",
        "Fiction - Literature",
        "Magazines",
        "Medical Books",
        "Parenting & Relationships",
        "Reference",
        "Science - Technology",
        "History, Politics & Social Sciences",
        "Travel & Holiday",
        "Cookbooks, Food & Wine",
      ],
    },
    {
      name: "Sách tiếng Việt",
      subcategories: ["Văn học", "Kinh tế", "Tâm lý & Kỹ năng sống"],
    },
    {
      name: "Văn phòng phẩm",
      subcategories: ["Bút viết", "Sổ tay", "Dụng cụ học tập"],
    },
    {
      name: "Quà lưu niệm",
      subcategories: ["Đồ trang trí", "Thiệp & Phụ kiện", "Hộp quà"],
    },
    { name: "Đồ chơi giáo dục", subcategories: [] },
    { name: "Thiết bị công nghệ", subcategories: [] },
    { name: "Dụng cụ học tập", subcategories: [] },
  ];

  const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (index) => {
      setOpenCategory(openCategory === index ? null : index);
    };

    return (
      <div className="w-1/3 h-fit p-4 rounded-lg shadow-lg bg-white">
        <h2 className="text-md font-medium mb-3">Khám phá theo danh mục</h2>
        <hr/>
        {categories
          .slice(0, expanded ? categories.length : 4)
          .map((category, index) => (
            <div key={index}>
              <div
                className="py-3 border-b cursor-pointer hover:text-blue-500 flex 
            items-center justify-between"
                onClick={() => toggleCategory(index)}
              >
                {category.name}
                {category.subcategories.length > 0 && (
                  <span>
                    {openCategory === index ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </span>
                )}
              </div>
              <div
                className={`pl-4 text-gray-700 transition-max-height duration-400 ease-in-out overflow-hidden ${
                  openCategory === index ? "max-h-96" : "max-h-0"
                }`}
              >
                {category.subcategories.map((sub, i) => (
                  <div key={i} className="py-1 hover:text-blue-500 hover:underline hover:cursor-pointer">
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className=" w-11/12 mx-auto my-5 px-6 flex gap-4 bg-">
      {/* <h1 className="text-3xl font-bold mb-4">Tin tức về sách</h1> */}
      <Sidebar />
      <div>
        <header className="news-header mb-5 shadow-md top-5 z-50 backdrop-blur-md rounded-2xl opacity-90 ">
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

            {/* Thanh điều hướng */}
            {/* <nav className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Danh mục
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Bài viết nổi bật
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Liên hệ
            </a>
          </nav> */}

            {/* Ô tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm bài viết..."
                className="px-4 py-2 w-[350px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400
              hover:cursor-pointer"
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
