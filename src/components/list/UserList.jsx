import { useState, useEffect } from "react";
import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import UserUpdate from "../update/UserUpdate";
import AddUsers from "../addForm/AddUsers";
import toast from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error(
          "❌ Không tìm thấy token! Người dùng có thể chưa đăng nhập."
        );
        return;
      }

      const res = await axios.get("http://localhost:8080/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Dữ liệu API trả về:", res.data);
      setUsers(res.data?.data?.data || []);
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
    fetchUsers();
  }, []);

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
          <div className="mt-2 flex justify-end space-x-2 mr-auto">
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

      await axios.delete(`http://localhost:8080/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

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
        onSubmit={fetchUsers}
        initialData={{
          username: "",
          password: "",
          name: "",
          dob: "",
          email: "",
          gender: "",
        }}
      />
      <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">Không có người dùng nào!</p>
      ) : (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <table className="min-w-full border-collapse border border-gray-300 rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Tên tài khoản
                </th>
                <th className="border border-gray-300 px-4 py-2">Họ và tên</th>
                <th className="border border-gray-300 px-4 py-2">Giới tính</th>
                <th className="border border-gray-300 px-4 py-2">Ngày sinh</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Thời gian tạo
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Thời gian sửa
                </th>
                <th className="border border-gray-300 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice()
                .reverse()
                .map(
                  (
                    user // Đảo ngược mảng để hiển thị người dùng mới nhất lên trên
                  ) => (
                    <tr
                      key={user.id}
                      className="border border-gray-300 hover:bg-gray-300 transition-all"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {user.username}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.gender}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(user.dob).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.createdAt}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.updatedAt}
                      </td>
                      <td className=" p-2 space-x-4 items-center justify-center flex h-10">
                        <LuPencilLine
                          className="text-blue-500 hover:cursor-pointer"
                          onClick={() => setEditingUserId(user.id)}
                        />

                        <GoTrash
                          className="text-red-700 hover:cursor-pointer"
                          onClick={() => handleDelete(user.id)}
                        />
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
                  )
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
