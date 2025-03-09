// import { FaUser } from "react-icons/fa";
// // import cr7 from '../assets/cr7.jpeg';
// // import cr7_2 from '../assets/cr7_2.jpg';
// // import cr7_3 from '../assets/cr7_3.jpg';
// // import cr7_5 from '../assets/cr7_5.jpg';
// import bg from "../assets/bg-10.jpg";
// import { NavLink } from "react-router";
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
// // import { GiNachos } from "react-icons/gi";

// const Login = () => {
//   // const [isFormVisible, setIsFormVisible] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(
//     localStorage.getItem("username") || ""
//   );

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const [passwordType, setPasswordType] = useState("password");
//   // const handleLoginClick = () => {
//   //     setIsFormVisible(!isFormVisible);
//   // };

//   // const handleLogin = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       "http://127.0.0.1:8080/api/v1/auth/login",
//   //       {
//   //         username,
//   //         password,
//   //       }
//   //     );

//   //     console.log("Đăng nhập thành công!", response.data);
//   //     localStorage.setItem("token", response.data.token);
//   //   } catch (error) {
//   //     console.error(
//   //       "Lỗi đăng nhập:",
//   //       error.response?.data?.message || error.message
//   //     );
//   //   }
//   // };

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8080/api/v1/auth/login",
//         { username, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Đăng nhập thành công!", response.data);

//       localStorage.setItem("token", response.data.accessToken);

//       // 🔥 Gọi API để lấy thông tin chi tiết người dùng
//       const userResponse = await axios.get(
//         "http://127.0.0.1:8080/api/v1/user/me",
//         {
//           headers: { Authorization: `Bearer ${response.data.accessToken}` },
//         }
//       );

//       const userData = userResponse.data;
//       localStorage.setItem("username", userData.username); // Lưu tên người dùng
//       setLoggedInUser(userData.username);

//       alert("Đăng nhập thành công!");
//       window.location.reload(); // Refresh trang để cập nhật header
//     } catch (error) {
//       console.error(
//         "Lỗi đăng nhập:",
//         error.response?.data?.message || error.message
//       );
//       alert(
//         error.response?.data?.message ||
//           "Đăng nhập thất bại, vui lòng kiểm tra lại!"
//       );
//     }
//   };

//   // const handleLogin = async (event) => {
//   //   event.preventDefault(); // Ngăn form reload trang

//   //   try {
//   //     const response = await axios.post(
//   //       "http://127.0.0.1:8080/api/v1/auth/login", // Đổi GET thành POST
//   //       { username, password }, // Gửi dữ liệu trong body
//   //       { headers: { "Content-Type": "application/json" } } // Đảm bảo JSON
//   //     );

//   //     console.log("Đăng nhập thành công!", response.data);
//   //     localStorage.setItem("token1", response.data.token);

//   //     // Hiển thị thông báo hoặc chuyển hướng
//   //     alert("Đăng nhập thành công!");
//   //     window.location.href = "/"; // Điều hướng sau khi đăng nhập
//   //   } catch (error) {
//   //     console.error(
//   //       "Lỗi đăng nhập:",
//   //       error.response?.data?.message || error.message
//   //     );

//   //     // Hiển thị thông báo lỗi
//   //     alert(
//   //       //error.response?.data?.message ||
//   //         "Đăng nhập thất bại, vui lòng kiểm tra lại!"
//   //     );
//   //   }
//   // };

//   // const handleOnSubmit = (event) => {
//   //   // Xử lý đăng nhập ở đây
//   //   console.log("User name:", username);
//   //   console.log("Password:", password);
//   //   console.log("Remember:", remember);
//   // };

//   const SCROLL_OFFSET = 70; // Adjust this value based on your header height

//   const ScrollToTop = () => {
//     const { pathname } = useLocation();

//     useEffect(() => {
//       window.scrollTo({
//         top: SCROLL_OFFSET,
//         behavior: "smooth",
//       });
//     }, [pathname]);

//     return null;
//   };
//   localStorage.setItem(
//     "token",
//     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNvb2thYm9vayI6eyJwcmluY2lwYWwiOnsicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3sicm9sZSI6IlJPTEVfVVNFUiJ9XSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImFjY291bnROb25Mb2NrZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZSwiZW5hYmxlZCI6dHJ1ZX0sImNyZWRlbnRpYWxzIjpudWxsLCJhdXRob3JpdGllcyI6W3sicm9sZSI6IlJPTEVfVVNFUiJ9XSwiZGV0YWlscyI6bnVsbCwiYXV0aGVudGljYXRlZCI6dHJ1ZX0sImV4cCI6MTc0MTYxOTcyMCwiaWF0IjoxNzQwNzU1NzIwfQ.Q8DS7S12QXLnwu5R1gBBTqRJ4o3iHHYvpl4NZpxbmDC5QblhA4JAEJ0oxTGte-NZWNxXXuqs8ocZwy6eVQmM2Q"
//   );

