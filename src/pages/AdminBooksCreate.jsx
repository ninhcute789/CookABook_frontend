import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { getAllCategoriesWithSizeAndPage } from "../services/CategoryServices";
import axiosInstance from "../services/axiosInstance";
import ImageUploader from "../components/common/ImageUpload";
import { useNavigate } from "react-router";
import Select from "react-select";

const AdminBooksCreate = () => {
  // State quản lý form
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
    available: "",
    description: "",
    coverType: "",
    author: { name: "" },
    official: "",
    imageURL: "",
    categories: [],
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const size = 10;
  const navigate = useNavigate();

  // Lấy danh sách thể loại
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoriesWithSizeAndPage(
          page,
          size,
          setCategories,
          setTotalPages,
          setTotalElements
        );
        console.log("Danh sách thể loại:", res.data?.data?.data);
      } catch (error) {
        // toast.error("Lỗi khi tải danh sách thể loại!");
        console.error("Lỗi khi tải danh sách thể loại:", error);
      }
    };
    fetchCategories();
  }, [page]);

  const fetchBooks = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không tìm thấy token!");
        return;
      }

      const res = await axiosInstance.get(
        `/books/all?page=${page}&size=${size}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // setBooks(res.data?.data?.data || []);
      setTotalPages(res.data?.data?.meta?.totalPages);
      setTotalElements(res.data?.data?.meta?.totalElements);
    } catch (error) {
      console.error(
        "❌ Lỗi khi lấy danh sách:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi thể loại
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const isSelected = prevSelectedCategories.some(
        (cat) => cat.id === category.id
      );
      return isSelected
        ? prevSelectedCategories.filter((cat) => cat.id !== category.id)
        : [...prevSelectedCategories, category];
    });
  };

  // Gửi dữ liệu
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/books",
        {
          ...formData,
          categories: selectedCategories.map((category) => ({
            id: category.id,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data.data);
      toast.success("🎉 Thêm sách thành công!");
      fetchBooks(); // Gọi callback để cập nhật danh sách
      navigate("/admin/admin-books"); // Điều hướng về trang danh sách sách
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
      toast.error("Lỗi khi thêm sách!");
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-lg shadow-lg w-full"
      >
        <h2 className="text-lg font-semibold mb-4">Thêm sách</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="grid grid-cols-3 gap-3 mb-2">
            {/* Các trường thông tin sách */}
            <label className="block">
              Tiêu đề
              <input
                className="w-full border p-2 rounded"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Tác giả
              <input
                className="w-full border p-2 rounded"
                name="author"
                value={formData.author.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    author: { name: e.target.value },
                  }))
                }
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
                className="w-full border p-2 rounded"
                name="coverType"
                value={formData.coverType}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Chọn loại bìa
                </option>
                <option value="PAPERBACK">Bìa mềm</option>
                <option value="HARDCOVER">Bìa cứng</option>
                <option value="SPIRAL_BOUND">Bìa xoắn ốc</option>
                <option value="LEATHER_BOUND">Bìa da</option>
                <option value="BOARD_BOOK">Bìa cứng toàn bộ</option>
                <option value="DUST_JACKET">Bìa dust jacket</option>
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
                className="w-full border p-2 rounded"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Chọn ngôn ngữ
                </option>
                <option value="vietnamese">Tiếng Việt</option>
                <option value="english">Tiếng Anh</option>
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
              Số lượng sách trong kho
              <input
                className="w-full border p-2 rounded"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Chính hãng
              <select
                className="w-full border p-2 rounded"
                name="official"
                value={formData.official}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Chọn trạng thái
                </option>
                <option value="true">Chính hãng</option>
                <option value="false">Không chính hãng</option>
              </select>
            </label>
            <label className="block">
              Còn hàng
              <select
                className="w-full border p-2 rounded"
                name="available"
                value={formData.available}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Chọn trạng thái
                </option>
                <option value="true">Còn hàng</option>
                <option value="false">Hết hàng</option>
              </select>
            </label>
            <label className="block">
              Mô tả sách
              <textarea
                className="w-full border p-2 rounded"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <span className="">Thể loại sách</span>
              <Select
                isMulti
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                value={selectedCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(selectedOptions) => {
                  setSelectedCategories(
                    selectedOptions.map((option) => ({
                      id: option.value,
                      name: option.label,
                    }))
                  );
                }}
                className="mt-2"
                classNamePrefix="react-select"
                placeholder="Chọn thể loại"
              />
            </label>
          </div>
          <ImageUploader
            onUploadSuccess={(url) =>
              setFormData((prev) => ({ ...prev, imageURL: url }))
            }
          />
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer"
            onClick={() => navigate("/admin/admin-books")}
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
  );
};

AdminBooksCreate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AdminBooksCreate;
