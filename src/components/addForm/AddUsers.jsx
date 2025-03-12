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

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-8/22">
          <h2 className="text-lg font-semibold mb-4">Thêm người dùng</h2>
          <div className="space-y-4 grid grid-cols-2">
            <label className="block mr-2">
              Tên tài khoản
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
              Họ và tên
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
                id="dateAdminUser"
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
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
              Hủy
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSubmit}
            >
              Tạo
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
