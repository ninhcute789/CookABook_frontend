import { useState, useEffect } from "react";
// import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import UserUpdate from "../update/UserUpdate";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
import AddAuthor from "../addForm/AddAuthor";
import AuthorUpdate from "../update/AuthorUpdate";
import { handleDeleteAuthor } from "../../services/AuthorServices";
// import { refreshAccessToken } from "../../api/AuthApi";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAuthorId, setEditingAuthorId] = useState(null);

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

  const fetchAuthors = async (page = 1) => {
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
        `/authors?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("✅ Dữ liệu API trả về:", res.data);
      setAuthors(res.data?.data?.data || []);
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
        "❌ Lỗi khi lấy danh sách tác giả:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("🔄 useEffect đang gọi fetchUsers với page =", page);
    fetchAuthors(page);
  }, [page]);

  const handleUpdate = (updatedAuthor) => {
    setAuthors((prev) => {
      console.log("🔄 Trước khi cập nhật:", prev);
      const updatedAuthors = prev.map((author) =>
        author.id === updatedAuthor.id
          ? { ...author, ...updatedAuthor }
          : author
      );
      console.log("✅ Sau khi cập nhật:", updatedAuthors);
      return updatedAuthors;
    });
  };

  const handleClose = () => {
    setEditingAuthorId(null);
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      <AddAuthor
        onSubmit={() => fetchAuthors()}
        initialData={{
          name: "",
        }}
      />
      <div className="flex flex-row mb-4 items-center [@media(max-width:600px)]:flex-col w-full mx-auto">
        <h2 className="text-xl font-bold">Danh sách tác giả</h2>
        <p
          className="text-md 
          hover:-translate-2 duration-300 hover:cursor-context-menu
          font-medium ml-auto [@media(max-width:600px)]:mx-auto bg-[#7dd237] p-2 rounded-md"
        >
          Số lượng tác giả: {totalElements}
        </p>
      </div>
      {authors.length === 0 ? (
        <p className="text-gray-500">Không có tác giả nào!</p>
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
                    Họ và tên
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                    Số lượng sách
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
                {authors.map((author) => (
                  <tr key={author.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-center">
                      {author.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {author.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {author.numberOfBooks}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {author.createdAt}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {author.updatedAt || "Chưa cập nhật"}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <LuPencilLine
                          className="text-blue-600 hover:text-blue-900 hover:cursor-pointer hover:scale-125 duration-200"
                          onClick={() => setEditingAuthorId(author.id)}
                        />
                        <GoTrash
                          className="text-red-600 hover:text-red-900 hover:cursor-pointer hover:scale-125 duration-200"
                          onClick={() =>
                            handleDeleteAuthor(
                              author.id,
                              setAuthors,
                              setTotalElements
                            )
                          }
                        />
                      </div>
                      {editingAuthorId === author.id && (
                        <AuthorUpdate
                          author={author}
                          onUpdate={handleUpdate}
                          onClose={handleClose}
                          authorId={author.id}
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

export default AuthorList;
