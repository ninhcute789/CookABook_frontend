import { useState } from "react";
import PropTypes from "prop-types";
import { FcPlus } from "react-icons/fc";

const ImageUploader = ({ onUploadSuccess, initialImageUrl }) => {
  const [imagePreview, setImagePreview] = useState(initialImageUrl || null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cookabook_preset");
    formData.append("cloud_name", "dvprjsl9k");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvprjsl9k/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      // Hiển thị ảnh preview
      setImagePreview(imageUrl);

      // Gọi callback để gửi URL về parent component
      onUploadSuccess(imageUrl);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      {/* <input
        type="file"
        accept="image/*"
        placeholder="Chọn ảnh"
        onChange={handleUpload}
        className="bg-amber-500 mb-1 rounded p-1"
      /> */}
      <label
        className=" p-1 rounded flex items-center space-x-2 w-fit
            bg-gray-300 hover:cursor-pointer mb-2 hover:bg-gray-400 duration-300"
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
          onChange={handleUpload}
        />
      </label>
      {loading && <p>Đang tải ảnh...</p>}
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-5/6 h-60 object-cover rounded mx-auto"
        />
      ) : (
        <div className="h-40 border-1 rounded w-full">
          {" "}
          <div className="h-full flex items-center justify-center text-gray-500 ">
            Chưa có ảnh
          </div>
        </div>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
  initialImageUrl: PropTypes.string,
};
export default ImageUploader;
