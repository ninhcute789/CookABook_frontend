import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import ArticleUpdate from "../update/ArticleUpdate";

const ArticleList = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArticleId, setEditingArticleId] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ Không tìm thấy token!");
          return;
        }

        const res = await axios.get("http://localhost:8080/api/v1/articles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ API trả về:", res.data);
        setArticles(res.data?.data?.data || []);
      } catch (error) {
        console.error(
          "❌ Lỗi khi lấy danh sách:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleClose = () => {
    setEditingArticleId(null);
  };

  // Hàm xử lý xóa bài báo
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này không?")) return;

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

      alert("🗑 Xóa bài viết thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa bài viết:", error);
      alert("Không thể xóa bài viết!");
    }
  };

  // Hàm cập nhật danh sách bài viết sau khi chỉnh sửa
  const handleUpdateSuccess = (updatedArticle) => {
    setEditingArticleId(null);
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === updatedArticle.data.id
          ? { ...article, ...updatedArticle.data }
          : article
      )
    );
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Danh sách bài báo</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">Không có bài báo nào!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles
            .slice()
            .reverse()
            .map((article) => (
              <div key={article.id} className="border p-4 rounded shadow-lg">
                <h3 className="text-lg font-semibold line-clamp-1">{article.title}</h3>
                <p className="text-gray-600">
                  {props.truncateText(article.content, 10)}
                </p>

                <p className="font-medium">
                  {console.log(article?.user?.name)}
                  Tạo bởi - {article?.user?.name || "K có biết"}
                </p>
                <p className="font-medium">Thời gian - {article.createdAt}</p>
                <p className="font-medium">
                  Cập nhật - {article.updatedAt || "Chưa có"}
                </p>
                {article.imageURL && (
                  <img
                    src={article.imageURL}
                    alt="Article"
                    className="w-full h-40 object-cover mt-2 rounded"
                  />
                )}

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
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

ArticleList.propTypes = {
  truncateText: PropTypes.func.isRequired,
};

export default ArticleList;
