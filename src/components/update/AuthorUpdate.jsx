import { useState } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
const AuthorUpdate = (props) => {
  const { author, onUpdate, onClose, authorId } = props;

  const [name, setName] = useState(author.name);
  const [id] = useState(authorId);

  const handleChangeName = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axiosInstance.put(
        "/authors",
        {
          id: id,
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Tác giả đã được cập nhật:", res.data);
      onUpdate(res.data.data); // Cập nhật danh sách user
      onClose();
      // alert("🎉 Cập nhật người dùng thành công!");
      toast.success("🎉 Cập nhật tác giả thành công!");
    } catch (error) {
      toast.error(
        "❌ Lỗi khi cập nhật tác giả:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-8/22 text-black">
        <h2 className="text-lg font-semibold mb-4">Cập nhật thông tin</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4 text-left mb-2">
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

AuthorUpdate.propTypes = {
  author: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  authorId: PropTypes.number.isRequired,
};

export default AuthorUpdate;
