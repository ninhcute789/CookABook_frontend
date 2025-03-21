import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import ImageUploader from "../common/ImageUpload";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
import { cat } from "@cloudinary/url-gen/qualifiers/focusOn";
import { getAllCategoriesWithSizeAndPage } from "../../services/CategoryServices";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";
// import { refreshToken } from "../../api/AuthApi";

const BookUpdate = ({ bookId, onUpdateSuccess, onClose, book }) => {
  // const [formData, setFormData] = useState({
  //   id: articleId,
  //   title: "",
  //   content: "",
  //   // imageURL: "",
  // });
  const [title, setTitle] = useState(book.title);
  const [publisher, setPublisher] = useState(book.publisher);
  const [publishYear, setPublishYear] = useState(book.publishYear);
  const [size, setSize] = useState(book.size);
  const [numberOfPages, setNumberOfPages] = useState(book.numberOfPages);
  const [weight, setWeight] = useState(book.weight);
  const [language, setLanguage] = useState(book.language);
  const [originalPrice, setOriginalPrice] = useState(book.originalPrice);
  const [discountPercentage, setDiscountPercentage] = useState(
    book.discountPercentage
  );
  const [stockQuantity, setStockQuantity] = useState(book.stockQuantity);
  const [description, setDescription] = useState(book.description);
  const [coverType, setCoverType] = useState(book.coverType);
  const [available, setAvailable] = useState(book.available);
  const [official, setOfficial] = useState(book.official);
  const [author, setAuthor] = useState(book.author || { name: "" });

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(book.categories);

  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const sizeCategories = 10; // Số bài viết mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số bài viết
  const [id, setId] = useState(bookId);

  const [imageUrl, setImageUrl] = useState("");
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePublisherChange = (e) => setPublisher(e.target.value);
  const handlePublishYearChange = (e) => setPublishYear(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handleNumberOfPagesChange = (e) => setNumberOfPages(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleOriginalPriceChange = (e) => setOriginalPrice(e.target.value);
  const handleDiscountPercentageChange = (e) =>
    setDiscountPercentage(e.target.value);
  const handleStockQuantityChange = (e) => setStockQuantity(e.target.value);
  const handleAvailableChange = (e) => setAvailable(e.target.value);
  const handleOfficialChange = (e) => setOfficial(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCoverTypeChange = (e) => setCoverType(e.target.value);
  const handleAuthorChange = (event) => {
    setAuthor({ name: event.target.value }); // Chỉ cập nhật name
  };
  const handleCategoryChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value, 10)
    );
    setSelectedCategories(
      selectedIds.map((id) => ({ id })) // Chỉ giữ lại ID, không cần name
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoriesWithSizeAndPage(
          page,
          sizeCategories,
          setCategories,
          setTotalPages,
          setTotalElements
        );
        console.log("Danh sách thể loại sách:", res);

        // console.log("Tổng số bài viết:", totalElements);

        // toast.success("🎉 Tải danh sách thể loại sách thành công!");
      } catch (error) {
        toast.error("Lỗi khi tải danh sách thể loại sách:", error);
        console.error("Lỗi khi tải danh sách thể loại sách:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
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
      official,
      description,
      coverType,
      imageURL: imageUrl,
      author: {
        name: author.name,
      },
      categories: selectedCategories.map((category) => ({
        id: category.id,
      })),
    };
    console.log("data", data);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axiosInstance.put("/books", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Bài báo đã được cập nhật:", res.data);
      onUpdateSuccess(res.data);
      onClose();
      toast.success("🎉 Cập nhật bài báo thành công!");
    } catch (error) {
      console.error(
        "❌ Lỗi khi cập nhật bài báo:",
        error.response?.data || error.message
      );
      toast.error(`❌ Lỗi khi cập nhật bài báo:\n${error?.message || error}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-15/22">
        <h2 className="text-xl font-semibold mb-4">Cập nhật sách</h2>
        <form onSubmit={handleSubmit}>
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
                  value={author.name}
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
                Chính hãng hay không
                <select
                  required
                  name="official"
                  value={official}
                  onChange={handleOfficialChange}
                  className="flex flex-col w-full  bg-transparent
                  border p-2 rounded"
                >
                  <option value="" disabled hidden className=""></option>
                  <option value="true" className="text-black">
                    Chính hãng
                  </option>
                  <option value="false" className="text-black">
                    Không chính hãng
                  </option>
                </select>
              </label>
              <label className="block">
                Thể loại sách
                <select
                  multiple
                  required
                  name="categories"
                  value={selectedCategories.map((c) => c.id)} // Chỉ lấy danh sách ID
                  onChange={handleCategoryChange}
                  className="flex flex-col w-full bg-transparent border p-2 rounded"
                >
                  {categories?.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="text-black"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              {/* {console.log("selectedCategories", selectedCategories)} */}
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
            <ImageUploader
              onUploadSuccess={(url) => setImageUrl(url)}
              initialImageUrl={book.imageURL}
            />
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

BookUpdate.propTypes = {
  book: PropTypes.object.isRequired,
  bookId: PropTypes.number.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookUpdate;
