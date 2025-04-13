import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const forgotPasswordRequest = async (email) => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("❌ Không tìm thấy token!");
    //   return;
    // }

    const res = await axiosInstance.post(`/auth/forgot-password`, { email });
    toast.success(res.data.message);
    // toast.success("Lưu địa chỉ giao hàng vào session thành công!");
    return res; // Trả về dữ liệu để sử dụng sau này
  } catch (error) {
    console.error(
      "❌ Lỗi khi nhập Email:",
      error.response.data.error || error.message
    );
    toast.error(
      error.response.data.error || "Đã xảy ra lỗi. Vui lòng thử lại sau."
    );
  }
};

const checkToken = async (token) => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("❌ Không tìm thấy token!");
    //   return;
    // }

    const res = await axiosInstance.post(`/auth/check-token`, { token });
    toast.success(res.data.message);
    console.log("Token xác thực thành công:", res.data.message);
    return res; // Trả về dữ liệu để sử dụng sau này

    // toast.success("Lưu địa chỉ giao hàng vào session thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi khi nhập OTP:",
      error.response.data.error || error.message
    );
    toast.error(
      error.response.data.error || "Đã xảy ra lỗi. Vui lòng thử lại sau."
    );
  }
};

const resetPassword = async (newPassword) => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("❌ Không tìm thấy token!");
    //   return;
    // }

    const res = await axiosInstance.put(`/auth/reset-password`, {
      newPassword,
    });
    toast.success(res.data.message);
    console.log("Thành công:", res.data.message);
    // toast.success("Lưu địa chỉ giao hàng vào session thành công!");
  } catch (error) {
    console.error(
      "❌ Lỗi đặt mật khẩu mới:",
      error.response.data.error || error.message
    );
    toast.error(
      error.response.data.error || "Đã xảy ra lỗi. Vui lòng thử lại sau."
    );
  }
};

export { forgotPasswordRequest, checkToken, resetPassword };
