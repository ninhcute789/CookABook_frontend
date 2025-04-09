import { useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import ImageUploader from "../common/ImageUpload";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
// import { refreshToken } from "../../api/AuthApi";

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

      const res = await axiosInstance.put(
        "/articles",
        {
          id: id,
          title: title,
          content: content,
          imageURL: imageUrl, // Nếu là URL hoặc base64
          userId: user.id,
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
  // refreshToken().then((data) => {
  //   if (data) {
  //     console.log("Access Token mới:", data.accessToken);
  //   } else {
  //     console.log("Refresh token không hợp lệ hoặc đã hết hạn!");
  //   }
  // });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  w-15/22 min-h-96">
        <h2 className="text-xl font-semibold mb-4">Cập nhật bài báo</h2>
        <form onSubmit={handleSubmit}>
          <div className="CONTENT grid grid-cols-2 space-x-4">
            <div className="">
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
                className="w-full p-2 border rounded mb-3 h-fit"
                rows="4"
              />
            </div>
            <div className="items-center overflow-hidden object-center mb-3">
              <ImageUploader
                onUploadSuccess={(url) => setImageUrl(url)}
                initialImageUrl={article.imageURL}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 duration-300
              text-white px-4 py-2 rounded hover:cursor-pointer"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 duration-300
              text-white px-4 py-2 rounded hover:cursor-pointer"
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
