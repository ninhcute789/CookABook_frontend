import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } catch (error) {
        console.error(
          "❌ Lỗi khi lấy danh sách bài báo:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">Không có người dùng nào!</p>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //   {users.map((user) => (
        //     <div key={user.id} className="border p-4 rounded shadow-lg">
        //       <h3 className="text-lg font-semibold">{user.username}</h3>
        //       <p className="text-gray-600">{user.name}</p>
        //       <p className="text-gray-600">{user.gender}</p>
        //       <p className="text-gray-600">{user.dob}</p>
        //       <p className="text-gray-600">{user.email}</p>
        //       <p className="text-gray-600">{user.createdAt}</p>
        //       <p className="text-gray-600">{user.updatedAt}</p>
        //       {/* <p className="">{user.createdBy} </p>
        //       <p className="">{user.createdAt} </p> */}
        //       {/* {user.imageURL && (
        //         <img
        //           src={user.imageURL}
        //           alt="User"
        //           className="w-full h-40 object-cover mt-2 rounded"
        //         />
        //       )} */}
        //     </div>
        //   ))}
        // </div>
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
                <th className="border border-gray-300 px-4 py-2">Sửa bởi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border border-gray-300">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
