import { useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
// import axios from "axios";
import bg from "../assets/bg-10.jpg";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("username") || ""
  );

  // Xử lý scroll lên đầu trang khi thay đổi route
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 70, behavior: "smooth" });
    }, [pathname]);
    return null;
  };

  // const handleLogin = async (event) => {
  //   event.preventDefault(); // Ngăn form reload trang

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8080/api/v1/auth/login",
  //       { username, password },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  //     console.log(response.data);
  //     console.log("Đăng nhập thành công!", response.data);
  //     localStorage.setItem("token", response.data.accessToken);

  //     // Gọi API lấy thông tin người dùng
  //     const userResponse = await axios.get(
  //       "http://127.0.0.1:8080/api/v1/user/me",
  //       {
  //         headers: { Authorization: `Bearer ${response.data.accessToken}` },
  //       }
  //     );

  //     localStorage.setItem("username", userResponse.data.username);
  //     alert("Đăng nhập thành công!");
  //     window.location.reload(); // Refresh trang
  //   } catch (error) {
  //     console.error(
  //       "Lỗi đăng nhập:",
  //       error.response?.data?.message || error.message
  //     );
  //     alert(error.response?.data?.message || "Đăng nhập thất bại!");
  //   }
  //   // Kiểm tra toàn bộ dữ liệu trả về
  // };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      console.log("Dữ liệu API trả về:", response.data);

      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.data.user)); // Lưu toàn bộ user vào localStorage
        localStorage.setItem("username", response.data.data.user.username);
        setLoggedInUser(username);
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        // window.location.reload();
      } else {
        toast.error("Đăng nhập thất bại! Kiểm tra lại thông tin đăng nhập.");
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div
      className="Login-container flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <ScrollToTop />
      <div className="login-box w-96 text-white rounded-xl px-7 py-10 bg-transparent border-2 backdrop-blur-xs">
        <form onSubmit={handleLogin}>
          <h1 className="text-4xl text-center mb-4 font-bold">Đăng nhập</h1>

          {/* Tài khoản */}
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type="text"
              placeholder="Tài khoản"
              required
              // title="Vui lòng điền vào trường này!" // Hiển thị tooltip khi hover chuột
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-full bg-transparent rounded-4xl pl-5 pr-14 placeholder:text-white border-2 border-cyan-950"
            />
            <FaUser className="absolute right-4 top-3 size-6" />
          </div>

          {/* Mật khẩu */}
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type={passwordType}
              placeholder="Mật khẩu"
              // required
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full bg-transparent rounded-4xl pl-5 pr-14 placeholder:text-white border-2 border-cyan-950"
            />
            {passwordType === "password" ? (
              <FaEyeSlash
                className="absolute right-4 top-3 size-6 cursor-pointer"
                onClick={() => setPasswordType("text")}
              />
            ) : (
              <FaEye
                className="absolute right-4 top-3 size-6 cursor-pointer"
                onClick={() => setPasswordType("password")}
              />
            )}
          </div>

          {/* Ghi nhớ & Quên mật khẩu */}
          <div className="flex justify-between my-3 text-xs text-black">
            <label>
              <input
                type="checkbox"
                className="size-3.5"
                onChange={() => setRemember(!remember)}
              />{" "}
              Lưu tài khoản
            </label>
            <NavLink to="#" className="hover:underline">
              Quên mật khẩu?
            </NavLink>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-white text-black h-14 rounded-4xl shadow-2xl font-bold text-xl hover:bg-black hover:text-white transition-all duration-300"
          >
            Đăng nhập
          </button>

          {/* Chuyển sang đăng ký */}
          <div className="text-center mt-4 text-xs text-white">
            Bạn chưa có tài khoản?{" "}
            <NavLink to="/dang-ky" className="font-bold hover:underline">
              Đăng ký ngay
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
