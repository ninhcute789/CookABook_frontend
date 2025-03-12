import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { FcPlus } from "react-icons/fc";
import axios from "axios";
// import ImageUpload from "../common/ImageUpload";
// import { set } from "@cloudinary/url-gen/actions/variable";
import ImageUploader from "../common/ImageUpload";
import { set } from "@cloudinary/url-gen/actions/variable";

const AddArticle = ({ onSubmit, initialData = {} }) => {
  // const [article, setArticle] = useState({
  //   title: "",
  //   content: "",
  //   imageURL: null,
  //   // imagePreview: "",
  //   // createdAt: new Date().toISOString().split("T")[0],
  //   // createdBy: "",
  // });

  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);

  // const [user, setUser] = useState({
  //   id: "",
  // });

  useEffect(() => {
    if (isModalOpen) {
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

  // const handleNewArticle = (newArticle) => {
  //   console.log("Thêm bài viết:", newArticle);

  //   setArticles((prevArticles) => {
  //     const updatedArticles = [newArticle, ...prevArticles];
  //     console.log("Danh sách sau cập nhật:", updatedArticles);
  //     return [...updatedArticles]; // Tạo mảng mới
  //   });
  //   // setIsModalOpen(false); // Đóng modal
  // };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   // if (!window.confirm("Bạn có chắc muốn thêm bài viết này không?")) return;

  //   try {
  //     const data = new FormData();
  //     data.append("title", title);
  //     data.append("content", content);

  //     if (imageUrl) {
  //       data.append("image", imageUrl); // Sử dụng file thật thay vì imageURL
  //     }
  //     data.append("id", user.id); // Thêm id của user vào data
  //     // const article = {
  //     //   title: title,
  //     //   content: content,
  //     //   imageURL: imageUrl,
  //     //   user: {
  //     //     id: user.id,
  //     //   },
  //     // };
  //     const token = localStorage.getItem("token"); // Lấy token từ localStorage

  //     const res = await axios.post(
  //       "http://localhost:8080/api/v1/articles",
  //       {
  //         title: title,
  //         content: content,
  //         imageURL: imageUrl, // Nếu là URL hoặc base64
  //         user: {
  //           id: user.id,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Thêm token vào header nếu cần
  //           "Content-Type": "application/json", // Định dạng khi gửi file
  //         },
  //         withCredentials: true, // Nếu API yêu cầu cookie/session
  //       }
  //     );
  //     // alert("Thêm bài viết thành công!");
  //     console.log("Check response:", res.data.data);
  //     // onUploadSuccess(res.data.data); // Cập nhật danh sách bài viết
  //     // setArticles((prevArticles) => {
  //     //   const updatedArticles = [event, ...prevArticles];
  //     //   console.log("Danh sách sau cập nhật:", updatedArticles);
  //     //   return [...updatedArticles]; // Tạo mảng mới
  //     // });
  //     // setArticles(res.data.data); // Cập nhật danh sách bài viết
  //     // onSubmit(res.data.data); // Cập nhật danh sách bài viết
  //     const newArticle = res.data.data;
  //     setArticles((prevArticles) => [newArticle, ...prevArticles]); // Thêm bài viết mới vào danh sách
  //     fetchArticles(); // Gọi lại API để cập nhật danh sách mới nhất
  //     // onSubmit(article); // Cập nhật danh sách bài viết
  //     setIsModalOpen(false); // Đóng modal
  //   } catch (error) {
  //     console.error("Lỗi khi gửi bài viết:", error);
  //     alert("Lỗi khi gửi bài viết! Kiểm tra lại thông tin.");
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/v1/articles",
        { title, content, imageURL: imageUrl, user: { id: user.id } },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
  
      console.log("Check response:", res.data.data);
      onSubmit(); // Gọi API để cập nhật danh sách bài viết
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi gửi bài viết:", error);
      alert("Lỗi khi gửi bài viết! Kiểm tra lại thông tin.");
    }
  };
  // const [articles, setArticles] = useState([]);
  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await axios.get("http://localhost:8080/api/v1/articles", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // Đảm bảo dữ liệu từ API là một mảng
  //       setArticles(res.data?.data?.data || []);
  //       console.log("gì đây", res.data?.data?.data);
  //       // setArticles(Array.isArray(res.data?.data?.data) ? res.data?.data?.data : []);
  //       console.log("Danh sách bài viết - addArticle:", res.data?.data?.data);
  //       // fetchArticles();
  //     } catch (error) {
  //       console.error("Lỗi khi tải danh sách bài viết:", error);
  //       setArticles([]); // Nếu lỗi, đặt lại articles là mảng rỗng
  //     }
  //   };

  //   fetchArticles();
  // }, []);

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

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axios.get(`http://localhost:8080/api/v1/articles`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("✅ API trả về:", res.data);
      setArticles(res.data?.data?.data || []);
      console.log("Danh sách bài viết:", res.data?.data?.data);
      // setTotalPages(res.data?.data?.meta?.totalPage);
    } catch (error) {
      console.error(
        "❌ Lỗi khi lấy danh sách:",
        error.response?.data || error.message
      );
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="bg-blue-500 hover:cursor-pointer mb-5 w-50
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm bài báo
      </button>
      {isModalOpen && (
        <div className="z-50  fixed inset-0 flex items-center justify-center bg-black ">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-8/22"
          >
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

export default AddArticle;
