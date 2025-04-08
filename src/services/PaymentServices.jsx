import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const createPayment = async (
  method,
  amount,
  userId
  // setPaymentId,
) => {
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
    // setPaymentId(res.data.data.id); // Lưu paymentId vào state
    console.log("🚀 paymentId:", res.data.data.id);
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getCartPaymentById = async (cartId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/payments/get-cart/${cartId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

const savePaymentTosession = async (paymentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      `/orders/save-payment-to-session/${paymentId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    // console.log("✅ API trả về address:", res.data.data);
    // toast.success(res.data.message);
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getPaymentById = async (paymentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const updatePaymentStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.put(
      `/payments`,
      { id, status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(res.data.message);

    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

export {
  createPayment,
  getCartPaymentById,
  savePaymentTosession,
  getPaymentById,
  updatePaymentStatus,
};
