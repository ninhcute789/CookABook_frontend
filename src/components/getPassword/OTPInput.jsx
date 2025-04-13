import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkToken } from "../../services/ForgotPasswordServices";
import bg from "../../assets/bg-10.jpg";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 70, behavior: "smooth" });
    // console.log("Đã scroll lên đầu trang!");
  }, [pathname]);
  return null;
};

const OTPInput = () => {
  const navigate = useNavigate(); // Lấy hàm navigate từ context
  const [otp, setOtp] = useState(new Array(6).fill("")); // Mảng 6 phần tử để lưu giá trị OTP

  const handleChange = (element, index) => {
    const value = element.value;
    if (value.length <= 1) {
      // Chỉ cho phép nhập 1 ký tự
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Tự động chuyển sang ô tiếp theo nếu nhập xong
      if (value !== "" && element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      otp[index] === "" &&
      event.target.previousSibling
    ) {
      event.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Ghép các giá trị thành chuỗi OTP

    try {
      console.log("Mã OTP:", otpCode);

      // Gửi mã OTP đến server để xác nhận
      const response = await checkToken(otpCode); // Gọi API xác nhận OTP
      console.log("Kết quả xác nhận OTP:", response);
      if (response.data.message) {
        // Chuyển sang path khác sau khi xác nhận thành công
        navigate("/quen-mat-khau/nhap-mat-khau-moi");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận OTP:", error );
      //   toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
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
            handleSubmit(e);
          }}
        >
          <h1 className="text-4xl text-center mb-4 font-bold">Quên mật khẩu</h1>
          <p className="mb-4 text-sm text-white text-center">
            Nhập mã OTP đã gửi đến email của bạn để xác nhận yêu cầu đặt lại mật
            khẩu.
          </p>

          {/* 6 ô nhập mã OTP */}
          <div className="flex justify-center gap-2 mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-black bg-white border-2 border-cyan-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Nút gửi OTP */}
          <button
            type="submit"
            className="w-full bg-white text-black hover:cursor-pointer
                  h-14 rounded-4xl shadow-2xl font-bold text-xl 
                  hover:bg-black hover:text-white transition-all duration-300"
          >
            Xác nhận OTP
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

export default OTPInput;
