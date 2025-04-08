import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import CategoryList from "../components/list/CategoryList";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/categories/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Đảm bảo dữ liệu từ API là một mảng
      setCategories(res.data?.data?.data || []);
      // setArticles(Array.isArray(res.data?.data?.data) ? res.data?.data?.data : []);
      // console.log("Danh sách bài viết - adminNews:", res.data?.data?.data);
      // toast.success("🎉 Tải danh sách thể loại thành công!");
    } catch (error) {
      toast.error("Lỗi khi tải danh sách thể loại:", error);
      console.error("Lỗi khi tải danh sách thể loại:", error);
      setCategories([]); // Nếu lỗi, đặt lại articles là mảng rỗng
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className=" w-full bg-gray-100">
      <CategoryList />
    </div>
  );
};

export default AdminCategories;
