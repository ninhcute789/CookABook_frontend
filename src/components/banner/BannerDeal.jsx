import b1 from "../../assets/books/b1.webp";
import b2 from "../../assets/books/b2.webp";
import b3 from "../../assets/books/b3.webp";
import b4 from "../../assets/books/b4.webp";
import b5 from "../../assets/books/b5.webp";
import b6 from "../../assets/books/b6.webp";
import b7 from "../../assets/books/b7.webp";
import b8 from "../../assets/books/b8.webp";
import b9 from "../../assets/books/b9.webp";
import { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const products = [
  {
    id: 1,
    image: b2, // Thay bằng link ảnh thật
    title: "Phiếu Luyện Viết Cùng Gấu Kiki - Bé Viết Chữ Tiếng Việt",
    price: "24.000đ",
    oldPrice: "29.000đ",
    discount: "-17%",
    rating: 4,
    sold: 100,
  },
  {
    id: 2,
    image: b3,
    title: "2030: Những Xu Hướng Lớn Sẽ Định Hình Thế Giới Trong Tương Lai",
    price: "150.000đ",
    oldPrice: "209.000đ",
    discount: "-28%",
    rating: 5,
    sold: 200,
  },
  {
    id: 3,
    image: b1,
    title: "Kỷ Luật Bản Thân - Để Trở Thành Người Thành Công",
    price: "127.800đ",
    oldPrice: "189.000đ",
    discount: "-32%",
    rating: 4,
    sold: 150,
  },
  {
    id: 4,
    image: b4,
    title: "Bí Quyết Đọc Sách 1 Ngày 1 Cuốn - Tái Bản 2021",
    price: "99.000đ",
    oldPrice: "130.000đ",
    discount: "-24%",
    rating: 4,
    sold: 120,
  },
  {
    id: 5,
    image: b5,
    title: "Sức Mạnh Của Ngôn Từ, Sức Mạnh Của Lời Nói",
    price: "75.000đ",
    oldPrice: "100.000đ",
    discount: "-25%",
    rating: 5,
    sold: 190,
  },
  {
    id: 6,
    image: b6,
    title: "Dám Bị Ghét - Để Trở Thành Người Thành Công",
    price: "120.000đ",
    oldPrice: "160.000đ",
    discount: "-25%",
    rating: 5,
    sold: 180,
  },
  {
    id: 7,
    image: b7,
    title: "2030: Những Xu Hướng Lớn Sẽ Định Hình Thế Giới Trong Tương Lai",
    price: "150.000đ",
    oldPrice: "209.000đ",
    discount: "-28%",
    rating: 5,
    sold: 200,
  },
  {
    id: 8,
    image: b2, // Thay bằng link ảnh thật
    title: "Phiếu Luyện Viết Cùng Gấu Kiki - Bé Viết Chữ Tiếng Việt",
    price: "24.000đ",
    oldPrice: "29.000đ",
    discount: "-17%",
    rating: 4,
    sold: 100,
  },

  {
    id: 9,
    image: b8,
    title: "Bí Quyết Đọc Sách 1 Ngày 1 Cuốn - Tái Bản 2021",
    price: "99.000đ",
    oldPrice: "130.000đ",
    discount: "-24%",
    rating: 4,
    sold: 120,
  },
  {
    id: 10,
    image: b1,
    title: "Kỷ Luật Bản Thân - Để Trở Thành Người Thành Công",
    price: "127.800đ",
    oldPrice: "189.000đ",
    discount: "-32%",
    rating: 4,
    sold: 150,
  },

  {
    id: 11,
    image: b9,
    title: "Dám Bị Ghét - Để Trở Thành Người Thành Công",
    price: "120.000đ",
    oldPrice: "160.000đ",
    discount: "-25%",
    rating: 5,
    sold: 180,
  },
  {
    id: 12,
    image: b5,
    title: "Sức Mạnh Của Ngôn Từ, Sức Mạnh Của Lời Nói",
    price: "75.000đ",
    oldPrice: "100.000đ",
    discount: "-25%",
    rating: 5,
    sold: 190,
  },
];

const TopDealBanner = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white p-5 shadow-md border-t-3 border-red-600 rounded-lg">
      <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
        <span role="img" aria-label="deal">
          👍
        </span>
        TOP DEAL - SIÊU RẺ
      </h2>

      <div className="flex space-x-2 mt-4 relative">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-3 bg-gray-300 hover:cursor-pointer
          rounded-full disabled:opacity-50 items-center top-[45%] absolute left-2"
        >
          <SlArrowLeft className="mx-auto text-blue-700" />
        </button>
        <button
          onClick={handleNextPage}
          disabled={startIndex + itemsPerPage >= products.length}
          className="p-3 bg-gray-300 hover:cursor-pointer
          rounded-full disabled:opacity-50 items-center top-[45%] absolute right-0"
        >
          <SlArrowRight className="mx-auto text-blue-700 " />
        </button>
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            className="w-[300px] hover:shadow-2xl shadow-md transition duration-200 
             border-cyan-700 p-3 rounded-lg "
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-72 object-cover "
            />
            <h3 className="text-sm font-semibold mt-2">{product.title}</h3>
            <div className="flex items-center gap-1 text-yellow-500 mt-2">
              {[...Array(product.rating)].map((_, i) => (
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
                (Đã bán {product.sold})
              </span>
            </div>
            <p className="text-red-600 font-bold">{product.price}</p>
            <div className="flex items-center gap-2">
              <p className="text-green-600 font-semibold">{product.discount}</p>
              <p className="text-gray-500 line-through">{product.oldPrice}</p>
            </div>
            <hr className="mt-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDealBanner;
