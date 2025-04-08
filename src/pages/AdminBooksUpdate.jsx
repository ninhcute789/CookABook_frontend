import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";
import ImageUploader from "../components/common/ImageUpload";
import { getBooksById } from "../services/BookServices";
import { useNavigate, useParams } from "react-router";

const AdminBooksUpdate = ({ onUpdateSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [formData, setFormData] = useState({
    title: "",
    publisher: "",
    publishYear: "",
    size: "",
    numberOfPages: "",
    weight: "",
    language: "",
    originalPrice: "",
    discountPercentage: "",
    stockQuantity: "",
    description: "",
    coverType: "",
    available: "",
    official: "",
    author: { name: "" },
    imageURL: "",
    categories: [],
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBooksById(id);
        console.log("Fetched book data:", bookData);

        if (bookData) {
          setFormData({
            title: bookData.title || "",
            publisher: bookData.publisher || "",
            publishYear: bookData.publishYear || "",
            size: bookData.size || "",
            numberOfPages: bookData.numberOfPages || "",
            weight: bookData.weight || "",
            language: bookData.language || "",
            originalPrice: bookData.originalPrice || "",
            discountPercentage: bookData.discountPercentage || "",
            stockQuantity: bookData.stockQuantity || "",
            description: bookData.description || "",
            coverType: bookData.coverType || "",
            available: bookData.available || false,
            official: bookData.official || false,
            author: bookData.author || { name: "" },
            imageURL: bookData.imageURL || "",
            categories: bookData.categories || [],
          });

          if (bookData.categories) {
            setSelectedCategories(bookData.categories);
          }
        }
      } catch (error) {
        toast.error("Lỗi khi tải thông tin sách");
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          `/categories/all?page=1&size=100`
        );
        console.log("✅ API trả về - CATEGORY:", response.data);

        const fetchedCategories = response.data?.data?.data || [];
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách thể loại:", error);
        toast.error("Lỗi khi tải danh sách thể loại");
      }
    };
    fetchCategories();
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const isSelected = prevSelectedCategories.some(
        (cat) => cat.id === category.id
      );

      // Tạo danh sách mới dựa trên trạng thái hiện tại
      return isSelected
        ? prevSelectedCategories.filter((cat) => cat.id !== category.id)
        : [...prevSelectedCategories, category];
    });
  };



  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      categories: selectedCategories,
    }));
  }, [selectedCategories]);

  useEffect(() => {
    console.log("Selected Categories:", selectedCategories);
    console.log("Form Data Categories:", formData.categories);
  }, [selectedCategories, formData.categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Không tìm thấy token!");
        return;
      }

      const updatedData = {
        ...formData,
        id: parseInt(id),
        categories: selectedCategories.map((cat) => ({ id: cat.id })),
      };

      const response = await axiosInstance.put("/books", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Cập nhật sách thành công!");
      onUpdateSuccess?.(response.data);
      navigate("/admin/admin-books");
    } catch (error) {
      toast.error(`Lỗi khi cập nhật sách: ${error.message}`);
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="p-10">
        <h2 className="text-xl font-semibold mb-4">Cập nhật sách</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="grid grid-cols-3 gap-3 mb-2">
              {/* Basic Info Fields */}
              <label className="block">
                <span className="text-gray-700">Tiêu đề</span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </label>

              {/* Author */}
              <label className="block">
                <span className="text-gray-700">Tác giả</span>
                <input
                  type="text"
                  name="author"
                  value={formData.author.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      author: { name: e.target.value },
                    }))
                  }
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block">
                Nhà xuất bản
                <input
                  className="w-full border p-2 rounded"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Năm xuất bản
                <input
                  className="w-full border p-2 rounded"
                  name="publishYear"
                  value={formData.publishYear}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Kích thước sách (cm)
                <input
                  className="w-full border p-2 rounded"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Số trang sách
                <input
                  className="w-full border p-2 rounded"
                  name="numberOfPages"
                  value={formData.numberOfPages}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Loại bìa
                <select
                  className="flex flex-col w-full  bg-transparent
                  border p-2 rounded"
                  name="coverType"
                  value={formData.coverType}
                  onChange={handleChange}
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
                  value={formData.weight}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Ngôn ngữ
                <select
                  className="flex flex-col w-full  bg-transparent
                  border p-2 rounded"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
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
                  value={formData.originalPrice}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Phần trăm giảm giá (%)
                <input
                  className="w-full border p-2 rounded"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Sách tồn kho (quyển)
                <input
                  className="w-full border p-2 rounded"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                Chính hãng hay không
                <select
                  required
                  name="official"
                  value={formData.official}
                  onChange={handleChange}
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
              {/* Categories Section */}

              {/* {console.log("selectedCategories", selectedCategories)} */}
              <label className="block">
                Còn hàng hay hết hàng
                <select
                  required
                  name="available"
                  value={formData.available}
                  onChange={(e) => handleChange(e)}
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
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Thể loại</span>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.some(
                          (cat) => cat.id === category.id
                        )}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </label>
            </div>
            {/* Image Uploader */}
            <div>
              <ImageUploader
                onUploadSuccess={(url) =>
                  setFormData((prev) => ({ ...prev, imageURL: url }))
                }
                initialImageUrl={formData.imageURL}
              />
            </div>
          </div>
          {console.log("ava", formData.imageURL)}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/admin-books")}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AdminBooksUpdate.propTypes = {
  onUpdateSuccess: PropTypes.func,
};

export default AdminBooksUpdate;
