import { useState, useEffect } from "react";
import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import ArticleUpdate from "../update/ArticleUpdate";
import AddArticle from "../addForm/AddAritcle";
import toast from "react-hot-toast";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const pageSize = 10; // Số bài viết mỗi trang

  const fetchArticles = async (pageNumber) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/api/v1/articles?page=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log("✅ API trả về:", res.data);
      setArticles(res.data?.data?.data || []);
      console.log("Danh sách bài viết:", res.data?.data?.data);
      setTotalPages(res.data?.data?.meta?.totalPage);
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
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col">
          <span>Bạn có chắc muốn xóa bài viết này không?</span>
          <div className="mt-2 flex justify-end space-x-2 mr-auto">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await confirmDelete(id); // Thực hiện xóa
              }}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Xóa
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const confirmDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      await axios.delete(`http://localhost:8080/api/v1/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );

      toast.success("🗑 Xóa bài viết thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa bài viết:", error);
      toast.error("Không thể xóa bài viết!");
    }
  };

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
        onSubmit={fetchArticles}
        initialData={{ title: "", content: "", imageURL: "", createdBy: "" }}
      />
      <h2 className="text-xl font-bold mb-4">Danh sách bài báo</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">Không có bài báo nào!</p>
      ) : (
        <>
          <div
            className="grid grid-cols-2 
        [@media(max-width:845px)]:grid-cols-1 
        [@media(min-width:1160px)]:grid-cols-3 gap-4"
          >
            {articles
              .slice()
              .reverse()
              .map((article) => (
                <div key={article.id} className="border p-4 rounded shadow-lg">
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

                  <div className="flex space-x-2 ml-auto">
                    <LuPencilLine
                      className="text-blue-500 hover:cursor-pointer"
                      onClick={() => setEditingArticleId(article.id)}
                    />
                    <GoTrash
                      className="text-red-500 hover:cursor-pointer"
                      onClick={() => handleDelete(article.id)}
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
                scrollTo(0, 0);
              }}
              className={`px-4 py-2 border rounded-lg ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={page === 1}
            >
              Trước
            </button>

            <span className="px-4 py-2 border rounded-lg">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages));
                scrollTo(0, 0);
              }}
              className={`px-4 py-2 border rounded-lg ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
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
