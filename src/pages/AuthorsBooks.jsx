import { useParams, useNavigate } from "react-router-dom";
// import { books } from "../data/dataBooks";
import { useEffect, useState } from "react";
import { getAllBooksWithSizeAndPage } from "../services/BookServices";
import { getAuthorsById } from "../services/AuthorServices";
const AuthorsBooks = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const size = 8; // Số bài viết mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số bài viết

  useEffect(() => {
    getAuthorsById(id).then((data) => {
      if (data) {
        console.log(data);
      }
      setBooks(data.data);
      console.log("danh sách sách", data.data);
    });
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const res = await getAllBooksWithSizeAndPage(
  //           page,
  //           size,
  //           setBooks,
  //           setTotalPages,
  //           setTotalElements,
  //           "desc",
  //           ""
  //         );
  //         console.log("danh sách sách", res);
  //       } catch (error) {
  //         console.error("Lỗi khi lấy dữ liệu sách:", error);
  //       }
  //     };
  //     fetchData();
  //   }, [page]);
  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 px-[10%] w-full">
          Sách của tác giả {books[0]?.author}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto px-[10%]">
          {books.map((book) => (
            <div
              key={book.id}
              className="hover:cursor-pointer hover:shadow-2xl duration-300 border p-4 rounded-lg shadow-lg min-w-full max-w-[320px] mx-auto h-fit" 
              onClick={() => navigate(`/sách/${book.id}`)}
            >
              <img
                src={book.imageURL}
                alt={book.title}
                className="w-full h-70 object-cover rounded-md"
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
              </div>
              <h3 className="text-lg font-medium mt-2 h-14 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-gray-600">Tác giả: {book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthorsBooks;
