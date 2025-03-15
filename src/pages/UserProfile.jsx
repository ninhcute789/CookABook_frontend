import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../services/axiosInstance";
import { getUserById } from "../services/UserSevices";
import UserUpdate from "../components/update/UserUpdate";

const UserProfile = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        const res = await getUserById(parsedUser.id);
        setUser(res);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // add or remove overflow-y-hidden class to body
    if (editingUserId) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [editingUserId]);

  const handleClose = () => {
    setEditingUserId(null);
  };

  const handleUpdate = (updatedUser) => {
    setUser((prev) => {
      console.log("🔄 Trước khi cập nhật:", prev);
      const updatedUserData = { ...prev, ...updatedUser }; // ✅ Gộp dữ liệu cũ với mới
      console.log("✅ Sau khi cập nhật:", updatedUserData);
      return updatedUserData;
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-fit p-6 flex">
      {/* Profile Section */}
      <div className="IMAGE py-8 flex flex-col items-center w-2/5 px-10">
        <img
          src={user.avatar} // Thay bằng avatar thực tế
          alt="User Avatar"
          className="w-45 h-60 rounded-full border-4 border-gray-600 object-cover"
        />
        <h2 className="mt-3 text-xl font-bold">Đoàn Hải Ninh</h2>
        <p className="text-gray-400">@ninhcute789 · he/him</p>
        <p className="mt-2 text-sm">siuuuuuuuuuuu</p>
        {/* <button className="mt-3 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
          Edit Profile
        </button> */}
        <button
          className="mt-3 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
          onClick={() => setEditingUserId(user.id)}
        >
          Chỉnh sửa
        </button>
        {editingUserId === user.id && (
          <UserUpdate
            user={user}
            onUpdate={handleUpdate}
            onClose={handleClose}
            userId={user.id}
          />
        )}
      </div>
      <div className="CONTENT w-full">
        {/* Popular Repositories */}
        <div className="mt-6 flex flex-col">
          <h3 className="text-lg font-semibold">Popular repositories</h3>
          <div className="mt-3 space-y-3">
            <div className="bg-gray-800 p-4 rounded-md">
              <h4 className="text-blue-400 font-semibold">CookABook_backend</h4>
              <p className="text-gray-400 text-sm">
                Thiết kế trang web TMĐT làm đề án
              </p>
              <p className="text-gray-400 text-xs mt-1">🔶 Java · ⭐ 2</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <h4 className="text-yellow-400 font-semibold">
                CookABook_frontend
              </h4>
              <p className="text-gray-400 text-sm">React + Tailwind</p>
              <p className="text-gray-400 text-xs mt-1">🟡 JavaScript · ⭐ 1</p>
            </div>
          </div>
        </div>

        {/* Contribution Graph (Giả lập) */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">
            280 contributions in the last year
          </h3>
          <div className="mt-3 grid grid-cols-70 gap-1">
            {Array.from({ length: 280 }).map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-green-500 rounded-sm"
                style={{ opacity: Math.random() * 0.8  }}
              />
            ))}
          </div>
        </div>

        {/* Contribution Activity */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Contribution Activity</h3>
          <div className="bg-gray-800 p-4 mt-3 rounded-md">
            <p className="text-gray-400">📅 March 2025</p>
            <p className="mt-1 text-sm">
              🟢 Created 12 commits in 1 repository
            </p>
            <p className="text-blue-400 text-sm">
              CookABook_backend (12 commits)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
