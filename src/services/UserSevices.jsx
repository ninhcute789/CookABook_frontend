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

const getAllArticlesByUserId = async (
  id,
  page,
  size,
  setArticles,
  setTotalPages,
  setTotalElements
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(
      `/users/${id}/articles?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // toast.success("🎉 Lấy thông tin người dùng thành công!");
    setArticles(response.data.data.data);
    setTotalPages(response.data.data.meta.totalPages);
    setTotalElements(response.data.data.meta.totalElements);

    // return response.data;
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

const handleUpdateUser = async (
  id,
  password,
  name,
  gender,
  dob,
  email,
  avatar,
  setUser
  // setEditingUserId
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.put(
      "/users",
      {
        id,
        password,
        name,
        gender,
        dob,
        email,
        avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("avatar đã được cập nhật:", res.data.data.avatar);
    console.log("✅ Người dùng đã được cập nhật:", res.data);
    const handleUpdate = (updatedUser) => {
      setUser((prevUser) => {
        if (!prevUser || typeof prevUser !== "object") {
          console.error(
            "❌ Lỗi: `prevUser` không phải là một object!",
            prevUser
          );
          return {};
        }

        console.log("🔄 Trước khi cập nhật:", prevUser);

        const updatedUserData = { ...prevUser, ...updatedUser }; // ✅ Gộp dữ liệu cũ với mới

        console.log("✅ Sau khi cập nhật:", updatedUserData);
        return updatedUserData;
      });
    };

    handleUpdate(res.data.data); // Cập nhật danh sách user
    // const handleClose = () => {
    //   setEditingUserId(null);
    // };
    // handleClose();
    // alert("🎉 Cập nhật người dùng thành công!");
    toast.success("🎉 Cập nhật người dùng thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật người dùng:", error);
    toast.error(
      "❌ Lỗi khi cập nhật người dùng:",
      error.response?.data || error.message
    );
  }
};

const getAllOrdersByUserId = async (
  userId,
  page,
  size,
  change,
  setTotalPages
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(
      `/users/${userId}/orders?page=${page}&size=${size}&sort=createdAt,${change}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true }
    );
    setTotalPages(response.data.data.meta.totalPages);
    return response.data.data.data;
    // return response.data;
  } catch (error) {
    console.error("❌ Error in getUser:", error);
    return null;
  }
};

const getTotalUserQuantity = async (setTotalUsers) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTotalUsers(res.data?.data?.meta?.totalElements);
  } catch (error) {
    console.error("Lỗi khi tải số lượng người dùng:", error);
  }
};

const handleUpdatePassword = async (
  username,
  oldPassword,
  newPassword,
  setUser
  // setEditingUserId
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.put(
      "/users/update-password",
      {
        username,
        oldPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const handleUpdate = (updatedUser) => {
      setUser((prevUser) => {
        if (!prevUser || typeof prevUser !== "object") {
          console.error(
            "❌ Lỗi: `prevUser` không phải là một object!",
            prevUser
          );
          return {};
        }

        console.log("🔄 Trước khi cập nhật:", prevUser);

        const updatedUserData = { ...prevUser, ...updatedUser }; // ✅ Gộp dữ liệu cũ với mới

        console.log("✅ Sau khi cập nhật:", updatedUserData);
        return updatedUserData;
      });
    };

    handleUpdate(res.data.data);
    toast.success("🎉 Cập nhật mật khẩu thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật người dùng:", error.response.data.error);
    toast.error(error.response.data.error);
  }
};

export {
  getUsersById,
  fetchUsers,
  getAllArticlesByUserId,
  handleUpdateUser,
  getAllOrdersByUserId,
  getTotalUserQuantity,
  handleUpdatePassword,
};
