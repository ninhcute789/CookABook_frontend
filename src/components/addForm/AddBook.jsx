import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import ImageUploader from "../common/ImageUpload";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";

const AddBook = (props) => {
  const { onSubmit, initialData = {} } = props;

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [author, setAuthor] = useState("");
  const [size, setSize] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [weight, setWeight] = useState("");
  const [language, setLanguage] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [available, setAvailable] = useState("");
  const [description, setDescription] = useState("");
  const [coverType, setCoverType] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setTitle(initialData.title || "");
      setPublisher(initialData.publisher || "");
      setPublishYear(initialData.publishYear || "");
      setSize(initialData.size || "");
      setNumberOfPages(initialData.numberOfPages || "");
      setWeight(initialData.weight || "");
      setLanguage(initialData.language || "");
      setOriginalPrice(initialData.originalPrice || "");
      setDiscountPercentage(initialData.discountPercentage || "");
      setStockQuantity(initialData.stockQuantity || "");
      setAvailable(initialData.available || "");
      setDescription(initialData.description || "");
      setCoverType(initialData.coverType || "");
      setImageUrl(initialData.imageURL || "");
      setAuthor(initialData.author || "");
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
  const handlePublisherChange = (e) => setPublisher(e.target.value);
  const handlePublishYearChange = (e) => setPublishYear(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handleNumberOfPagesChange = (e) => setNumberOfPages(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleOriginalPriceChange = (e) => setOriginalPrice(e.target.value);
  const handleDiscountPercentageChange = (e) =>
    setDiscountPercentage(e.target.value);
  const handleStockQuantityChange = (e) => setStockQuantity(e.target.value);
  const handleAvailableChange = (e) => setAvailable(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCoverTypeChange = (e) => setCoverType(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/books",
        {
          title,
          publisher,
          publishYear,
          size,
          numberOfPages,
          weight,
          language,
          originalPrice,
          discountPercentage,
          stockQuantity,
          available,
          description,
          coverType,
          imageURL: imageUrl,
          author: { id: author.id },
        },
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
      toast.success("🎉 Thêm sách thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi sách:", error);
      toast.error("Lỗi khi gửi sách:", error);
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
        Thêm sách
      </button>
      {isModalOpen && (
        <div className="z-50  fixed inset-0 flex items-center justify-center bg-black ">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-15/22"
          >
            <h2 className="text-lg font-semibold mb-4">Thêm sách</h2>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="grid grid-cols-2 gap-3 mb-2">
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
                  Tác giả
                  <input
                    className="w-full border p-2 rounded"
                    name="author"
                    value={author}
                    onChange={handleAuthorChange}
                  />
                </label>
                <label className="block">
                  Nhà xuất bản
                  <input
                    className="w-full border p-2 rounded"
                    name="publisher"
                    value={publisher}
                    onChange={handlePublisherChange}
                  />
                </label>
                <label className="block">
                  Năm xuất bản
                  <input
                    className="w-full border p-2 rounded"
                    name="publishYear"
                    value={publishYear}
                    onChange={handlePublishYearChange}
                  />
                </label>
                <label className="block">
                  Kích thước sách (cm)
                  <input
                    className="w-full border p-2 rounded"
                    name="size"
                    value={size}
                    onChange={handleSizeChange}
                  />
                </label>
                <label className="block">
                  Số trang sách
                  <input
                    className="w-full border p-2 rounded"
                    name="numberOfPages"
                    value={numberOfPages}
                    onChange={handleNumberOfPagesChange}
                  />
                </label>
                <label className="block">
                  Loại bìa
                  <select
                    className="flex flex-col w-full  bg-transparent
                  border p-2 rounded"
                    name="coverType"
                    value={coverType}
                    onChange={handleCoverTypeChange}
                  >
                    <option value="" disabled hidden className=""></option>
                    <option value="PAPERBACK" className="text-black">
                      Bìa mềm
                    </option>
                    <option value="HARDCOVER" className="text-black">
                      Bìa cứng
                    </option>
                    <option value="SPIRAL_BOUND" className="text-black">
                      Bìa xoắn ốc
                    </option>
                    <option value="LEATHER_BOUND" className="text-black">
                      Bìa da
                    </option>
                    <option value="BOARD_BOOK" className="text-black">
                      Bìa cứng toàn bộ
                    </option>
                    <option value="DUST_JACKET" className="text-black">
                      Bìa dust jacket
                    </option>
                  </select>
                </label>
                <label className="block">
                  Trọng lượng sách (gram)
                  <input
                    className="w-full border p-2 rounded"
                    name="weight"
                    value={weight}
                    onChange={handleWeightChange}
                  />
                </label>
                <label className="block">
                  Ngôn ngữ
                  <select
                    className="flex flex-col w-full  bg-transparent
                  border p-2 rounded"
                    name="language"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <option value="" disabled hidden className=""></option>
                    <option value="vietnamese" className="text-black">
                      Tiếng Việt
                    </option>
                    <option value="english" className="text-black">
                      Tiếng Anh
                    </option>
                  </select>
                </label>
                <label className="block">
                  Giá gốc (VNĐ)
                  <input
                    className="w-full border p-2 rounded"
                    name="originalPrice"
                    value={originalPrice}
                    onChange={handleOriginalPriceChange}
                  />
                </label>
                <label className="block">
                  Phần trăm giảm giá (%)
                  <input
                    className="w-full border p-2 rounded"
                    name="discountPercentage"
                    value={discountPercentage}
                    onChange={handleDiscountPercentageChange}
                  />
                </label>
                <label className="block">
                  Số lượng sách trong kho (quyển)
                  <input
                    className="w-full border p-2 rounded"
                    name="stockQuantity"
                    value={stockQuantity}
                    onChange={handleStockQuantityChange}
                  />
                </label>
                <label className="block">
                  Còn hàng hay hết hàng
                  <select
                    required
                    name="available"
                    value={available}
                    onChange={(e) => handleAvailableChange(e)}
                    className="flex flex-col w-full  bg-transparent
                  border p-2 rounded"
                  >
                    <option value="" disabled hidden className=""></option>
                    <option value="true" className="text-black">
                      Còn
                    </option>
                    <option value="false" className="text-black">
                      Hết
                    </option>
                  </select>
                </label>
                <label className="block">
                  Mô tả sách
                  <input
                    className="w-full border p-2 rounded"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </label>
              </div>
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

AddBook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    publisher: PropTypes.string,
    publishYear: PropTypes.number,
    size: PropTypes.string,
    numberOfPages: PropTypes.number,
    weight: PropTypes.number,
    language: PropTypes.string,
    imageURL: PropTypes.string,
    originalPrice: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number,
    stockQuantity: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    description: PropTypes.string,
    coverType: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

export default AddBook;
