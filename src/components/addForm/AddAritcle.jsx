import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FcPlus } from "react-icons/fc";
import axios from "axios";

const AddArticleModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    imageURL: null,
    imagePreview: "",
    // createdAt: new Date().toISOString().split("T")[0],
    // createdBy: "",
  });

  useEffect(() => {
    if (isOpen) {
      setArticle({
        title: initialData.title || "",
        content: initialData.content || "",
        imageURL: null,
        imagePreview: "",
        // createdAt:
        //   initialData.createdAt || new Date().toISOString().split("T")[0],
        // createdBy: initialData.createdBy || "",
      });
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    // add or remove overflow-y-hidden class to body
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  const handleChange = (e) =>
    setArticle({ ...article, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticle((prev) => ({
          ...prev,
          imageURL: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", article.title);
      data.append("content", article.content);

      if (article.imageURL) {
        data.append("image", article.imageURL); // Sử dụng file thật thay vì imageURL
      }

      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const res = await axios.post(
        "http://localhost:8080/api/v1/articles",
        {
          title: article.title,
          content: article.content,
          image: article.imageURL, // Nếu là URL hoặc base64
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

      onSubmit(article); // Cập nhật danh sách bài viết
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi gửi bài viết:", error);
      alert("Lỗi khi gửi bài viết! Kiểm tra lại thông tin.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-8/22">
          <h2 className="text-lg font-semibold mb-4">Thêm bài báo</h2>
          <div className="space-y-4">
            <label className="block">
              Tiêu đề
              <input
                className="w-full border p-2 rounded"
                name="title"
                value={article.title}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Nội dung
              <textarea
                className="w-full border p-2 rounded"
                name="content"
                value={article.content}
                onChange={handleChange}
              />
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

            <label
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

            <div className="border p-2 rounded mt-2 h-40">
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
            </div>
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

AddArticleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    createdBy: PropTypes.string,
  }),
};

export default AddArticleModal;

