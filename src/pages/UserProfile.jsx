import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiMenu, FiX, FiUser, FiLogOut, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../services/axiosInstance";
import { getUserById } from "../services/UserSevices";
import UserUpdate from "../components/update/UserUpdate";

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  return (
    <div
      className={`fixed top-18 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300`}
    >
      <div className="p-3 h-14 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <FiX className="cursor-pointer" size={24} onClick={toggleSidebar} />
      </div>
      <nav className="mt-5 space-y-3">
        <a href="#" className=" flex items-center space-x-2 hover:bg-gray-700">
          <div className="px-5 py-2 hover:translate-x-3 w-full flex items-center space-x-2 duration-300">
            <FiUser /> <span>Hồ sơ</span>
          </div>
        </a>
        <a href="#" className=" flex items-center space-x-2 hover:bg-gray-700">
          <div className="px-5 py-2 hover:translate-x-3 w-full flex items-center space-x-2 duration-300">
            <FiFileText /> <span>Bài viết</span>
          </div>
        </a>
        <a
          href="#"
          className=" flex items-center space-x-2 hover:bg-red-600"
          onClick={handleLogout}
        >
          <div className="px-5 py-2 hover:translate-x-3 w-full flex items-center space-x-2 duration-300">
            <FiLogOut /> <span>Đăng xuất</span>
          </div>
        </a>
      </nav>
    </div>
  );
};
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default function UserDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(
      //   "🚀 ~ file: Header.jsx ~ line 68 ~ handleLogout ~ token",
      //   token
      // );
      // Xóa token & username sau khi logout thành công
      // localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user");
      setUser(""); // Reset lại state
      toast.success(response.data.message);
      navigate("/dang-nhap"); // Chuyển về trang đăng nhập
    } catch (error) {
      console.error(
        "❌ Lỗi khi đăng xuất:",
        error.response?.data || error.message
      );
      alert("Không thể đăng xuất, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex h-fit">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4 h-14 flex justify-between items-center">
          <FiMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
          {/* <h1 className="text-xl font-semibold">Bảng điều khiển</h1> */}
        </header>
        <main className={`p-6 ${isOpen ? "ml-64" : "ml-0"} duration-300`}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Chào mừng bạn!</h2>
            <p className="text-gray-600">Đây là bảng điều khiển người dùng.</p>
          </div>
          <div className="mt-10 border mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
            {/* <Test /> */}
            <img
              src={user && user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 object-center object-cover"
            />
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.gender}</p>
            <p className="text-gray-600">{user?.dob}</p>
            <p className="text-gray-600">{user?.username}</p>

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
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
        </main>
      </div>
    </div>
  );
}
