// import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";

const AddUsers = (props) => {
  const { onSubmit, initialData = {} } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDob = (e) => {
    setDob(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setUsername(initialData.username || "");
      setPassword(initialData.password || "");
      setName(initialData.name || "");
      setDob(initialData.dob || "");
      setEmail(initialData.email || "");
      setGender(initialData.gender || "");
    }
  }, [isOpen, initialData]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const res = await axiosInstance.post(
        "/users",
        {
          username: username,
          password: password,
          name: name,
          dob: dob,
          email: email,
          gender: gender,
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

      onSubmit(res.data.data); // Cập nhật danh sách bài viết
      console.log("✅ Thêm người dùng thành công:", res.data);
      // alert("Thêm người dùng thành công!");
      toast.success("🎉 Thêm người dùng thành công!");
      setIsOpen(false); // Đóng modal
    } catch (error) {
      toast.error("Lỗi khi gửi bài viết:", error);
      console.error("Lỗi khi gửi bài viết:", error);
      // alert("Lỗi khi gửi bài viết! Kiểm tra lại thông tin.");
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:cursor-pointer mb-5 w-50 duration-300
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm user
      </button>
      {isOpen && (
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
                  value={username}
                  onChange={(e) => handleChangeUsername(e)}
                />
              </label>
              <label className="block mr-2">
                Mật khẩu
                <input
                  type="password"
                  className="w-full border p-2 rounded"
                  name="password"
                  value={password}
                  onChange={(e) => handleChangePassword(e)}
                />
              </label>
              <label className="block mr-2">
                Họ và tên
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  name="name"
                  value={name}
                  onChange={(e) => handleChangeName(e)}
                />
              </label>
              <label className="block mr-2">
                Ngày sinh
                <input
                  id="dateAdminUser"
                  type="date"
                  className="w-full border p-2 rounded "
                  name="dob"
                  value={dob}
                  onChange={(e) => handleChangeDob(e)}
                />
              </label>
              <label className="block mr-2">
                Email
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  name="email"
                  value={email}
                  onChange={(e) => handleChangeEmail(e)}
                />
              </label>
              <label className="block mr-2">
                Giới tính
                <select
                  required
                  name="gender"
                  value={gender}
                  onChange={(e) => handleChangeGender(e)}
                  className="flex flex-col w-full  bg-transparent
                rounded px-2.5 py-2 text-black my-auto hover:cursor-pointer
                border-1 border-cyan-950 appearance-none "
                >
                  <option value="" disabled hidden className=""></option>
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
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
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
      )}
    </>
  );
};

AddUsers.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default AddUsers;
