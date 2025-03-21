import { useEffect, useState } from "react";
import SideBar from "../components/common/SideBar";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import BookList from "../components/list/BookList";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/books/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Đảm bảo dữ liệu từ API là một mảng
      setBooks(res.data?.data?.data || []);
      console.log("Danh sách sách - adminBooks:", res.data?.data?.data);
      // setArticles(Array.isArray(res.data?.data?.data) ? res.data?.data?.data : []);
      // console.log("Danh sách bài viết - adminNews:", res.data?.data?.data);
      toast.success("🎉 Tải danh sách sách thành công!");
    } catch (error) {
      toast.error("Lỗi khi tải danh sách sách:", error);
      console.error("Lỗi khi tải danh sách sách:", error);
      setBooks([]); // Nếu lỗi, đặt lại articles là mảng rỗng
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className=" w-full bg-gray-100">
      <BookList />
    </div>
  );
};

export default AdminBooks;
