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

export { getBooksById };
