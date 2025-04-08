import toast from "react-hot-toast";
import SideBar from "../components/common/SideBar";
import AuthorList from "../components/list/AuthorList";
import axiosInstance from "../services/axiosInstance";
import { useEffect, useState } from "react";
const AdminAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Đảm bảo dữ liệu từ API là một mảng
        setAuthors(res.data?.data?.data || []);
        // setUsers(Array.isArray(res.data?.data?.data) ? res.data?.data?.data : []);
        // console.log("Danh sách người dùng - adminNews:", res.data?.data?.data);
        // toast.success(
        //   <div className="w-fit">🎉 Tải danh sách tác giả thành công!</div>
        // );
      } catch (error) {
        toast.error("Lỗi khi tải danh sách tác giả:", error);
        console.error("Lỗi khi tải danh sách tác giả:", error);
        setAuthors([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className=" w-full bg-gray-100">
      <AuthorList />
    </div>
  );
};

export default AdminAuthors;
