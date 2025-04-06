import { useState, useEffect } from "react";
// import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
import AddCategory from "../addForm/AddCategory";
import { handleDeleteCategory } from "../../services/CategoryServices";
import CategoryUpdate from "../update/CategoryUpdate";
// import { refreshAccessToken } from "../../api/AuthApi";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10; // Số lượng người dùng trên mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số người dùng

  // const handleRefresh = async () => {
  //   const newAccessToken = await refreshAccessToken();
  //   if (newAccessToken) {
  //     console.log("Access token mới:", newAccessToken);
  //   } else {
  //     console.log("Lỗi khi làm mới token!");
  //   }
  // };

  const fetchCategories = async (page = 1) => {
    // console.log("📌 Giá trị page:", page); // Kiểm tra giá trị `page`

    if (typeof page !== "number") {
      toast.error("❌ Lỗi: page không phải số!", page);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error(
          "❌ Không tìm thấy token! Người dùng có thể chưa đăng nhập."
        );
        return;
      }

      const res = await axiosInstance.get(
        `/categories/all?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("✅ Dữ liệu API trả về:", res.data);
      setCategories(res.data?.data?.data || []);
      // console.log("Danh sách người dùng:", res.data?.data?.data);
      // setCurrentPage(res.data?.data?.meta?.page || 1);
      // console.log("current page", res.data?.data?.meta?.page);
      setTotalElements(res.data?.data?.meta?.totalElements || 0);
      setTotalPages(res.data?.data?.meta?.totalPages || 1);
      // console.log("total page", res.data?.data?.meta?.totalPage);
      // console.log("📌 API response meta:", res.data?.data?.meta);
      // console.log("📌 page nhận từ API:", res.data?.data?.meta?.page);

      // toast.success(<div className="w-90">🎉 Tải danh sách người dùng thành công!</div>);
    } catch (error) {
      console.error(
        "❌ Lỗi khi lấy danh sách thể loại sách:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("🔄 useEffect đang gọi fetchUsers với page =", page);
    fetchCategories(page);
  }, [page]);

  const handleUpdate = (updatedCategory) => {
    setCategories((prev) => {
      console.log("🔄 Trước khi cập nhật:", prev);
      const updatedCategories = prev.map((category) =>
        category.id === updatedCategory.id
          ? { ...category, ...updatedCategory }
          : category
      );
      console.log("✅ Sau khi cập nhật:", updatedCategories);
      return updatedCategories;
    });
  };

  const handleClose = () => {
    setEditingCategoryId(null);
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      <AddCategory
        onSubmit={() => fetchCategories()}
        initialData={{
          name: "",
        }}
      />
      <div className="flex flex-row mb-4 items-center [@media(max-width:600px)]:flex-col w-full mx-auto">
        <h2 className="text-xl font-bold">Danh sách thể loại sách</h2>
        <div
          className="flex items-center gap-2 ml-auto [@media(max-width:600px)]:mx-auto 
          bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg 
          shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span className="font-medium">
            Số lượng thể loại:
            <span className="ml-1 font-bold">{totalElements}</span>
          </span>
        </div>
      </div>
      {categories.length === 0 ? (
        <p className="text-gray-500">Không có thể loại nào!</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Id
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Thể loại
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Thời gian tạo
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Thời gian sửa
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-center">
                      {category.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {category.createdAt}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {category.updatedAt || "Chưa cập nhật"}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <LuPencilLine
                          className="text-blue-600 hover:text-blue-900 hover:cursor-pointer hover:scale-125 duration-200"
                          onClick={() => setEditingCategoryId(category.id)}
                        />
                        <GoTrash
                          className="text-red-600 hover:text-red-900 hover:cursor-pointer hover:scale-125 duration-200"
                          onClick={() =>
                            handleDeleteCategory(
                              category.id,
                              setCategories,
                              setTotalElements
                            )
                          }
                        />
                      </div>
                      {editingCategoryId === category.id && (
                        <CategoryUpdate
                          category={category}
                          onUpdate={handleUpdate}
                          onClose={handleClose}
                          categoryId={category.id}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => {
                setPage((prev) => Math.max(1, prev - 1));
                // window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
              }`}
            >
              Trước
            </button>
            <span className="px-4 py-2 bg-white rounded">
              {page} / {totalPages || 1}
            </span>
            <button
              onClick={() => {
                setPage((prev) => Math.min(totalPages, prev + 1));
                // window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
              }`}
            >
              Tiếp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryList;
