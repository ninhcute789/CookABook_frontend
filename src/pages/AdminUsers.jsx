import { useEffect, useState } from "react";
import UserList from "../components/list/UserList";
// import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

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
        setUsers(res.data?.data?.data || []);
        // setUsers(Array.isArray(res.data?.data?.data) ? res.data?.data?.data : []);
        // console.log("Danh sách người dùng - adminNews:", res.data?.data?.data);
        toast.success(<div className="w-90">🎉 Tải danh sách người dùng thành công!</div>);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách người dùng:", error);
        console.error("Lỗi khi tải danh sách người dùng:", error);
        setUsers([]); 
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="w-full bg-gray-100">
      <UserList />
    </div>
  );
};

export default AdminUsers;
