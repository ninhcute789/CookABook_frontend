import { useState } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
import ImageUploader from "../common/ImageUpload";

const UserUpdate = (props) => {
  const { user, onUpdate, onClose, userId } = props;

  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [id] = useState(userId);

  // const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeGender = (e) => setGender(e.target.value);
  const handleChangeDob = (e) => setDob(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axiosInstance.put(
        "/users",
        {
          id: id,
          password: password,
          name: name,
          gender: gender || null,
          dob: dob,
          email: email,
          avatar: avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvatar(res.data.data.avatar);
      console.log("avatar đã được cập nhật:", res.data.data.avatar);
      console.log("✅ Người dùng đã được cập nhật:", res.data);
      onUpdate(res.data.data); // Cập nhật danh sách user
      onClose();
      // alert("🎉 Cập nhật người dùng thành công!");
      toast.success("🎉 Cập nhật người dùng thành công!");
    } catch (error) {
      toast.error(
        "❌ Lỗi khi cập nhật người dùng:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-13/22 text-black">
        <h2 className="text-lg font-semibold mb-4">Cập nhật thông tin</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-x-4 text-left mb-2 grid grid-cols-2">
            <div className="space-y-4 flex flex-col text-left mb-2">
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
                Mật khẩu
                <input
                  disabled
                  type="password"
                  className="w-full border p-2 rounded bg-gray-200"
                  name="password"
                  value={password}
                  // onChange={(e) => handleChangePassword(e)}
                />
              </label>

              <label className="block mr-2">
                Ngày sinh
                <input
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
                  name="gender"
                  value={gender}
                  onChange={(e) => handleChangeGender(e)}
                  className="flex flex-col w-full  bg-transparent
                rounded-md px-2.5 py-2 text-black my-auto hover:cursor-pointer
                border-1 border-cyan-950 appearance-none "
                >
                  <option value="" disabled hidden className="">
                    Chọn giới tính
                  </option>
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
            <div className=" w-full ">
              <ImageUploader
                onUploadSuccess={(url) => setAvatar(url)}
                initialImageUrl={user.avatar}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer hover:bg-gray-400 duration-300"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-600 duration-300"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UserUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default UserUpdate;
