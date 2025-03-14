import { useEffect, useRef, useState } from "react";
// import { newsArticles } from "../data/dataNews.js";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
// import axios from "axios";
import SidebarArticles from "../components/sideBar/SidebarArticles.jsx";
import { NavLink } from "react-router";
import axiosInstance from "../services/axiosInstance.jsx";
import toast from "react-hot-toast";

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({
//       top: 70,
//       behavior: "smooth",
//     });
//   }, [pathname]);

//   return null;
// };

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();

  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const size = 12; // Số bài viết mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số bài viết

  const fetchArticles = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axiosInstance.get(
        `/articles/all?size=${size}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log("✅ API trả về:", res.data);
      setArticles(res.data?.data?.data || []);
      console.log("Danh sách bài viết:", res.data?.data?.data);
      setTotalPages(res.data?.data?.meta?.totalPages);
      setTotalElements(res.data?.data?.meta?.totalElements);
      // toast.success("🎉 Tải danh sách bài viết thành công!");
    } catch (error) {
      console.error(
        "❌ Lỗi khi lấy danh sách:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  // const truncateText = (text, wordLimit) => {
  //   const words = text.split(" ");
  //   return words.length > wordLimit
  //     ? words.slice(0, wordLimit).join(" ") + "..."
  //     : text;
  // };
  const truncateDate = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ")
      : text;
  };
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div>
      {/* <ScrollToTop /> */}
      <div className=" px-10 mx-auto py-5  bg-orange-50">
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
                {articles.map(
                  (
                    article // Đảo ngược thứ tự bài viết
                  ) => (
                    <div
                      key={article.id}
                      className="mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500 p-6 bg-white"
                    >
                      <img
                        src={article.imageURL}
                        alt={article.title}
                        className="h-50 object-cover mx-auto rounded shadow-gray-100 shadow-sm"
                      />
                      <div className="text-xl font-medium my-2 line-clamp-1">
                        {article.title}
                      </div>

                      <p className="text-gray-700 h-13 line-clamp-2">
                        {article.content}
                      </p>
                      <div className="flex justify-between mb-2">
                        <div className="font-medium hover:underline cursor-pointer text-[12px]">
                          Tác giả - {article?.user?.name || "Không rõ tác giả"}
                        </div>
                        <div className="font-medium text-[12px]">
                          Từ - {article.updatedAt
                            ? truncateDate(article.updatedAt, 1)
                            : truncateDate(article.createdAt, 1)}
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
                  )
                )}
              </div>
              {/* Phân trang */}
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => {
                    setPage((prev) => Math.max(prev - 1, 1));
                    scrollTo(0, 0);
                  }}
                  className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                    page === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
                  }`}
                  disabled={page === 1}
                >
                  Trước
                </button>

                <span className="px-4 py-2 rounded-lg shadow-md">
                  {page} / {totalPages}
                </span>

                <button
                  onClick={() => {
                    setPage((prev) => Math.min(prev + 1, totalPages));
                    scrollTo(0, 0);
                  }}
                  className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                    page === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
                  }`}
                  disabled={page === totalPages}
                >
                  Tiếp
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex md:w-11/12 mx-auto w-full">
            <div className="w-4/5 [@media(max-width:767px)]:mx-auto">
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
      </div>
    </div>
  );
};

export default News;
