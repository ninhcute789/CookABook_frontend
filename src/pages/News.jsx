import React, { useEffect, useRef, useState } from "react";
// import { newsArticles } from "../data/dataNews.js";
import { NavLink, useLocation } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
// import ArticleSideBar from "../components/common/ArticleSideBar.jsx";
import SidebarArticles from "../components/sideBar/SidebarArticles.jsx";

// const newsArticles = [
//   {
//     id: 1,
//     title: "’Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống",
//     author: "Hai Núa",
//     date: "03/03/2025",
//     image: s1,
//     content:
//       "Cuốn sách mới của Murakami đã lập kỷ lục về số lượng bán ra trong ngày đầu tiên. Nội dung kể về cuộc hành trình của một người đàn ông cô đơn, khám phá những góc khuất trong tâm hồn khi đối mặt với quá khứ và những giấc mơ kỳ lạ. Với phong cách viết đặc trưng, tác phẩm mang đến sự hòa trộn giữa thực tế và huyền ảo, khiến độc giả không thể rời mắt. Cốt truyện sâu sắc, nhân vật có chiều sâu, cùng những thông điệp triết lý về cuộc sống, cuốn sách hứa hẹn trở thành một trong những tác phẩm đáng đọc nhất năm nay.",
//   },
//   {
//     id: 2,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: s2,
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ trong năm 2025 viết bởi Trần Hà...",
//   },
//   {
//     id: 3,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: s3,
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ...",
//   },
//   {
//     id: 4,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: s4,
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ...",
//   },
//   {
//     id: 5,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: { s2 },
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ...",
//   },
// ];
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 70,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [article, setArticle] = useState();


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        // if (!token) {
        //   console.error(
        //     "❌ Không tìm thấy token! Người dùng có thể chưa đăng nhập."
        //   );
        //   return;
        // }

        const res = await axios.get("http://localhost:8080/api/v1/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ Dữ liệu API trả về:", res.data);
        setArticles(res.data?.data?.data || []);
      } catch (error) {
        console.error(
          "❌ Lỗi khi lấy danh sách bài báo:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div>
      <ScrollToTop />
      <div className=" px-10 mx-auto py-5  bg-orange-50">
        {/* <h1 className="text-3xl font-bold mb-4">Tin tức về sách</h1> */}

        <header className="news-header w-11/12 mx-auto shadow-md  top-5 z-50 backdrop-blur-md rounded-2xl bg-white opacity-90">
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
              className="text-2xl font-bold text-gray-800 hover:cursor-pointer"
            >
              📚 Tin tức
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
            <div className="relative ">
              <input
                ref={inputRef} // Ref cho input
                type="text"
                placeholder="Tìm bài viết..."
                className={`transition-all duration-300 ease-in-out border rounded-full px-4 py-2 shadow-sm outline-none 
                ${isFocused ? "w-80 border-gray-400" : "w-48 border-gray-300"}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-700 translate-y-0.5" />
            </div>
          </div>
        </header>

        {!selectedArticle ? (
          articles.length === 0 ? (
            <p className="text-center">Không có bài viết nào.</p>
          ) : (
          <div className=" w-11/12 mx-auto">
            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 ">
              {articles.slice().reverse().map((article) => ( // Đảo ngược thứ tự bài viết
                <div
                  key={article.id}
                  className="mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500 p-6 bg-white"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-50 object-cover mx-auto rounded shadow-gray-100 shadow-sm"
                  />
                  <div className="text-xl font-medium my-4 line-clamp-1">
                    {article.title}
                  </div>

                  <p className="text-gray-700 mb-5 line-clamp-1">
                    {article.content}
                  </p>
                  <div className="flex justify-between">
                    <div className="font-bold hover:underline cursor-pointer text-[12px]">
                      {article?.user?.name || "Không rõ tác giả"}
                      {console.log(article?.user?.name)}
                    </div>
                    <div className="font-bold text-[12px]">
                      {article.createdAt}
                    </div>
                  </div>
                  <NavLink
                    onClick={() => {
                      setSelectedArticle(true),
                        setArticle(article),
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
          </div>)
        ) : (
          <div className="flex w-11/12 mx-auto">
            <div className="w-4/5">
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
              <h2 className="text-2xl font-bold ">{article.title}</h2>
              <p className="text-gray-600">
                Bởi {article?.user?.name || "Không rõ"} - {article.createdAt}
              </p>
              <img
                src={article.imageURL}
                alt={article.title}
                className=" max-h-96 object-cover rounded-md my-4 mx-auto"
              />
              <p className="min-h-screen">{article.content}</p>
            </div>
            <SidebarArticles
              newsArticles={articles} // ✅ Truyền dữ liệu từ JSON
              setArticle={setArticle}
            />
          </div>
        )}
        {/* Sidebar bên phải */}
      </div>
      {/* <div>
        <h2>Danh sách bài viết</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default News;
