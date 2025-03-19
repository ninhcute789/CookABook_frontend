import { useState, useEffect } from "react";
// import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";
import BookUpdate from "../update/BookUpdate";
import AddBook from "../addForm/AddBook";
import { handleDeleteBook } from "../../services/BookServices";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBookId, setEditingBookId] = useState(null);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const size = 6; // Số bài viết mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số bài viết

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

      // console.log("✅ API trả về:", res.data);
      setBooks(res.data?.data?.data || []);
      console.log("Danh sách bài viết:", res.data?.data?.data);
      setTotalPages(res.data?.data?.meta?.totalPages);
      // setPage(res.data?.data?.meta?.page);
      // console.log("trang hien tai:", res.data?.data?.meta?.page);
      setTotalElements(res.data?.data?.meta?.totalElements);
      console.log("Tổng số trang:", res.data?.data?.meta?.totalPages);
      console.log("Tổng số bài viết:", res.data?.data?.meta?.totalElements);
    } catch (error) {
      console.error(
        "❌ Lỗi khi lấy danh sách:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const handleClose = () => {
    setEditingBookId(null);
  };

  // Hàm cập nhật danh sách bài viết sau khi chỉnh sửa
  const handleUpdateSuccess = (updatedBook) => {
    setEditingBookId(null); // Đóng form chỉnh sửa
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.data.id
          ? { ...book, ...updatedBook.data }
          : book
      )
    );
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      <AddBook
        onSubmit={(e) => fetchBooks(e)}
        initialData={{
          title: "",
          publisher: "",
          publishYear: null,
          size: "",
          numberOfPages: null,
          weight: null,
          language: "",
          imageURL: "",
          originalPrice: null,
          discountPercentage: null,
          stockQuantity: null,
          available: null,
          description: "",
          coverType: "",
          author: { id: null },
        }}
      />
      <div className="flex flex-row mb-4 items-center [@media(max-width:600px)]:flex-col">
        <h2 className="text-xl font-bold">Danh sách Sách</h2>
        <p
          className="text-md 
          hover:-translate-2 duration-300 hover:cursor-context-menu
          font-medium ml-auto [@media(max-width:600px)]:mx-auto bg-[#7dd237] p-2 rounded-md"
        >
          Số lượng sách: {totalElements}
        </p>
      </div>
      {books.length === 0 ? (
        <p className="text-gray-500">Không có quyển sách nào!</p>
      ) : (
        <>
          <div
            className="grid grid-cols-2 
        [@media(max-width:845px)]:grid-cols-1 
        [@media(min-width:1160px)]:grid-cols-3 gap-4"
          >
            {books.map((book) => (
              <div
                key={book.id}
                className=" p-4 rounded shadow-md hover:shadow-xl duration-300 shadow-[#6969]"
              >
                <h3 className="text-lg font-semibold line-clamp-1">
                  {book.title}
                </h3>
                {book.imageURL && (
                  <img
                    src={book.imageURL}
                    alt="Book"
                    className="w-full h-60 object-cover mt-2 rounded"
                  />
                )}
                <p className="text-gray-600 line-clamp-2 h-13">
                  {book.description}
                </p>

                <p className="font-medium">
                  Tạo bởi - {book?.user?.name || "K có biết"}
                </p>
                <p className="font-medium">Thời gian - {book.createdAt}</p>
                <p className="font-medium">
                  Cập nhật - {book.updatedAt || "Chưa có"}
                </p>

                <div className="flex space-x-2 ml-auto mt-2">
                  <LuPencilLine
                    className="text-blue-500 hover:cursor-pointer hover:scale-150 duration-200"
                    onClick={() => setEditingBookId(book.id)}
                  />
                  <GoTrash
                    className="text-red-500 hover:cursor-pointer hover:scale-150 duration-200"
                    onClick={() =>
                      handleDeleteBook(book.id, setBooks, setTotalElements)
                    }
                  />

                  {editingBookId === book.id && (
                    <BookUpdate
                      bookId={book.id}
                      onUpdateSuccess={handleUpdateSuccess}
                      onClose={handleClose} // Đóng form khi cập nhật xong hoặc bấm "Hủy"
                      book={book}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Phân trang */}
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

export default BookList;
