import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const getUsersById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // toast.success("🎉 Lấy thông tin người dùng thành công!");
    return response.data.data;
  } catch (error) {
    console.error("❌ Error in getUser:", error);
    return null;
  }
};

const getUserAvatarById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/users/${id}/avatar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // toast.success("🎉 Lấy thông tin người dùng thành công!");

    return response.data;
  } catch (error) {
    console.error("❌ Error in getUser:", error);
    return null;
  }
};

const getAllArticlesByUserId = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/users/${id}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // toast.success("🎉 Lấy thông tin người dùng thành công!");

    return response.data;
  } catch (error) {
    console.error("❌ Error in getUser:", error);
    return null;
  }
};

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(
      <div className="w-90">🎉 Tải danh sách người dùng thành công!</div>
    );
    return res.data?.data?.data || [];

    // Đảm bảo dữ liệu từ API là một mảng
    //   setUsers(res.data?.data?.data || []);
    // setUsers(Array.isArray(res.data?.data?.data) ? res.data?.data?.data : []);
    // console.log("Danh sách người dùng - adminNews:", res.data?.data?.data);
  } catch (error) {
    toast.error("Lỗi khi tải danh sách người dùng:", error);
    console.error("Lỗi khi tải danh sách người dùng:", error);
    //   setUsers([]);
  }
};

export { getUsersById, fetchUsers, getUserAvatarById, getAllArticlesByUserId };
