import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const getAuthorsById = async (id) => {
  try {
    // const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/books/all-by-author-id/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    // toast.success("🎉 Lấy thông tin bài báo thành công!");
    return response.data.data;
  } catch (error) {
    console.error("❌ Error in getAuthor:", error);
    return null;
  }
};

const handleDeleteAuthor = async (id, setAuthors, setTotalElements) => {
  const confirmToast = toast(
    (t) => (
      <div className="flex flex-col">
        <span>Bạn có chắc muốn xóa tác giả này không?</span>
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

                await axiosInstance.delete(`/authors/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });

                setAuthors((prevAuthors) =>
                  prevAuthors.filter((author) => author.id !== id)
                );
                if (setTotalElements) {
                  setTotalElements((prevTotal) => Math.max(prevTotal - 1, 0));
                }
                toast.success("🗑 Xóa tác giả thành công!");
              } catch (error) {
                console.error("❌ Lỗi khi xóa tác giả:", error);
                toast.error("Không thể xóa tác giả!");
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

export { handleDeleteAuthor, getAuthorsById };
