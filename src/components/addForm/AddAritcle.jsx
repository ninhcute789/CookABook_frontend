import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import ImageUploader from "../common/ImageUpload";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";

const AddArticle = (props) => {
  const { onSubmit, initialData = {} } = props;

  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setImageUrl(initialData.imageURL || "");
    }
  }, [isModalOpen, initialData]);

  useEffect(() => {
    // add or remove overflow-y-hidden class to body
    if (isModalOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isModalOpen]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/articles",
        { title, content, imageURL: imageUrl, userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Check response:", res.data.data);
      onSubmit(); // Gọi API để cập nhật danh sách bài viết
      setIsModalOpen(false);
      toast.success("🎉 Thêm bài viết thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi bài viết:", error);
      toast.error("Lỗi khi gửi bài viết:", error);
      // alert("Lỗi khi gửi bài viết! Kiểm tra lại thông tin.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="bg-blue-500 hover:cursor-pointer mb-5 w-50 duration-300
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm bài báo
      </button>
      {isModalOpen && (
        <div className="z-50  fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] ">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-11/22"
          >
            <h2 className="text-lg font-semibold mb-4">Thêm bài báo</h2>
            <div className="CONTENT grid grid-cols-2 space-x-4">
              <div className="">
                <input
                  type="text"
                  name="title"
                  placeholder="Tiêu đề mới"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full p-2 border rounded mb-3"
                />
                <textarea
                  name="content"
                  placeholder="Nội dung mới"
                  value={content}
                  onChange={handleContentChange}
                  className="w-full p-2 border rounded mb-3 h-fit"
                  rows="4"
                />
              </div>
              <div className="items-center overflow-hidden object-center mb-3">
                <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

AddArticle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    createdBy: PropTypes.string,
  }),
};

export default AddArticle;
