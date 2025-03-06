import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AddUsers = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [userName, setUserName] = useState("");
  // const [address, setAddress] = useState("");
  // // const [users, setUsers] = useState([]);
  // const [modal, setModal] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    dob: "",
    email: "",
    gender: "",
    // createdAt: new Date().toISOString().split("T")[0],
    // createdBy: "",
  });
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isOpen) {
      setUser({
        // title: initialData.title || "",
        // content: initialData.content || "",
        // imageURL: null,
        // imagePreview: "",
        username: initialData.username || "",
        password: initialData.password || "",
        name: initialData.name || "",
        dob: initialData.dob || "",
        email: initialData.email || "",
        gender: initialData.gender || "",
        // createdAt:
        //   initialData.createdAt || new Date().toISOString().split("T")[0],
        // createdBy: initialData.createdBy || "",
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("username", user.username);
      data.append("password", user.password);
      data.append("name", user.name);
      data.append("dob", user.dob);
      data.append("email", user.email);
      data.append("gender", user.gender);

      // if (article.imageURL) {
      //   data.append("image", article.imageURL); // Sử dụng file thật thay vì imageURL
      // }

      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const res = await axios.post(
        "http://localhost:8080/api/v1/users",
        {
          username: user.username,
          password: user.password,
          name: user.name,
          dob: user.dob,
          email: user.email,
          gender: user.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header nếu cần
            "Content-Type": "application/json", // Định dạng khi gửi file
          },
          withCredentials: true, // Nếu API yêu cầu cookie/session
        }
      );

      console.log("Check response:", res.data);

      onSubmit(user); // Cập nhật danh sách bài viết
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi gửi bài viết:", error);
      alert("Lỗi khi gửi bài viết! Kiểm tra lại thông tin.");
    }
  };
  useEffect(() => {
    // add or remove overflow-y-hidden class to body
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  // useEffect(() => {
  //   // add or remove overflow-y-hidden class to body
  //   if (modal) {
  //     document.body.classList.add("overflow-y-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-y-hidden");
  //   }
  // }, [modal]);

  // const handleOnSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   console.log("User Name:", userName);
  //   console.log("Address:", address);
  //   let userData = {
  //     userName: userName,
  //     email: email,
  //     password: password,
  //     address: address,
  //   };

  //   let data = localStorage.getItem("data");
  //   if (data) {
  //     let siu = JSON.parse(data);
  //     siu.push(userData);
  //     localStorage.setItem("data", JSON.stringify(siu));
  //     setUsers(siu);
  //   } else {
  //     localStorage.setItem("data", JSON.stringify([userData]));
  //     setUsers([userData]);
  //   }
  //   console.log("User registered:", userData);

  //   toggleModal();
  // };

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const userData = JSON.parse(storedUser);
  //     setUserName(userData.userName);
  //     setEmail(userData.email);
  //     setPassword(userData.password);
  //     setAddress(userData.address);
  //   }
  // }, []);

  // const handleDelete = (index) => {
  //   let data = [...user];
  //   data.splice(index, 1); // Xóa 1 phần tử từ vị trí index
  //   setUser(data);
  //   localStorage.setItem("data", JSON.stringify(data));
  // };

  // useEffect(() => {
  //   let data = localStorage.getItem("data");
  //   if (data) {
  //     setUsers(JSON.parse(data)); // Cập nhật state users
  //   }
  // }, []);

  // return (
  //   <div className="flex flex-col max-w-2xl   ">
  //     <div className="flex flex-col max-w-2xl   ">
  //       <button
  //         onClick={toggleModal}
  //         className="bg-blue-500 hover:cursor-pointer mt-10 ml-10 w-50
  //         hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //       >
  //         Thêm người dùng
  //       </button>
  //     </div>

  //     {modal && (
  //       <div className="w-dvw h-dvh left-0 top-0 right-0 bottom-0 fixed">
  //         <div className="w-dvw h-dvh left-0 top-0 right-0 bottom-0 fixed opacity-80 bg-black"></div>
  //         <form
  //           action=""
  //           onSubmit={handleSubmit()}
  //         >
  //           <div
  //             //onClick={toggleModal} // close modal on click outside
  //             className="bg-[49,49,49] opacity-20 w-dvw h-dvh left-0 top-0 right-0 bottom-0 fixed"
  //           ></div>
  //           <div
  //             className="absolute top-[40%] left-[50%] rounded
  //         transform translate-x-[-50%] translate-y-[-50%] line-h-1.4
  //         bg-[#f1f1f1] py-[14px] px-[28px] max-w-[800px] min-w-[300px]"
  //           >
  //             <h2>Thêm thông tin</h2>
  //             <hr />
  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="flex flex-col">
  //                 <label>email</label>
  //                 <input
  //                   type="email"
  //                   className="border-1 rounded"
  //                   onChange={handleChange()}
  //                 />
  //               </div>
  //               <div className="flex flex-col">
  //                 <label>user name</label>
  //                 <input
  //                   type="text"
  //                   className="border-1 rounded"
  //                   onChange={handleChange()}
  //                 />
  //               </div>
  //               <div className="flex flex-col">
  //                 <label>pass word</label>
  //                 <input
  //                   type="password"
  //                   className="border-1 rounded"
  //                   onChange={handleChange()}
  //                 />
  //               </div>
  //               <div className="flex flex-col">
  //                 <label>address</label>
  //                 <input
  //                   type="text"
  //                   className="border-1 rounded"
  //                   onChange={handleChange()}
  //                 />
  //               </div>
  //             </div>

  //             <div className="flex justify-between">
  //               <button
  //                 className="bg-blue-500 hover:cursor-pointer my-3
  //             hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //                 onClick={toggleModal}
  //                 type="button"
  //               >
  //                 Đóng
  //               </button>
  //               <button
  //                 className="bg-blue-500 hover:cursor-pointer my-3
  //             hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //                 type="submit"
  //               >
  //                 Thêm
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     )}
  //     <div className="mt-10 ml-10">
  //       <h2>Danh sách người dùng</h2>
  //       <table className="min-w-full border-collapse border border-gray-400 mt-4">
  //         <thead>
  //           <tr>
  //             <th className="border border-gray-300 px-4 py-2">Username</th>
  //             <th className="border border-gray-300 px-4 py-2">Email</th>
  //             <th className="border border-gray-300 px-4 py-2">Password</th>
  //             <th className="border border-gray-300 px-4 py-2">Address</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {user.map((user, index) => (
  //             <tr key={index}>
  //               <td className="border border-gray-300 px-4 py-2">
  //                 {user.username}
  //               </td>
  //               <td className="border border-gray-300 px-4 py-2">
  //                 {user.email}
  //               </td>
  //               <td className="border border-gray-300 px-4 py-2">
  //                 {user.password}
  //               </td>
  //               <td className="border border-gray-300 px-4 py-2">
  //                 {user.gender}
  //               </td>
  //               <td className="border border-gray-300 px-4 py-2">
  //                 <button
  //                   onClick={() => handleDelete(index)}
  //                   className="bg-red-500 hover:bg-red-600
  //                   hover:cursor-pointer text-white px-2 py-1 rounded"
  //                 >
  //                   Xóa
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-8/22">
          <h2 className="text-lg font-semibold mb-4">Thêm bài báo</h2>
          <div className="space-y-4 grid grid-cols-2">
            <label className="block mr-2">
              Tài khoản
              <input
                type="text"
                className="w-full border p-2 rounded "
                name="username"
                value={user.username}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label className="block mr-2">
              Mật khẩu
              <input
                type="password"
                className="w-full border p-2 rounded"
                name="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label className="block mr-2">
              Tên
              <input
                type="text"
                className="w-full border p-2 rounded"
                name="name"
                value={user.name}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label className="block mr-2">
              Ngày sinh
              <input
                type="date"
                className="w-full border p-2 rounded "
                name="dob"
                value={user.dob}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label className="block mr-2">
              Email
              <input
                type="email"
                className="w-full border p-2 rounded"
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label className="block mr-2">
              Giới tính
              <select
                required
                name="gender"
                value={user.gender}
                onChange={(e) => handleChange(e)}
                className="flex flex-col w-full  bg-transparent
                rounded-md px-5 py-2 text-black my-auto hover:cursor-pointer
                border-1 border-cyan-950 appearance-none "
              >
                <option value="" disabled selected hidden className=""></option>
                <option value="MALE" className="text-black">
                  Nam
                </option>
                <option value="FEMALE" className="text-black">
                  Nữ
                </option>
                <option value="OTHER" className="text-black">
                  Khác
                </option>
              </select>
            </label>

            {/* <label className="block">
                Người tạo
                <input
                  className="w-full border p-2 rounded"
                  name="createdBy"
                  value={article.createdBy}
                  onChange={handleChange}
                />
              </label> */} 

            {/* <label
                className=" p-1 rounded flex items-center space-x-2 w-fit
              bg-gray-300"
                htmlFor="labelUpload"
              >
                <FcPlus className="text-white " />
                Chọn hình ảnh
                <input
                  id="labelUpload"
                  type="file"
                  hidden
                  className="w-full border p-2 rounded"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

            {/* <div className="border p-2 rounded mt-2 h-40">
                {article.imagePreview ? (
                  <img
                    src={article.imagePreview}
                    alt="Preview"
                    className=" w-auto h-full rounded mx-auto"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    Chưa chọn ảnh
                  </div>
                )}
              </div> */}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
              Hủy
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    )
  );
};
AddUsers.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
    email: PropTypes.string,
  }),
};
export default AddUsers;
