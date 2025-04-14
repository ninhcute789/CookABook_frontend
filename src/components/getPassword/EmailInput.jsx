import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../../services/ForgotPasswordServices";
import bg from "../../assets/bg-10.jpg";
import { MdOutlineMail } from "react-icons/md";
import toast from "react-hot-toast";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 70, behavior: "smooth" });
    // console.log("Đã scroll lên đầu trang!");
  }, [pathname]);
  return null;
};

const EmailInput = () => {
  const navigate = useNavigate(); // Lấy hàm navigate từ context

  const [isLoading, setIsLoading] = useState(false); // State để quản lý loading
  const [email, setEmail] = useState("");
  // Xử lý scroll lên đầu trang khi thay đổi route

  const handleForgotPassword = async () => {
    setIsLoading(true); // Bắt đầu loading
    try {
      console.log("Email để reset mật khẩu:", email);
      const res = await toast.promise(
        forgotPasswordRequest(email), // Promise cần theo dõi
        {
          loading: "Đang gửi yêu cầu...",
          success: "Đã gửi mã xác nhận đến email",
          error: "Đã xảy ra lỗi. Vui lòng thử lại!",
        }
      );
      console.log("Kết quả gửi yêu cầu:", res.data.message);

      // Chuyển sang path khác sau khi gửi thành công
      if (res.data.message) {
        navigate("/quen-mat-khau/nhap-otp");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      //   toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
    } finally {
      setIsLoading(false); // Kết thúc loading
      //   setEmail("");
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
            handleForgotPassword();
          }}
        >
          <h1 className="text-4xl text-center mb-4 font-bold">Quên mật khẩu</h1>
          <p className="mb-4 text-sm text-white text-center">
            Nhập email của bạn để nhận mã OTP đặt lại mật khẩu
          </p>

          {/* Tài khoản */}
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type="text"
              placeholder="Nhập Email"
              required
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full bg-transparent rounded-4xl pl-5 pr-14 placeholder:text-white border-2 border-cyan-950"
            />
            <MdOutlineMail className="absolute right-4 top-3 size-6" />
          </div>

          {/* Nút gửi yêu cầu */}
          <button
            type="submit"
            className="w-full bg-white text-black hover:cursor-pointer
                  h-14 rounded-4xl shadow-2xl font-bold text-xl 
                  hover:bg-black hover:text-white transition-all duration-300"
          >
            {isLoading ? <div className="spinner-border"></div> : "Gửi yêu cầu"}
          </button>

          <div className="text-center mt-4 text-xs text-white flex flex-row gap-2 justify-between px-5">
            <Link to="/dang-nhap" className="font-bold hover:underline">
              Trở lại
            </Link>
            <div>
              Bạn chưa có tài khoản?{" "}
              <NavLink to="/dang-ky" className="font-bold hover:underline">
                Đăng ký ngay
              </NavLink>
            </div>
          </div>

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

export default EmailInput;
