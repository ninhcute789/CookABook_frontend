import { useState, useEffect } from "react";
// import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import UserUpdate from "../update/UserUpdate";
import AddUsers from "../addForm/AddUsers";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
// import { refreshAccessToken } from "../../api/AuthApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);

  const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10; // Số lượng người dùng trên mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số người dùng

  // const handleRefresh = async () => {
  //   const newAccessToken = await refreshAccessToken();
  //   if (newAccessToken) {
  //     console.log("Access token mới:", newAccessToken);
  //   } else {
  //     console.log("Lỗi khi làm mới token!");
  //   }
  // };

  const fetchUsers = async (page = 1) => {
    // console.log("📌 Giá trị page:", page); // Kiểm tra giá trị `page`

    if (typeof page !== "number") {
      toast.error("❌ Lỗi: page không phải số!", page);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error(
          "❌ Không tìm thấy token! Người dùng có thể chưa đăng nhập."
        );
        return;
      }

      const res = await axiosInstance.get(`/users?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("✅ Dữ liệu API trả về:", res.data);
      setUsers(res.data?.data?.data || []);
      // console.log("Danh sách người dùng:", res.data?.data?.data);
      // setCurrentPage(res.data?.data?.meta?.page || 1);
      // console.log("current page", res.data?.data?.meta?.page);
      setTotalElements(res.data?.data?.meta?.totalElements || 0);
      setTotalPages(res.data?.data?.meta?.totalPages || 1);
      // console.log("total page", res.data?.data?.meta?.totalPage);
      // console.log("📌 API response meta:", res.data?.data?.meta);
      // console.log("📌 page nhận từ API:", res.data?.data?.meta?.page);

      // toast.success(<div className="w-90">🎉 Tải danh sách người dùng thành công!</div>);
    } catch (error) {
      console.error(
        "❌ Lỗi khi lấy danh sách bài báo:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("🔄 useEffect đang gọi fetchUsers với page =", page);
    fetchUsers(page);
  }, [page]);

  const handleUpdate = (updatedUser) => {
    setUsers((prev) => {
      console.log("🔄 Trước khi cập nhật:", prev);
      const updatedUsers = prev.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
      console.log("✅ Sau khi cập nhật:", updatedUsers);
      return updatedUsers;
    });
  };

  const handleClose = () => {
    setEditingUserId(null);
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col">
          <span>Bạn có chắc muốn xóa người dùng này không?</span>
          <div className="mt-2 flex justify-end space-x-2 mr-auto ">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await confirmDelete(id); // Gọi hàm xóa
              }}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Xóa
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const confirmDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      await axiosInstance.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setTotalElements((prev) => prev - 1);

      toast.success("🗑 Xóa người dùng thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa người dùng:", error);
      toast.error("Không thể xóa người dùng!");
    }
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      <AddUsers
        onSubmit={() => fetchUsers()}
        initialData={{
          username: "",
          password: "",
          name: "",
          dob: "",
          email: "",
          gender: "",
        }}
      />
      <div className="flex flex-row mb-4 items-center [@media(max-width:600px)]:flex-col">
        <h2 className="text-xl font-bold">Danh sách người dùng</h2>
        <div
          className="flex items-center gap-2 ml-auto [@media(max-width:600px)]:mx-auto 
          bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg 
          shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="font-medium">
            Tổng số người dùng:
            <span className="ml-1 font-bold">{totalElements}</span>
          </span>
        </div>
      </div>
      {users.length === 0 ? (
        <p className="text-gray-500">Không có người dùng nào!</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Tên tài khoản
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Họ và tên
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Giới tính
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Ngày sinh
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Email
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Thời gian tạo
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Thời gian sửa
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-center">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {user.gender === "FEMALE" && "Nữ"}
                      {user.gender === "MALE" && "Nam"}
                      {user.gender === "OTHER" && "Khác"}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {new Date(user.dob).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {user.createdAt}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {user.updatedAt || "Chưa cập nhật"}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <LuPencilLine
                          className="text-blue-600 hover:text-blue-900 hover:cursor-pointer hover:scale-125 duration-200"
                          onClick={() => setEditingUserId(user.id)}
                        />
                        <GoTrash
                          className="text-red-600 hover:text-red-900 hover:cursor-pointer hover:scale-125 duration-200"
                          onClick={() => handleDelete(user.id)}
                        />
                      </div>
                      {editingUserId === user.id && (
                        <UserUpdate
                          user={user}
                          onUpdate={handleUpdate}
                          onClose={handleClose}
                          userId={user.id}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                // window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
              }`}
            >
              Trước
            </button>
            <span className="px-4 py-2 bg-white rounded">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages));
                // window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
              }`}
            >
              Tiếp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
