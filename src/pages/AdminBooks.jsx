import { useEffect, useState } from "react";
import SideBar from "../components/common/SideBar";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import BookList from "../components/list/BookList";

const AdminBooks = () => {
<<<<<<< HEAD
  return (
    <div className="flex w-full bg-gray-100">
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
    </div>
  );
};

=======
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

>>>>>>> 95b940f87f65dff4e3929e02a7b7d1cd0cc8a8fa
export default AdminBooks;
