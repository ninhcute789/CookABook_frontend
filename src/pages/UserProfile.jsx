import { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import axiosInstance from "../services/axiosInstance";
import { getAllArticlesByUserId, getUsersById } from "../services/UserSevices";
import UserUpdate from "../components/update/UserUpdate";
import { handleDelete } from "../services/ArticleServices";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import ArticleUpdate from "../components/update/ArticleUpdate";
import { truncateText } from "../services/CommonServices";
import AddArticle from "../components/addForm/AddAritcle";
import ava from "../assets/ava.png"; // Thay bằng ảnh đại diện thực tế
import { AppContext } from "../context/AppContext";
import { Outlet, useNavigate } from "react-router";
import { FaBell } from "react-icons/fa";
import { RiFileList2Fill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { PiAddressBookFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const UserProfile = () => {
  const context = useContext(AppContext);

  // const [user, setUser] = useState({});

  const navigate = useNavigate();

  const [editingUserId, setEditingUserId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [totalElements, setTotalElements] = useState(0); // Tổng số người dùng

  const parsedUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = parsedUser.id;
  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const res = await getUsersById(parsedUser.id);
      context.setUser(res);
      const fetchUserArticles = await getAllArticlesByUserId(parsedUser.id);
      setArticles(fetchUserArticles.data.data);
      // console.log("👤 Dữ liệu bài báo:", id);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // add or remove overflow-y-hidden class to body
    if (editingUserId || editingArticleId) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [editingUserId, editingArticleId]);

  const handleCloseArticle = () => {
    setEditingArticleId(null);
  };
  const handleCloseUser = () => {
    setEditingUserId(null);
  };

  const handleUpdateSuccess = (updatedArticle) => {
    setEditingArticleId(null); // Đóng form chỉnh sửa
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === updatedArticle.data.id
          ? { ...article, ...updatedArticle.data }
          : article
      )
    );
  };

  const handleUpdate = (updatedUser) => {
    context.setUser((prev) => {
      console.log("🔄 Trước khi cập nhật:", prev);
      const updatedUserData = { ...prev, ...updatedUser }; // ✅ Gộp dữ liệu cũ với mới
      console.log("✅ Sau khi cập nhật:", updatedUserData);
      return updatedUserData;
    });
  };

  const [name, setName] = useState("Lê Minh Khánh");
  const [nickname, setNickname] = useState("khanh-131");
  const [dob, setDob] = useState({ day: "13", month: "10", year: "2004" });
  const [gender, setGender] = useState("Nam");
  const [country, setCountry] = useState("Việt Nam");

  return (
    <div
      className=" shadow-2xl w-full bg-[#e6e6e6] 
    shadow-neutral-600 text-black min-h-fit px-6 flex lg:flex-row flex-col"
    >
      <div className="flex mx-auto min-h-screen w-18/24">
        {/* Sidebar */}
        <div className="w-9/48 bg-transparent p-4">
          <div className="flex items-center space-x-3">
            <img
              src={context.user?.avatar || ava}
              alt="Avatar"
              className="w-12 h-12 rounded-full "
            />
            <div className="flex flex-col">
              <p className="text-sm text-gray-900">Tài khoản của</p>
              <p className="font-medium">{context?.user.name}</p>
            </div>
          </div>
          <ul className="mt-2 space-y-2">
            <li
              className="p-2 hover:bg-gray-400 text-sm flex items-center
            hover:cursor-pointer duration-100 rounded cursor-pointer"
              onClick={() => navigate("/thong-tin-tai-khoan")}
            >
              <FaUser className="mr-2" />
              Thông tin tài khoản
            </li>
            <li
              className="p-2 hover:bg-gray-400 text-sm flex items-center
            hover:cursor-pointer duration-100 rounded cursor-pointer"
            >
              <FaBell className="mr-2" />
              Thông báo của bạn
            </li>
            <li
              className="p-2 hover:bg-gray-400 text-sm flex items-center
            hover:cursor-pointer duration-100 rounded cursor-pointer"
            onClick={() => navigate("/thong-tin-tai-khoan/don-hang")}
            >
              <RiFileList2Fill className="mr-2" />
              Quản lý đơn hàng
            </li>
            <li
              className="p-2 hover:bg-gray-400 text-sm flex items-center 
            hover:cursor-pointer duration-100 rounded cursor-pointer"
            >
              <IoNewspaper className="mr-2" />
              Bài báo của bạn
            </li>
            <li
              className="p-2 hover:bg-gray-400 text-sm flex items-center 
              hover:cursor-pointer duration-100 rounded cursor-pointer"
              onClick={() => navigate("/thong-tin-tai-khoan/dia-chi")}
            >
              <PiAddressBookFill className="mr-2" />
              Địa chỉ
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export { UserProfile };
