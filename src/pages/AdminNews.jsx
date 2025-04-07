import { useEffect, useState } from "react";
import ArticleList from "../components/list/ArticleList";
// import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";
// import SideBar from "../components/common/SideBar";

const AdminNews = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/articles/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Đảm bảo dữ liệu từ API là một mảng
      setArticles(res.data?.data?.data || []);
      // setArticles(Array.isArray(res.data?.data?.data) ? res.data?.data?.data : []);
      console.log("Danh sách bài viết - adminNews:", res.data?.data?.data);
      // toast.success("🎉 Tải danh sách bài viết thành công!");
      // fetchArticles();
    } catch (error) {
      toast.error("Lỗi khi tải danh sách bài viết:", error);
      console.error("Lỗi khi tải danh sách bài viết:", error);
      setArticles([]); // Nếu lỗi, đặt lại articles là mảng rỗng
    }
  };
  
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className=" w-full bg-gray-100">
      <ArticleList />
    </div>
  );
};

export default AdminNews;
