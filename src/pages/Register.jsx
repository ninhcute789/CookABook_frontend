// import cr7 from '../assets/cr7.jpeg';
// import cr7_2 from '../assets/cr7_2.jpg';
// import cr7_3 from '../assets/cr7_3.jpg';
// import cr7_5 from '../assets/cr7_5.jpg';
import { FaUser } from "react-icons/fa";
import { LuCalendarFold } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { RiMoneyCnyBoxFill } from "react-icons/ri";
import { GiFrozenArrow } from "react-icons/gi";
import bg from "../assets/bg-10.jpg";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Register = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [rewirtePasswordType, setRewirtePasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [rewirtePassword, setRewirtePassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Date:", date);
    console.log("Email:", email);
    console.log("Gender:", gender);
    console.log("Username:", userName);
    console.log("Password:", password);
    console.log("RewirtePassword:", rewirtePassword);
    if (password !== rewirtePassword) {
      alert("Mật khẩu nhập lại không đúng");
    }
    const userData = {
      name,
      email,
      password,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("User registered:", userData);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // setFirstName(userData.firstName);
      setEmail(userData.email);
      setPassword(userData.password);
    }
  }, []);

  // const onPasswordChange = (e) => {
  //     setPassword(e.target.value);
  // }
  // const onRewirtePasswordChange = (e) => {
  //     setRewirtePassword(e.target.value);
  // }

  const SCROLL_OFFSET = 70; // Adjust this value based on your header height

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: SCROLL_OFFSET,
        behavior: "smooth",
      });
    }, [pathname]);

    return null;
  };
  localStorage.setItem("name", {
    // 'firstName': firstName,
    // 'lastName': lastName,
    date: date,
    email: email,
    userName: userName,
    password: password,
    rewirtePassword: rewirtePassword,
  });

  return (
    <div
      className="Login-container flex justify-center items-center min-h-lvh bg-cover bg-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <ScrollToTop />
      <div
        className="login-box text-white rounded-xl px-7 py-10 
            bg-transparent border-2 backdrop-blur-xs w-2xl"
      >
        <form action="" onSubmit={(e) => handleOnSubmit(e)}>
          <h1 className="text-4xl text-center mb-4 font-bold">Đăng ký</h1>
          <p className="text-xs text-center mb-2">
            Tham gia ngay để trải nghiệm trang web
          </p>
          <div className="flex space-x-4">
            <div className="input-box flex-col w-full h-12 relative mb-4">
              <input
                type="text"
                placeholder="Họ tên"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="flex flex-col w-full h-full bg-transparent
                                rounded-4xl pl-5 pr-14 placeholder:text-white
                                border-2 border-cyan-950 "
              />
              <GiFrozenArrow className="flex flex-col size-6 my-auto absolute right-4 top-2.5" />
            </div>

            <div className="input-box flex-col w-1/2 h-12 relative mb-4">
              <select
                required
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                className="flex flex-col w-full h-full bg-transparent
                rounded-4xl pl-5 pr-14 text-white
                border-2 border-cyan-950 appearance-none pt-2.5"
              >
                <option value="" disabled selected hidden className="">
                  Chọn giới tính
                </option>
                <option value="male" className="text-black">
                  Nam
                </option>
                <option value="female" className="text-black">
                  Nữ
                </option>
                <option value="other" className="text-black">
                  Khác
                </option>
              </select>
              <RiMoneyCnyBoxFill className="flex flex-col size-6 my-auto absolute right-4 top-2.5" />
            </div>
          </div>
          <div className="input-box flex w-full h-12 relative mb-4">
            <div className="absolute top-1.5 left-6 text-xs">Ngày sinh</div>
            <input
              type="date"
              placeholder=""
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
              className=" flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 py-4 uppercase z-10"
            />
            <LuCalendarFold className=" size-6  my-auto absolute right-4 top-2.5 cursor-pointer" />
          </div>

          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 "
            />
            <MdOutlineMail className="flex flex-col size-6 my-auto absolute right-4 top-2.5" />
          </div>
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type="text"
              placeholder="Tài khoản"
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 "
            />
            <FaUser className="flex flex-col size-6 my-auto absolute right-4 top-2.5" />
          </div>
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type={passwordType}
              placeholder="Mật khẩu"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950"
            />
            {passwordType === "password" ? (
              <FaEyeSlash
                className="flex flex-col size-6 my-auto absolute right-4 top-2.5 cursor-pointer"
                onClick={() => {
                  setPasswordType("text");
                }}
              />
            ) : (
              <FaEye
                className="flex flex-col size-6 my-auto absolute right-4 top-2.5 cursor-pointer"
                onClick={() => {
                  setPasswordType("password");
                }}
              />
            )}
          </div>
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type={rewirtePasswordType}
              placeholder="Nhập lại mật khẩu"
              required
              onChange={(e) => {
                setRewirtePassword(e.target.value);
              }}
              className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950"
            />
            {rewirtePasswordType === "password" ? (
              <FaEyeSlash
                className="flex flex-col size-6 my-auto absolute right-4 top-2.5 cursor-pointer"
                onClick={() => {
                  setRewirtePasswordType("text");
                }}
              />
            ) : (
              <FaEye
                className="flex flex-col size-6 my-auto absolute right-4 top-2.5 cursor-pointer"
                onClick={() => {
                  setRewirtePasswordType("password");
                }}
              />
            )}
          </div>

          {/* <div className="remember-forgot flex justify-between my-3 relative">
                        <label className="text-xs ">
                            <input type="checkbox" className="size-3.5" /> Lưu tài khoản
                        </label >
                        <a href="#" className="no-underline hover:underline text-xs">Quên mật khẩu ?</a>
                    </div> */}
          <button
            type="submit"
            className="w-full bg-white text-black h-14 rounded-4xl shadow-2xl
                        font-bold text-xl hover:bg-black hover:text-white transition-all duration-300"
          >
            Đăng Ký
          </button>
          <div className="signup text-center mt-4 text-xs text-white">
            Bạn đã có tài khoản?{" "}
            <NavLink to="/dang-nhap" className="font-bold hover:underline">
              Đăng nhập ngay
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
