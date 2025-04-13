import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  forgotPasswordRequest,
  resetPassword,
} from "../../services/ForgotPasswordServices";
import bg from "../../assets/bg-10.jpg";
import { AppContext } from "../../context/AppContext";
import { MdOutlineMail } from "react-icons/md";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 73, behavior: "smooth" });
    console.log("Đã scroll lên đầu trang!");
  }, [pathname]);
  return null;
};

const NewPasswordInput = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate(); // Lấy hàm navigate từ context

  const [isLoading, setIsLoading] = useState(false); // State để quản lý loading
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password"); // State để quản lý kiểu mật khẩu (hiện/ẩn)
  const [confirmPasswordType, setConfirmPasswordType] = useState("password"); // State để quản lý kiểu mật khẩu xác nhận (hiện/ẩn)
  const [newPassword, setNewPassword] = useState(""); // State để quản lý mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // State để quản lý xác nhận mật khẩu mới
  // Xử lý scroll lên đầu trang khi thay đổi route

  const handleNewPassword = async () => {
    setIsLoading(true); // Bắt đầu loading
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu không khớp! Vui lòng kiểm tra lại.");
      setIsLoading(false); // Kết thúc loading
      return;
    }
    try {
      console.log("Email để reset mật khẩu:", email);
      await resetPassword(newPassword); // Gọi hàm gửi yêu cầu đặt lại mật khẩu

      // Chuyển sang path khác sau khi gửi thành công
        navigate("/dang-nhap"); // Thay "/xac-nhan-email" bằng path bạn muốn
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
    } finally {
      setIsLoading(false); // Kết thúc loading
      setEmail("");
    }
  };

  return (
    <div
      className="Login-container flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <ScrollToTop />

      {/* Popup Quên Mật Khẩu */}
      <div className="login-box w-xl text-white rounded-xl px-7 py-10 bg-transparent border-2 backdrop-blur-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNewPassword();
          }}
        >
          <h1 className="text-4xl text-center mb-4 font-bold">Quên mật khẩu</h1>
          <p className="mb-4 text-sm text-white text-center">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
          </p>

          {/* Tài khoản */}
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type={passwordType}
              placeholder="Nhập Mật Khẩu Mới"
              required
              value={newPassword}
              autoComplete="new-password"
              onChange={(e) => setNewPassword(e.target.value)}
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
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type={confirmPasswordType}
              placeholder="Nhập Lại Mật Khẩu"
              required
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-full bg-transparent rounded-4xl pl-5 pr-14 placeholder:text-white border-2 border-cyan-950"
            />
            {confirmPasswordType === "password" ? (
              <FaEyeSlash
                className="absolute right-4 top-3 size-6 cursor-pointer"
                onClick={() => setConfirmPasswordType("text")}
              />
            ) : (
              <FaEye
                className="absolute right-4 top-3 size-6 cursor-pointer"
                onClick={() => setConfirmPasswordType("password")}
              />
            )}
          </div>

          {/* Nút gửi yêu cầu */}
          <button
            type="submit"
            className="w-full bg-white text-black hover:cursor-pointer
                  h-14 rounded-4xl shadow-2xl font-bold text-xl 
                  hover:bg-black hover:text-white transition-all duration-300"
          >
            {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>

          {/* Chuyển sang đăng ký */}
          {/* <div className="text-center mt-4 text-xs text-white">
            Bạn chưa có tài khoản?{" "}
            <NavLink to="/dang-ky" className="font-bold hover:underline">
              Đăng ký ngay
            </NavLink>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default NewPasswordInput;
