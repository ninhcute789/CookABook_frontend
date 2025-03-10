import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ArticleUpdate = ({ articleId, onUpdateSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    id: articleId,
    title: "",
    content: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axios.put(
        "http://localhost:8080/api/v1/articles",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Bài báo đã được cập nhật:", res.data);
      onUpdateSuccess(res.data);
      onClose();
    } catch (error) {
      console.error(
        "❌ Lỗi khi cập nhật bài báo:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Cập nhật bài báo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Tiêu đề mới"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
          <textarea
            name="content"
            placeholder="Nội dung mới"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            rows="4"
          />
          <input
            type="text"
            name="imageURL"
            placeholder="URL ảnh"
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:cursor-pointer"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ArticleUpdate.propTypes = {
  articleId: PropTypes.number.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ArticleUpdate;
