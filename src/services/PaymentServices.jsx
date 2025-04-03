import axiosInstance from "./axiosInstance";

const createPayment = async (method, amount, userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      `/payments`,
      {
        method,
        amount,
        userId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("✅ API trả về address:", res.data.data);
    // toast.success("🛒 Lấy địa chỉ thành công!");
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

export { createPayment };
