import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAllBooksPreview } from "../../services/BookServices";
import { useNavigate } from "react-router";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";

const TopDealBanner = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Số trang
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(6); // Số sách mỗi trang
  const [content, setContent] = useState("");
  const [change, setChange] = useState("");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Nếu không có danh mục hoặc id === null -> Lấy tất cả sách preview
        await getAllBooksPreview(
          page,
          size,
          setBooks,
          setTotalPages,
          setTotalElements,
          change,
          content
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách:", error);
        toast.error("Lỗi khi tải danh sách sách!");
      }
    };

    fetchData();
  }, [page, content, change, size]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPage((prev) => (prev < totalPages ? prev + 1 : 1));
        setIsFading(false);
      }, 300); // Thời gian hiệu ứng trùng với transition
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages]);

  // Theo dõi kích thước màn hình và cập nhật số lượng item hiển thị
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1310) {
        setSize(6); // Màn hình lớn: 6 item
      } else if (window.innerWidth >= 1090) {
        setSize(5); // Tablet: 4 item
      } else if (window.innerWidth >= 888) {
        setSize(4); // Tablet: 4 item
      } else if (window.innerWidth >= 686) {
        setSize(3); // Tablet: 4 item
      } else if (window.innerWidth >= 500) {
        setSize(2); // Tablet: 4 item
      } else {
        setSize(1); // Mobile: 2 item
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="bg-white p-5 shadow-md rounded-lg h-fit">
      <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
        <span role="img" aria-label="deal">
          👍
        </span>
        TOP DEAL - SIÊU RẺ
      </h2>

      <div className={`book-container duration-300 ${isFading ? "fade-out" : "fade-in"} flex space-x-2 mt-4 relative`}>
        {books.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/sách/${product.id}`)}
            className="w-[300px] hover:shadow-2xl mb-5
            shadow-md transition duration-200 hover:cursor-pointer
             border-cyan-700 p-3 rounded-lg "
          >
            <div className="relative">
              <img
                src={product.imageURL}
                alt={product.title}
                className="w-full h-72 object-cover rounded-md"
              />

              {product.official ? (
                <div className="absolute right-0 bottom-0 pl-[2px] pt-[2px] bg-white rounded-tl-lg">
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-semibold w-fit flex items-center">
                    <TiTickOutline className="mr-1 bg-white rounded-full text-blue-600" />
                    CHÍNH HÃNG
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-2 text-gray-500 text-sm">{product.author}</div>
            <h3 className="text-sm font-semibold  line-clamp-2 h-10">
              {product.title}
            </h3>

            <p className="text-red-600 font-bold mt-2">
              {product.finalPrice?.toLocaleString("vi-VN")}₫
            </p>
            <div className="flex items-center gap-2 ">
              <p className="text-green-600 font-semibold bg-stone-100 p-1 rounded-lg shadow-md text-sm">
                -{product.discountPercentage}%
              </p>
              <p className="text-gray-500 line-through">
                {product.originalPrice?.toLocaleString("vi-VN")}₫
              </p>
            </div>
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
              <span className="text-gray-600 text-sm">(Đã bán 200)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDealBanner;
