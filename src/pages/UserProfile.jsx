import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import axiosInstance from "../services/axiosInstance";
import { getUsersById } from "../services/UserSevices";
import UserUpdate from "../components/update/UserUpdate";
import {
  getAllArticlesWithSizeAndPage,
  getArticlesById,
  handleDelete,
} from "../services/ArticleServices";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import ArticleUpdate from "../components/update/ArticleUpdate";
import { truncateText } from "../services/CommonServices";
import AddArticle from "../components/addForm/AddAritcle";

const UserProfile = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
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
      setUser(res);
      // console.log("👤 Dữ liệu user:", res);
      // setArticles(res.articles);
      // console.log("👤 Ids bài báo:", res.articles);
      // const id = await res.articles.map((article) => getArticlesById(article.id));
      // console.log("👤 Dữ liệu bài báo:", id);
      const id = await Promise.all(
        res.articles.map((article) => getArticlesById(article.id))
      );
      setArticles(id);
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
    setUser((prev) => {
      console.log("🔄 Trước khi cập nhật:", prev);
      const updatedUserData = { ...prev, ...updatedUser }; // ✅ Gộp dữ liệu cũ với mới
      console.log("✅ Sau khi cập nhật:", updatedUserData);
      return updatedUserData;
    });
  };

  return (
    <div className="m-4 bg-white shadow-2xl shadow-neutral-600 rounded text-black min-h-fit p-6 flex lg:flex-row flex-col">
      {/* Profile Section */}
      <div className="IMAGE py-4 flex flex-col items-center lg:w-2/5 px-10">
        <div className="relative">
          <img
            src={user.avatar} // Thay bằng avatar thực tế
            alt=""
            className="w-65 h-65 my-4 rounded-full border-2 border-gray-600 object-cover shadow-2xl shadow-neutral-900"
          />
          {!user.avatar && (
            <p className="absolute left-1/2 -translate-1/2  top-1/2 font-bold text-center text-gray-500 w-full">
              Ảnh đại diện
            </p>
          )}
        </div>
        <h2 className="mt-3 text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-400 text-lg">
          {user.email} · {user.gender === "MALE" && "he/him"}
          {user.gender === "FEMALE" && "she/her"}
          {user.gender === "OTHER" && "they/them"}
        </p>
        {/* <button className="mt-3 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
          Edit Profile
        </button> */}
        <button
          className="mt-3 px-4 py-2 hover:cursor-pointer hover:text-white border
          bg-white duration-300 rounded-md hover:bg-gray-600 text-lg"
          onClick={() => setEditingUserId(user.id)}
        >
          Chỉnh sửa
        </button>
        {editingUserId === user.id && (
          <UserUpdate
            user={user}
            onUpdate={handleUpdate}
            onClose={handleCloseUser}
            userId={user.id}
          />
        )}
      </div>
      <div className="CONTENT w-full">
        {/* Bio */}
        <div className="ARTICLES mt-6">
          <div className="bg-gray-800 p-4 rounded-md shadow-md shadow-neutral-700 mb-6">
            <div className="text-white text-center font-semibold text-2xl">
              Những bài báo bạn đã đăng
            </div>
          </div>
          <AddArticle
            onSubmit={() => fetchUser()}
            initialData={{
              title: "",
              content: "",
              imageURL: "",
              createdBy: "",
            }}
          />
          <div className=" overflow-hidden rounded-lg border border-gray-300">
            {articles.filter((article) => article.user?.id === currentUserId)
              .length === 0 ? (
              <div className="text-center p-4 text-gray-400">
                Bạn chưa đăng bài nào
              </div>
            ) : (
              <table className="min-w-full border-collapse border border-gray-300 shadow-md">
                {/* Header */}
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Tiêu đề</th>
                    <th className="border border-gray-300 p-2">Nội dung</th>
                    <th className="border border-gray-300 p-2">Ngày tạo</th>
                    <th className="border border-gray-300 p-2">Cập nhật</th>
                    {/* <th className="border border-gray-300 p-2">Hành động</th> */}
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="border border-gray-300 hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 p-2">
                        {article.title}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {/* {article?.user?.name || "Không rõ"} */}
                        {truncateText(article.content, 5)}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {article.createdAt}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {article.updatedAt || "Chưa cập nhật"}
                      </td>
                      <td className="items-center p-2 flex h-10 justify-center space-x-3">
                        <LuPencilLine
                          className="text-blue-500 hover:cursor-pointer hover:scale-150 duration-200"
                          onClick={() => setEditingArticleId(article.id)}
                        />
                        <GoTrash
                          className="text-red-500 hover:cursor-pointer hover:scale-150 duration-200"
                          onClick={() =>
                            handleDelete(
                              article.id,
                              setArticles,
                              setTotalElements
                            )
                          }
                        />
                        {editingArticleId === article.id && (
                          <ArticleUpdate
                            articleId={article.id}
                            onUpdateSuccess={handleUpdateSuccess}
                            onClose={handleCloseArticle}
                            article={article}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

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
          <div className="mt-3 grid grid-cols-70 gap-1 bg-gray-800 p-4 rounded">
            {Array.from({ length: 280 }).map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-green-500 rounded-sm"
                style={{ opacity: Math.random() * 0.8 + 0.2 }}
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
