import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const getArticlesById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // toast.success("🎉 Lấy thông tin bài báo thành công!");
    return response.data.data
    ;
  } catch (error) {
    console.error("❌ Error in getUser:", error);
    return null;
  }
};

const getAllArticles = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/articles/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // toast.success("🎉 Lấy thông tin bài báo thành công!");
    return response.data.data.data;
  } catch (error) {
    console.error("❌ Error in getUser:", error);
    return null;
  }
};

const handleDelete = async (id, setArticles, setTotalElements) => {
  const confirmToast = toast(
    (t) => (
      <div className="flex flex-col">
        <span>Bạn có chắc muốn xóa bài viết này không?</span>
        <div className="mt-2 flex justify-end space-x-2 mr-auto">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const token = localStorage.getItem("token");
                if (!token) {
                  console.error("❌ Không tìm thấy token!");
                  toast.error("Bạn chưa đăng nhập!");
                  return;
                }

                await axiosInstance.delete(`/articles/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });

                setArticles((prevArticles) =>
                  prevArticles.filter((article) => article.id !== id)
                );
                if (setTotalElements) {
                  setTotalElements((prevTotal) => Math.max(prevTotal - 1, 0));
                }
                toast.success("🗑 Xóa bài viết thành công!");
              } catch (error) {
                console.error("❌ Lỗi khi xóa bài viết:", error);
                toast.error("Không thể xóa bài viết!");
              }
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
  confirmToast();
};

export { getArticlesById, getAllArticles, handleDelete };
