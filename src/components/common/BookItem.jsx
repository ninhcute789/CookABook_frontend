import { useNavigate } from "react-router";
// import { books } from "../../data/dataBooks";
import { use, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllBooksWithSizeAndPage } from "../../services/BookServices";
import { getAllCategoriesWithSizeAndPage } from "../../services/CategoryServices";

const BookItem = (props) => {
  const { books, setBooks, page, setPage, fetchData, totalPages } = props;
  // useEffect(() => {
  //   fetchData();
  // }, [page]);

  const navigate = useNavigate();

  return (
    <div className="flex-col gap-4 mt-5">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {books.map((book) => (
          <div
            onClick={() => navigate(`/sách/${book.id}`)}
            key={book.id}
            className=" p-4 rounded-md shadow-lg hover:cursor-pointer max-w-[320px] h-fit
            bg-white hover:shadow-2xl transition duration-200"
          >
            {/* {console.log("official", book.official)} */}
            <img
              src={book.imageURL}
              alt={book.title}
              className="w-full h-70 object-cover rounded-lg"
            />
            <div className="p-2">
              <div className="flex-col space-x-2 items-center">
                <div className="text-xl font-semibold text-red-600 flex">
                  {book.discountPrice?.toLocaleString("vi-VN")}
                  <p className="text-[15px]">₫</p>
                </div>

                {book.discountPercentage && (
                  <div className="flex space-x-2 items-center">
                    <div className="w-fit text-green-500 font-semibold bg-gray-100 px-1 rounded-md text-sm h-fit">
                      -{book.discountPercentage}%
                    </div>
                    <div>
                      <span className="text-gray-400 line-through">
                        {book.originalPrice?.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-md mt-2 text-gray-500 line-clamp-1">
                {book.author?.name ? book.author.name : book.author}
              </h3>

              <div className=" line-clamp-2 h-14 text-xl">{book.title}</div>

              {book.official ? (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  CHÍNH HÃNG
                </span>
              ) : (
                <span className="px-1"></span>
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
      { <div className="flex justify-center mt-4 space-x-2">
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
      </div>}
    </div>
  );
};
BookItem.propTypes = {
  books: PropTypes.array.isRequired,
  setBooks: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default BookItem;
