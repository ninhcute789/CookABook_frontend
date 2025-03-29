import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const handleDeleteCategory = async (id, setCategories, setTotalElements) => {
  const confirmToast = toast(
    (t) => (
      <div className="flex flex-col">
        <span>Bạn có chắc muốn xóa thể loại này không?</span>
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

                await axiosInstance.delete(`/categories/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });

                setCategories((prevCategories) =>
                  prevCategories.filter((category) => category.id !== id)
                );
                if (setTotalElements) {
                  setTotalElements((prevTotal) => Math.max(prevTotal - 1, 0));
                }
                toast.success("🗑 Xóa thể loại sách thành công!");
              } catch (error) {
                console.error("❌ Lỗi khi xóa thể loại sách:", error);
                toast.error("Không thể xóa thể loại sách!");
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

const getAllCategoriesWithSizeAndPage = async (
  page,
  size,
  setCategories,
  setTotalPages,
  setTotalElements
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(
      `/categories/all?page=${page}&size=${size}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("✅ API trả về:", res.data);
    setCategories(res.data?.data?.data || []);
    // console.log("Danh sách bài viết:", res.data?.data?.data);
    setTotalPages(res.data?.data?.meta?.totalPages);
    // setPage(res.data?.data?.meta?.page);
    // console.log("trang hien tai:", res.data?.data?.meta?.page);
    setTotalElements(res.data?.data?.meta?.totalElements);
    // console.log("Tổng số trang:", res.data?.data?.meta?.totalPages);
    // console.log("Tổng số bài viết:", res.data?.data?.meta?.totalElements);
    return res;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

export { handleDeleteCategory, getAllCategoriesWithSizeAndPage };
