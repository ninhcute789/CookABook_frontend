// import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
// import ImageUploader from "../common/ImageUpload";

const AddAuthor = (props) => {
  const { onSubmit, initialData = {} } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setName(initialData.name || "");
    }
  }, [isOpen, initialData]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const res = await axiosInstance.post(
        "/authors",
        {
          name: name,
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
      console.log("✅ Thêm tác giả thành công:", res.data);
      // alert("Thêm người dùng thành công!");
      toast.success("🎉 Thêm tác giả thành công!");
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
      <div className="w-full mx-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:cursor-pointer mb-5 w-50 duration-300
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm tác giả
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-8/22">
            <h2 className="text-lg font-semibold mb-4">Thêm tác giả</h2>
            <div className="space-y-4 ">
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
                className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer hover:bg-gray-400"
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

AddAuthor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default AddAuthor;
