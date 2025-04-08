import { useState, useEffect } from "react";
// import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import ArticleUpdate from "../update/ArticleUpdate";
import AddArticle from "../addForm/AddAritcle";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
import { handleDelete } from "../../services/ArticleServices";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const size = 6; // Số bài viết mỗi trang
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
      // setPage(res.data?.data?.meta?.page);
      // console.log("trang hien tai:", res.data?.data?.meta?.page);
      setTotalElements(res.data?.data?.meta?.totalElements);
      console.log("Tổng số trang:", res.data?.data?.meta?.totalPages);
      console.log("Tổng số bài viết:", res.data?.data?.meta?.totalElements);
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

  const handleClose = () => {
    setEditingArticleId(null);
  };

  // Hàm xử lý xóa bài báo
  // const handleDelete = (id) => {
  //   toast(
  //     (t) => (
  //       <div className="flex flex-col">
  //         <span>Bạn có chắc muốn xóa bài viết này không?</span>
  //         <div className="mt-2 flex justify-end space-x-2 mr-auto">
  //           <button
  //             onClick={async () => {
  //               toast.dismiss(t.id);
  //               await confirmDelete(id); // Thực hiện xóa
  //             }}
  //             className="px-4 py-2 bg-red-500 text-white rounded"
  //           >
  //             Xóa
  //           </button>
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             className="px-4 py-2 bg-gray-500 text-white rounded"
  //           >
  //             Hủy
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     { duration: Infinity }
  //   );
  // };

  // <handleDelete
  //   id={articles.id}
  //   setArticles={setArticles(articles)}
  //   setTotalElements={setTotalElements}
  // />;

  // const handleDelete = async (id) => {
  //   const confirmToast = toast(
  //     (t) => (
  //       <div className="flex flex-col">
  //         <span>Bạn có chắc muốn xóa bài viết này không?</span>
  //         <div className="mt-2 flex justify-end space-x-2 mr-auto">
  //           <button
  //             onClick={async () => {
  //               toast.dismiss(t.id);
  //               try {
  //                 const token = localStorage.getItem("token");
  //                 if (!token) {
  //                   console.error("❌ Không tìm thấy token!");
  //                   toast.error("Bạn chưa đăng nhập!");
  //                   return;
  //                 }

  //                 await axiosInstance.delete(`/articles/${id}`, {
  //                   headers: { Authorization: `Bearer ${token}` },
  //                 });

  //                 setArticles((prevArticles) =>
  //                   prevArticles.filter((article) => article.id !== id)
  //                 );
  //                 setTotalElements((prevTotal) => Math.max(prevTotal - 1, 0));

  //                 toast.success("🗑 Xóa bài viết thành công!");
  //               } catch (error) {
  //                 console.error("❌ Lỗi khi xóa bài viết:", error);
  //                 toast.error("Không thể xóa bài viết!");
  //               }
  //             }}
  //             className="px-4 py-2 bg-red-500 text-white rounded"
  //           >
  //             Xóa
  //           </button>
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             className="px-4 py-2 bg-gray-500 text-white rounded"
  //           >
  //             Hủy
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     { duration: Infinity }
  //   );
  //   confirmToast();
  // };

  // const confirmDelete = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("❌ Không tìm thấy token!");
  //       return;
  //     }

  //     await axiosInstance.delete(`/articles/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setArticles((prevArticles) =>
  //       prevArticles.filter((article) => article.id !== id)
  //     );
  //     setTotalElements((prevTotal) => Math.max(prevTotal - 1, 0));

  //     toast.success("🗑 Xóa bài viết thành công!");
  //   } catch (error) {
  //     console.error("❌ Lỗi khi xóa bài viết:", error);
  //     toast.error("Không thể xóa bài viết!");
  //   }
  // };

  // Hàm cập nhật danh sách bài viết sau khi chỉnh sửa
  const handleUpdateSuccess = (updatedArticle) => {
    setEditingArticleId(null); // Đóng form chỉnh sửa
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === updatedArticle.data.id
          ? { ...article, ...updatedArticle.data }
          : article
      )
    );
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      <AddArticle
        onSubmit={(e) => fetchArticles(e)}
        initialData={{ title: "", content: "", imageURL: "", createdBy: "" }}
      />
      <div className="flex flex-row mb-4 items-center [@media(max-width:600px)]:flex-col">
        <h2 className="text-xl font-bold">Danh sách bài báo</h2>
        <div
          className="flex items-center gap-2 ml-auto [@media(max-width:600px)]:mx-auto 
          bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg 
          shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"
            />
          </svg>
          <span className="font-medium">
            Số lượng bài báo:
            <span className="ml-1 font-bold">{totalElements}</span>
          </span>
        </div>
      </div>
      {articles.length === 0 ? (
        <p className="text-gray-500">Không có bài báo nào!</p>
      ) : (
        <>
          <div
            className="grid grid-cols-2 
        [@media(max-width:845px)]:grid-cols-1 
        [@media(min-width:1160px)]:grid-cols-3 gap-4"
          >
            {articles.map((article) => (
              <div
                key={article.id}
                className=" p-4 rounded shadow-md hover:shadow-xl duration-300 shadow-[#6969]"
              >
                <h3 className="text-lg font-semibold line-clamp-1">
                  {article.title}
                </h3>
                {article.imageURL && (
                  <img
                    src={article.imageURL}
                    alt="Article"
                    className="w-full h-60 object-cover mt-2 rounded"
                  />
                )}
                <p className="text-gray-600 line-clamp-2 h-13">
                  {article.content}
                </p>

                <p className="font-medium">
                  {/* {console.log(article?.user?.name)} */}
                  Tạo bởi - {article?.user?.name || "K có biết"}
                </p>
                <p className="font-medium">Thời gian - {article.createdAt}</p>
                <p className="font-medium">
                  Cập nhật - {article.updatedAt || "Chưa có"}
                </p>

                <div className="flex space-x-2 ml-auto mt-2">
                  <LuPencilLine
                    className="text-blue-500 hover:cursor-pointer hover:scale-150 duration-200"
                    onClick={() => setEditingArticleId(article.id)}
                  />
                  <GoTrash
                    className="text-red-500 hover:cursor-pointer hover:scale-150 duration-200"
                    onClick={() =>
                      handleDelete(article.id, setArticles, setTotalElements)
                    }
                  />

                  {editingArticleId === article.id && (
                    <ArticleUpdate
                      articleId={article.id}
                      onUpdateSuccess={handleUpdateSuccess}
                      onClose={handleClose} // Đóng form khi cập nhật xong hoặc bấm "Hủy"
                      article={article}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Phân trang */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
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
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
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
        </>
      )}
    </div>
  );
};

export default ArticleList;
