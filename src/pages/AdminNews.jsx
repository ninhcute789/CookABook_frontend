import { useEffect, useState } from "react";
import ArticleList from "../components/list/ArticleList";
// import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";
// import SideBar from "../components/common/SideBar";

const AdminNews = () => {
<<<<<<< HEAD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };
=======
  const [articles, setArticles] = useState([]);
>>>>>>> 95b940f87f65dff4e3929e02a7b7d1cd0cc8a8fa

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
<<<<<<< HEAD
      {/* <div className="flex flex-col">
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
            </div> */}
      <AddArticleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitArticle}
        initialData={{ title: "", content: "", imageURL: "", createdBy: "" }}
      />

      <button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:cursor-pointer mt-10 ml-10 w-50
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Thêm bài báo
      </button>
      <ArticleList truncateText={truncateText} />
=======
      <ArticleList />
>>>>>>> 95b940f87f65dff4e3929e02a7b7d1cd0cc8a8fa
    </div>
  );
};

export default AdminNews;
