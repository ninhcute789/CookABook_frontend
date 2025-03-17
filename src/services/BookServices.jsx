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
    console.error("❌ Error in getUser:", error);
    return null;
  }
};

const getAllBooksWithSizeAndPage = async (
  page,
  size,
  setBooks,
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
      `/books/all?page=${page}&size=${size}`,
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

export { getBooksById, getAllBooksWithSizeAndPage };
