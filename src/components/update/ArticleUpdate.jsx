import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ImageUploader from "../common/ImageUpload";
import toast from "react-hot-toast";

const ArticleUpdate = ({ articleId, onUpdateSuccess, onClose, article }) => {
  // const [formData, setFormData] = useState({
  //   id: articleId,
  //   title: "",
  //   content: "",
  //   // imageURL: "",
  // });
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [id, setId] = useState(articleId);

  const user = JSON.parse(localStorage.getItem("user"));

  const [imageUrl, setImageUrl] = useState("");
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeContent = (e) => setContent(e.target.value);

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
        {
          id: id,
          title: title,
          content: content,
          imageURL: imageUrl, // Nếu là URL hoặc base64
          user: {
            id: user.id,
          },
        },
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
      toast.success("🎉 Cập nhật bài báo thành công!");
    } catch (error) {
      console.error(
        "❌ Lỗi khi cập nhật bài báo:",
        error.response?.data || error.message
      );
      toast.error(
        "❌ Lỗi khi cập nhật bài báo:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  w-8/22">
        <h2 className="text-xl font-semibold mb-4">Cập nhật bài báo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Tiêu đề mới"
            value={title}
            onChange={handleChangeTitle}
            className="w-full p-2 border rounded mb-3"
          />
          <textarea
            name="content"
            placeholder="Nội dung mới"
            value={content}
            onChange={handleChangeContent}
            className="w-full p-2 border rounded mb-3"
            rows="4"
          />
          <ImageUploader
            onUploadSuccess={(url) => setImageUrl(url)}
            initialImageUrl={article.imageURL}
          />
          <div className="flex justify-end space-x-2 mt-2">
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
  article: PropTypes.object.isRequired,
  articleId: PropTypes.number.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ArticleUpdate;
