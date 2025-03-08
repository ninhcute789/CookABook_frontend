import { useState, useEffect } from "react";
import axios from "axios";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          console.error("❌ Không tìm thấy token! Người dùng có thể chưa đăng nhập.");
          return;
        }
  
        const res = await axios.get("http://localhost:8080/api/v1/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("✅ Dữ liệu API trả về:", res.data);
        setArticles(res.data?.data?.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách bài báo:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);
  
  
  

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Danh sách bài báo</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">Không có bài báo nào!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.slice().reverse().map((article) => ( // Đảo ngược thứ tự bài viết
            <div key={article.id} className="border p-4 rounded shadow-lg">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600">{article.content}</p>
              <p className="">{article.createdBy} </p>
              <p className="">{article.createdAt} </p>
              {article.imageURL && (
                <img
                  src={article.imageURL}
                  alt="Article"
                  className="w-full h-40 object-cover mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
