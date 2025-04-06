import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const saveCartToSession = async (idCart) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      `/orders/save-cart-to-session/${idCart}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    console.log("✅ Lưu giỏ hàng vào session thành công:", res.data.message);
    toast.success("Lưu giỏ hàng vào session thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const saveAddressToSession = async (idAddress) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      `/orders/save-shipping-address-to-session/${idAddress}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    toast.success("Lưu địa chỉ giao hàng vào session thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const createOrder = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.post(
      `/orders`,
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(res.data.message);
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getOrderSession = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/orders/session`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success(res.data.message);
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success(res.data.message);
    return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

const getAllOrders = async (page, size, change) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.get(
      `/orders?page=${page}&size=${size}&sort=createdAt,${change}`,
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

const updateOrderStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token!");
      return;
    }

    const res = await axiosInstance.put(
      `/orders`,
      { orderId, status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(res.data.message);
    // toast.success(res.data.message);
    // return res.data.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách:",
      error.response?.data || error.message
    );
  }
};

export {
  saveCartToSession,
  saveAddressToSession,
  createOrder,
  getOrderSession,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