//   return (
//     <div
//       className="Login-container flex justify-center items-center min-h-lvh bg-cover bg-center "
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       <ScrollToTop />
//       <div
//         className="login-box w-96 text-white rounded-xl px-7 py-10
//             bg-transparent border-2 backdrop-blur-xs"
//       >
//         <form action="" onSubmit={handleLogin}>
//           <h1 className="text-4xl text-center mb-4 font-bold">Đăng nhập</h1>
//           <div className="input-box flex w-full h-12 relative mb-4 ">
//             <input
//               type="text"
//               placeholder="Tài khoản"
//               required
//               onChange={(e) => setUsername(e.target.value)}
//               className="flex flex-col w-full h-full bg-transparent
//                         rounded-4xl pl-5 pr-14 placeholder:text-white
//                         border-2 border-cyan-950 "
//             />
//             <FaUser className="flex flex-col size-6  my-auto absolute right-4 top-2.5" />
//           </div>
//           <div className="input-box flex w-full h-12 relative mb-4">
//             <input
//               type={passwordType}
//               placeholder="Mật khẩu"
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               className="flex flex-col w-full h-full bg-transparent
//                         rounded-4xl pl-5 pr-14 placeholder:text-white
//                         border-2 border-cyan-950"
//             />
//             {passwordType === "password" ? (
//               <FaEyeSlash
//                 className="flex flex-col size-6 my-auto absolute right-4 top-2.5 cursor-pointer"
//                 onClick={() => {
//                   setPasswordType("text");
//                 }}
//               />
//             ) : (
//               <FaEye
//                 className="flex flex-col size-6 my-auto absolute right-4 top-2.5 cursor-pointer"
//                 onClick={() => {
//                   setPasswordType("password");
//                 }}
//               />
//             )}
//           </div>

//           <div className="remember-forgot flex justify-between my-3 relative text-black ">
//             <label className="text-xs ">
//               <input
//                 type="checkbox"
//                 className="size-3.5"
//                 onChange={() => setRemember(!remember)}
//               />{" "}
//               Lưu tài khoản
//             </label>
//             <NavLink to="#" className="no-underline hover:underline text-xs">
//               Quên mật khẩu ?
//             </NavLink>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-white text-black h-14 rounded-4xl shadow-2xl
//                         font-bold text-xl hover:bg-black hover:text-white transition-all duration-300"
//           >
//             Đăng nhập
//           </button>

//           <div className="signup text-center mt-4 text-xs text-white">
//             Bạn chưa có tài khoản?{" "}
//             <NavLink to="/dang-ky" className="font-bold hover:underline">
//               Đăng ký ngay
//             </NavLink>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;

import { useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import bg from "../assets/bg-10.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("username") || "");

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
      const response = await axios.post("http://127.0.0.1:8080/api/v1/auth/login", {
        username,
        password
      });
  
      console.log("Dữ liệu API trả về:", response.data);
  
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.data.accessToken);
        localStorage.setItem("username", response.data.data.user.username);
        setLoggedInUser(username);
        alert("Đăng nhập thành công!");
        window.location.href = "/";
        // window.location.reload();
      } else {
        alert("Đăng nhập thất bại! Kiểm tra lại thông tin đăng nhập.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Đăng nhập thất bại!");
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-full bg-transparent rounded-4xl pl-5 pr-14 placeholder:text-white border-2 border-cyan-950"
            />
            <FaUser className="absolute right-4 top-2.5 size-6" />
          </div>

          {/* Mật khẩu */}
          <div className="input-box flex w-full h-12 relative mb-4">
            <input
              type={passwordType}
              placeholder="Mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full bg-transparent rounded-4xl pl-5 pr-14 placeholder:text-white border-2 border-cyan-950"
            />
            {passwordType === "password" ? (
              <FaEyeSlash
                className="absolute right-4 top-2.5 size-6 cursor-pointer"
                onClick={() => setPasswordType("text")}
              />
            ) : (
              <FaEye
                className="absolute right-4 top-2.5 size-6 cursor-pointer"
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
