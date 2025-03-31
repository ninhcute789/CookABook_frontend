import axios from "axios";
// import Cookies from "js-cookie";

const BASE_URL = "http://127.0.0.1:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Gửi cookie với request
});

// Xử lý refresh token khi Access Token hết hạn
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Gọi API refresh token
//         const refreshResponse = await axios.get(
//           `${BASE_URL}/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         // Lưu Access Token vào Cookie
//         Cookies.set("accessToken", refreshResponse.data.accessToken, {
//           expires: 1 / 96, // 15 phút
//           secure: true,
//           sameSite: "Strict",
//         });
//         console.log("Refresh Token thành công:", refreshResponse.data);
//         console.log("gi day:", refreshResponse.data.accessToken);
//         // Gửi lại request cũ với token mới
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${refreshResponse.data.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Lỗi khi refresh token:", refreshError);
//         Cookies.remove("accessToken"); // Xóa token khi refresh thất bại
//         window.location.href = "/dang-nhap"; // Chuyển hướng đăng nhập
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
