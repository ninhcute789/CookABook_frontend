import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getAllArticlesByUserId } from "../../services/UserSevices";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { handleDelete } from "../../services/ArticleServices";
import ArticleUpdate from "../update/ArticleUpdate";
import AddArticle from "../addForm/AddAritcle";

const UserArticles = () => {
  const context = useContext(AppContext);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1);
  const size = 6;

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

  const [articles, setArticles] = useState([]);
  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      //   const res = await getUsersById(parsedUser.id);
      //   context.setUser(res);
      const fetchUserArticles = await getAllArticlesByUserId(
        parsedUser.id,
        page,
        size,
        setArticles,
        setTotalPages,
        setTotalElements
      );
      setArticles(fetchUserArticles.data.data);
      console.log("👤 Dữ liệu bài báo:", fetchUserArticles.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [page]);

  return (
    <div className=" w-39/48">
      <div className=" mb-4 px-4">
        <h2 className="text-xl font-semibold pt-[22px]">
          Những bài báo bạn đã đăng
        </h2>
        <div className="-mb-6 mt-2 flex items-center justify-between">
          <AddArticle
            onSubmit={() => fetchUser()}
            initialData={{
              title: "",
              content: "",
              imageURL: "",
              createdBy: "",
            }}
          />
          <p className="text-white hover:cursor-default hover:-translate-2 duration-300
          mb-6 bg-green-700 py-1 px-2 rounded">
            Bạn đã đăng <span className="font-bold">{totalElements}</span> bài
            báo
          </p>
        </div>
        {articles?.length === 0 ? (
          <p className="text-gray-500 my-4">Bạn chưa có bài báo nào.</p>
        ) : (
          <>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
              {articles?.map((article) => (
                <div
                  key={article.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-2xl duration-300"
                >
                  <img src={article.imageURL} alt="" className="h-40 mx-auto" />
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 h-13">
                    {article.content}
                  </p>
                  <div className="flex justify-end space-x-2.5 mt-1">
                    <LuPencilLine
                      className="text-blue-500 hover:cursor-pointer hover:scale-150 duration-200"
                      onClick={() => setEditingArticleId(article.id)}
                    />
                    <GoTrash
                      className="text-red-500 hover:cursor-pointer hover:scale-150 duration-200"
                      onClick={() =>
                        handleDelete(article.id, setArticles, setTotalElements)
                      }
                    />
                  </div>
                  {editingArticleId === article.id && (
                    <ArticleUpdate
                      articleId={article.id}
                      onUpdateSuccess={handleUpdateSuccess}
                      onClose={handleCloseArticle}
                      article={article}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Phân trang */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => {
                  setPage((prev) => Math.max(prev - 1, 1));
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
                }}
                className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                  page === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
                }`}
                disabled={page === 1}
              >
                Trước
              </button>

              <span className="px-4 py-2 rounded-lg shadow-md">
                {page} / {totalPages}
              </span>

              <button
                onClick={() => {
                  setPage((prev) => Math.min(prev + 1, totalPages));
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
                }}
                className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                  page === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
                }`}
                disabled={page === totalPages}
              >
                Tiếp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserArticles;
