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
        author.id === updatedAuthor.id ? { ...author, ...updatedAuthor } : author
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
      <div className="flex flex-row mb-4 items-center [@media(max-width:600px)]:flex-col w-3/4 mx-auto">
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
          <div className="rounded-lg overflow-hidden shadow-lg w-3/4 mx-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-xl">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    Id
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Họ và tên
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Số lượng sách
                  </th>
                  {/* <th className="border border-gray-300 px-4 py-2">
                    Ngày sinh
                  </th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">Email</th> */}
                  <th className="border border-gray-300 px-4 py-2">
                    Thời gian tạo
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Thời gian sửa
                  </th>
                  <th className="border border-gray-300 px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {authors.map(
                  (
                    author // Đảo ngược mảng để hiển thị người dùng mới nhất lên trên
                  ) => (
                    <tr
                      key={author.id}
                      className="border border-gray-300 hover:bg-gray-300 transition-all"
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {author.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {author.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {author.numberOfBooks}
                      </td>
                      {/* <td className="border border-gray-300 px-4 py-2">
                        {new Date(author.dob).toLocaleDateString("vi-VN")}
                      </td> */}
                      {/* <td className="border border-gray-300 px-4 py-2">
                        {author.email}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2">
                        {author.createdAt}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {author.updatedAt || "Chưa cập nhật"}
                      </td>
                      <td className=" p-2 space-x-4 items-center justify-center flex h-10">
                        <LuPencilLine
                          className="text-blue-500 hover:cursor-pointer hover:scale-150 duration-200"
                          onClick={() => setEditingAuthorId(author.id)}
                        />

                        <GoTrash
                          className="text-red-700 hover:cursor-pointer hover:scale-150 duration-200"
                          onClick={() => handleDeleteAuthor(author.id, setAuthors, setTotalElements)}
                        />
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
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
              }}
              className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
              }`}
              disabled={page === 1}
            >
              Trước
            </button>

            <span className="px-4 py-2 rounded-lg shadow-md">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages));
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
              }}
              className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
              }`}
              disabled={page === totalPages}
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
