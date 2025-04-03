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
      }
    );
    console.log("✅ Lưu giỏ hàng vào session thành công:", res.data);
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

export { saveCartToSession, saveAddressToSession };
