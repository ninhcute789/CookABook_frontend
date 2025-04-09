import { useState, useEffect } from "react";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import axiosInstance from "../../services/axiosInstance";
import BookUpdate from "../update/BookUpdate";
import AddBook from "../addForm/AddBook";
import { handleDeleteBook } from "../../services/BookServices";
import { useNavigate } from "react-router";

const BookList = () => {
  const navigate = useNavigate();

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

      setBooks(res.data?.data?.data || []);
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
    console.log("sach luc sau khi update", updatedBook);
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-10">
      {/* <AddBook
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
          official: "",
          description: "",
          coverType: "",
          author: { id: "" },
          categories: [{ id: "", name: "" }],
        }}
      /> */}
      <button
        onClick={() => navigate("/admin/admin-books/creating")}
        className="bg-blue-500 hover:cursor-pointer mb-5 w-50 duration-300
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm sách mới
      </button>

      <div className="flex flex-row mb-4 items-center [@media(max-width:600px)]:flex-col">
        <h2 className="text-xl font-bold">Danh sách Sách</h2>
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="font-medium">
            Số lượng sách:
            <span className="ml-1 font-bold">{totalElements}</span>
          </span>
        </div>
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
                {book.imageURL && (
                  <img
                    src={book.imageURL}
                    alt="Book"
                    className="w-full h-60 object-cover mt-2 rounded"
                  />
                )}
                <h3 className="text-lg font-semibold line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 h-13">
                  {book.description}
                </p>
                <div className="">
                  <hr className="border-1 my-1 text-gray-300" />
                  <div className="flex justify-between">
                    <div>
                      Giá gốc -{" "}
                      <span className="line-through text-red-500 font-medium">
                        {book.originalPrice?.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <p> - {book.discountPercentage}%</p>
                    <div>
                      Giá giảm -{" "}
                      <span className="text-green-500 font-medium">
                        {book.finalPrice?.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>
                  <p className="text-center"> </p>
                  <hr className="border-1 my-1 text-gray-300" />
                  <div className="flex justify-between">
                    <p className={book.official ? "font-medium" : ""}>
                      {book.official ? "Chính hãng" : "Không chính hãng"}
                    </p>
                    <p className={book.available ? "font-medium" : ""}>
                      {book.available ? "Còn hàng" : "Đã bán hết"}
                    </p>
                  </div>
                  <hr className="border-1 my-1 text-gray-300" />
                </div>
                <p className="font-medium">
                  Tác giả - {book?.author?.name || "K có biết"}
                  {/* {console.log("author", book?.author?.name)} */}
                </p>
                <p className="font-medium">
                  Thể loại sách -{" "}
                  {book.categories?.map((category) => category.name).join(", ")}
                </p>

                {/* {console.log("book", book)}  */}
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

                  {
                    editingBookId === book.id &&
                      navigate(`/admin/admin-books/updating/${book.id}`) // Chuyển hướng đến trang AdminBooks
                    // <BookUpdate
                    //   bookId={book.id}
                    //   onUpdateSuccess={handleUpdateSuccess}
                    //   onClose={handleClose} // Đóng form khi cập nhật xong hoặc bấm "Hủy"
                    //   book={book}
                    // />
                  }
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
