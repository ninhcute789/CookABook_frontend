import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const getBooksById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // toast.success("🎉 Lấy thông tin bài báo thành công!");
    return response.data.data;
  } catch (error) {
    console.error("❌ Error in getBook:", error);
    return null;
  }
};

const getAllBooksWithSizeAndPage = async (
  page,
  size,
  setBooks,
  setTotalPages,
  setTotalElements,
  change,
  content
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(
      `/books/all?page=${page}&size=${size}&sort=discountPrice,${change}&filter=title ~ '${content}' OR author.name ~ '${content}'`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("✅ API trả về:", res.data);
    setBooks(res.data?.data?.data || []);
    console.log("Danh sách sách:", res.data?.data?.data);
    setTotalPages(res.data?.data?.meta?.totalPages);
    // setPage(res.data?.data?.meta?.page);
    // console.log("trang hien tai:", res.data?.data?.meta?.page);
    setTotalElements(res.data?.data?.meta?.totalElements);
    console.log("Tổng số trang:", res.data?.data?.meta?.totalPages);
    console.log("Tổng số sách:", res.data?.data?.meta?.totalElements);
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getAllBooksPreview = async (
  page,
  size,
  setBooks,
  setTotalPages,
  setTotalElements,
  change,
  content
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(
      `/books/preview?page=${page}&size=${size}&sort=finalPrice,${change}&filter=title ~ '${content}' OR author.name ~ '${content}'`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("✅ API trả về:", res.data);
    setBooks(res.data?.data?.data || []);
    console.log("Danh sách sách:", res.data?.data?.data);
    setTotalPages(res.data?.data?.meta?.totalPages);
    // setPage(res.data?.data?.meta?.page);
    // console.log("trang hien tai:", res.data?.data?.meta?.page);
    setTotalElements(res.data?.data?.meta?.totalElements);
    console.log("Tổng số trang:", res.data?.data?.meta?.totalPages);
    console.log("Tổng số sách:", res.data?.data?.meta?.totalElements);
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const handleDeleteBook = async (id, setBooks, setTotalElements) => {
  const confirmToast = toast(
    (t) => (
      <div className="flex flex-col">
        <span>Bạn có chắc muốn xóa quyển sách này không?</span>
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

                await axiosInstance.delete(`/books/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });

                setBooks((prevBooks) =>
                  prevBooks.filter((book) => book.id !== id)
                );
                if (setTotalElements) {
                  setTotalElements((prevTotal) => Math.max(prevTotal - 1, 0));
                }
                toast.success("🗑 Xóa sách thành công!");
              } catch (error) {
                console.error("❌ Lỗi khi xóa sách:", error);
                toast.error("Không thể xóa sách!");
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

const getAllBooksWithCategoryId = async (
  page,
  size,
  setBooks,
  setTotalPages,
  setTotalElements,
  change,
  content,
  id
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(
      `/books/all-by-category/${id}?page=${page}&size=${size}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setBooks(res.data?.data?.data || []);
    console.log("Danh sách sách theo thể loại sách:", res.data?.data?.data);
    setTotalPages(res.data?.data?.meta?.totalPages);
    setTotalElements(res.data?.data?.meta?.totalElements);
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách sách theo thể loại sách:",
      error.response?.data || error.message
    );
  }
};

export {
  getBooksById,
  getAllBooksWithSizeAndPage,
  handleDeleteBook,
  getAllBooksWithCategoryId,
  getAllBooksPreview,
};
