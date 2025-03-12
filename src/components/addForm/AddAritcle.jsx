import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
import ImageUpload from "../common/ImageUpload";
import { set } from "@cloudinary/url-gen/actions/variable";
import ImageUploader from "../common/ImageUpload";

const AddArticleModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  // const [article, setArticle] = useState({
  //   title: "",
  //   content: "",
  //   imageURL: null,
  //   // imagePreview: "",
  //   // createdAt: new Date().toISOString().split("T")[0],
  //   // createdBy: "",
  // });

  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const [user, setUser] = useState({
  //   id: "",
  // });

  useEffect(() => {
    if (isOpen) {
      // setArticle({
      //   title: initialData.title || "",
      //   content: initialData.content || "",
      //   imageURL: null,
      //   imagePreview: "",
      //   // createdAt:
      //   //   initialData.createdAt || new Date().toISOString().split("T")[0],
      //   // createdBy: initialData.createdBy || "",
      // });
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setImageUrl(initialData.imageURL || "");
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

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user.id);

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("content", content);

      if (imageUrl) {
        data.append("image", imageUrl); // Sử dụng file thật thay vì imageURL
      }
      data.append("id", user.id);
      const article = {
        title: title,
        content: content,
        imageURL: imageUrl,
        user: {
          id: user.id,
        },
      };
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const res = await axios.post(
        "http://localhost:8080/api/v1/articles",
        {
          title: title,
          content: content,
          imageURL: imageUrl, // Nếu là URL hoặc base64
          user: {
            id: user.id,
          },
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

  // const handleSubmit = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.post(
  //       "http://localhost:8080/api/v1/articles",
  //       {
  //         title: article.title,
  //         content: article.content,
  //         image: article.imageURL,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("✅ Bài viết mới:", res.data);

  //     onArticleAdded(res.data.data); // Cập nhật danh sách bài viết trong ArticleList
  //     onClose(); // Đóng modal
  //   } catch (error) {
  //     console.error("❌ Lỗi khi gửi bài viết:", error);
  //     alert("Lỗi khi gửi bài viết! Kiểm tra lại thông tin.");
  //   }
  // };

  return (
    isOpen && (
      <div className="z-50  fixed inset-0 flex items-center justify-center bg-black ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-8/22">
          <h2 className="text-lg font-semibold mb-4">Thêm bài báo</h2>
          <div className="space-y-4">
            <label className="block">
              Tiêu đề
              <input
                className="w-full border p-2 rounded"
                name="title"
                value={title}
                onChange={handleTitleChange}
              />
            </label>
            <label className="block">
              Nội dung
              <textarea
                className="w-full border p-2 rounded"
                name="content"
                value={content}
                onChange={handleContentChange}
              />
            </label>
            <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
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
  // onArticleAdded: PropTypes.func.isRequired,  // Thêm prop mới
  initialData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    createdBy: PropTypes.string,
  }),
};

export default AddArticleModal;
