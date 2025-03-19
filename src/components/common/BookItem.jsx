import { useNavigate } from "react-router";
// import { books } from "../../data/dataBooks";
import { use, useEffect, useState } from "react";
import { getAllBooksWithSizeAndPage } from "../../services/BookServices";

const BookItem = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const size = 8; // Số bài viết mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số bài viết

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBooksWithSizeAndPage(
          page,
          size,
          setBooks,
          setTotalPages,
          setTotalElements
        );
        console.log("danh sách sách", res);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách:", error);
      }
    };
    fetchData();
  }, [page]);

  const navigate = useNavigate();

  return (
    <div className="flex-col gap-4 mt-5">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {books.map((book) => (
          <div
            onClick={() => navigate(`/sách/${book.id}`)}
            key={book.id}
            className=" p-4 rounded-md shadow-lg hover:cursor-pointer
            bg-white hover:shadow-2xl transition duration-200"
          >
            <img
              src="https://salt.tikicdn.com/cache/750x750/ts/product/5e/cd/08/7c2853c447bec11c57cb66dccb0cdd32.jpg.webp"
              alt={book.title}
              className="w-full h-70 object-cover rounded-lg"
            />
            <div className="p-2">
              <div className="flex space-x-2 items-center">
                <div className="text-xl font-semibold text-black flex">
                  {book.discountPrice?.toLocaleString("vi-VN")}
                  <p className="text-[15px]">₫</p>
                </div>

                {book.discountPercentage && (
                  <p className="text-green-500 font-semibold bg-gray-100 px-1 rounded-md text-sm h-fit">
                    -{book.discountPercentage}%
                  </p>
                )}
              </div>
              <h3 className="text-lg mt-2 line-clamp-2 text-gray-500">{book.title}</h3>
              <div className="mb-2 line-clamp-2 h-13">{book.description}</div>
              {!book.isOfficial ? (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  CHÍNH HÃNG
                </span>
              ) : (
                <span className=" text-white text-xs px-2 py-1 rounded-full font-semibold"></span>
              )}
              <div className="flex items-center gap-1 text-yellow-500 mt-2">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.211 1.192-5.939 5.791 1.401 8.17-7.341-3.857-7.341 3.857 1.401-8.17-5.939-5.791 8.211-1.192z" />
                    {/* path vẽ ngôi sao */}
                  </svg>
                ))}
                <span className="text-gray-600 text-sm">
                  (Đã bán {book.sold || 200})
                </span>
              </div>
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
    </div>
  );
};

export default BookItem;
