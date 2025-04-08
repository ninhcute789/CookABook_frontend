import { useParams, useNavigate, Link } from "react-router-dom";
// import { books } from "../data/dataBooks";
import { use, useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import { getAllBooksPreview, getBooksById } from "../services/BookServices";
import logo from "../assets/fav-icon/android-chrome-512x512.png";
import { BsInfoCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { truncateDate } from "../services/CommonServices";
import { TiTickOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import {
  addBookToCart,
  getQuantityOfCartItems,
} from "../services/CartServices";
import { getDefautAddressByUserId } from "../services/AddressServices";
import { AppContext } from "../context/AppContext";

const BookDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const context = useContext(AppContext);

  const [book, setBook] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const size = 8; // Số bài viết mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số bài viết
  const [defaultAddress, setDefaultAddress] = useState(null);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Cập nhật số lượng giỏ hàng từ user
  const fetchQuantity = async () => {
    try {
      const res = await getQuantityOfCartItems(user.cartId);
      context.setHeaderQuantity(res);
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ mặc định:", error);
    }
  };

  useEffect(() => {
    getBooksById(id).then((data) => {
      if (data) {
        // console.log(data);
      }
      setBook(data);
    });
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const res = await getDefautAddressByUserId(user.id);
        if (res) {
          setDefaultAddress(res);
          // console.log("Địa chỉ mặc định:", res);
        }
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ mặc định:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBooksPreview(
          page,
          size,
          setBooks,
          setTotalPages,
          setTotalElements,
          "desc",
          ""
        );
        // console.log("danh sách sách", res);
        return res;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách:", error);
      }
    };
    fetchData();
  }, [page]);
  return (
    <div className="1 px-[5%] p-4 flex gap-6 relative bg-gray-100">
      <div className="2 w-full flex-col gap-6">
        <div className="3 w-full flex gap-6">
          {/* Ảnh sách */}
          <div className="w-9/24 bg-white sticky top-4 flex flex-col items-center p-4 rounded-lg h-fit shadow-lg">
            <img
              src={book.imageURL}
              alt={book.title}
              className="w-full rounded-md object-center object-cover border-1 border-gray-200 "
            />
            <hr className="w-full text-black my-3" />
            <div className="bg-white">
              <h2 className="text-lg font-semibold mb-3">Đặc điểm nổi bật</h2>
              <ul className="space-y-1">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="text-blue-500 mt-1" />
                  <span className="text-gray-800">
                    Xây dựng thói quen tích cực thông qua những thay đổi nhỏ.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="text-blue-500 mt-1" />
                  <span className="text-gray-800">
                    Dựa trên nghiên cứu tiên tiến về tâm lý học và thần kinh
                    học.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="text-blue-500 mt-1" />
                  <span className="text-gray-800">
                    Cung cấp câu chuyện truyền cảm hứng từ những người thành
                    công.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Thông tin sách */}
          <div className="w-15/24">
            {/* Giá tiền */}
            <div className="bg-white shadow-md space-y-4 p-4 rounded-lg h-fit mb-5">
              <div className="text-gray-600 flex">
                {book.official ? (
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center mr-2">
                    <TiTickOutline className="mr-1 bg-white rounded-full text-blue-600" />
                    <div>CHÍNH HÃNG </div>
                  </div>
                ) : null}
                {/* {console.log("official??", book.official)} */}
                <div className="font-semibold">Tác giả:</div>
                <div
                  onClick={() => navigate(`/sách/tác-giả/${book.author?.id}`)}
                  className="hover:cursor-pointer hover:scale-110 hover:translate-x-2 duration-300 ml-1 text-blue-700"
                >
                  {" "}
                  {book.author?.name}
                </div>
              </div>
              <h1 className="text-xl font-bold">{book.title}</h1>

              {/* Đánh giá */}
              <div className="flex flex-col lg:flex-row items-center gap-1 text-yellow-500">
                <>
                  {[...Array(5)].map((_, index) =>
                    index < Math.round(4) ? (
                      <FaStar key={index} />
                    ) : (
                      <FaRegStar key={index} />
                    )
                  )}
                </>
                <span className="font-semibold text-gray-700">4.2</span>
                <span className="text-gray-500">
                  ({book.reviews} đánh giá) - Đã bán 190
                  {/* {book.sold} */}
                </span>
              </div>

              {/* Giá tiền */}
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="text-red-500 text-3xl font-bold flex ">
                  {/* {book.originalPrice.toLocaleString()} */}
                  {book.finalPrice?.toLocaleString("vi-VN")}
                  <p className="text-[20px]">₫</p>
                </div>
                <div className="flex items-center gap-2">
                  {book.discountPercentage && (
                    <p className="text-green-500 font-semibold bg-gray-100 px-1 rounded-md">
                      -{book.discountPercentage}%
                    </p>
                  )}
                  {book.originalPrice && (
                    <p className="text-gray-500 line-through flex">
                      {book.originalPrice?.toLocaleString("vi-VN")}₫
                    </p>
                  )}
                  <div className="relative">
                    {/* Nút mở popup */}
                    <button
                      onClick={() => setIsOpen(true)}
                      className="text-gray-500 text-lg items-center flex"
                    >
                      <BsInfoCircle />
                    </button>

                    {/* Popup */}
                    {isOpen && (
                      <div className="absolute -top-3 left-6 bg-white shadow-lg rounded-lg w-80 p-4 shadow-neutral-300 z-50">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-bold text-lg">
                            Chi tiết giá
                          </span>
                          <button onClick={() => setIsOpen(false)}>
                            <IoMdClose className="text-gray-500 hover:text-gray-700 text-xl" />
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-gray-700">
                            <span>Giá gốc</span>
                            <span className="font-bold">489.000₫</span>
                          </div>
                          <div className="flex justify-between text-gray-700 mt-1">
                            <span>Giá bán</span>
                            <span className="font-bold">399.300₫</span>
                          </div>
                          <p className="text-gray-500 text-sm">
                            Giá đã giảm trực tiếp từ nhà bán
                          </p>
                          <div className="flex justify-between text-gray-700 mt-2">
                            <span>Giá sau áp dụng mã khuyến mãi</span>
                            <span className="font-bold">369.300₫</span>
                          </div>
                          <p className="text-gray-500 text-sm">
                            Có thể thay đổi ở bước thanh toán
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=" text-sm">
                <h3 className=" font-semibold text-gray-500">
                  Giá sau áp dụng mã khuyến mãi
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-700 space-x-1">
                    <span className="text-blue-500 text-lg">🏷️</span>
                    <span className=" font-semibold text-black">
                      Giảm 20.000₫
                    </span>
                    <span className=" text-gray-500">
                      từ mã khuyến mãi của nhà bán
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700 space-x-1">
                    <span className="text-blue-500 text-lg">🏷️</span>
                    <span className=" font-semibold text-black">
                      Giảm 10.000₫
                    </span>
                    <span className=" text-gray-500">
                      từ mã khuyến mãi của CAB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* {Thông tin vận chuyển} */}
            <div className="bg-white shadow-md p-4 rounded-lg mb-5">
              <h2 className="font-semibold text-lg mb-2">
                Thông tin vận chuyển
              </h2>

              {/* Địa chỉ */}
              {defaultAddress && (
                <div className="flex justify-between items-center text-gray-700 text-sm">
                  <span>
                    Giao đến {defaultAddress?.ward}, {defaultAddress?.district},{" "}
                    {defaultAddress?.city}{" "}
                  </span>
                  <Link to="/dia-chi" className="text-blue-500 text-sm">
                    Đổi
                  </Link>
                </div>
              )}

              <hr className="my-2" />

              {/* Thời gian giao hàng */}
              <div className="flex items-center text-sm text-gray-700">
                <span className="mr-2">🚚</span>
                <span className="font-semibold">Giao Thứ Bảy</span>
              </div>
              <p className="text-sm text-gray-600">
                Trước 19h, 22/03:{" "}
                <span className="text-green-600 font-semibold">Miễn phí</span>
                <span className="line-through text-gray-400 ml-2">18.000₫</span>
              </p>

              {/* Ưu đãi freeship */}
              <div className="mt-3 text-sm text-gray-700 flex items-center">
                <span className="mr-2">🚛</span>
                <span>Freeship 10k đơn từ 45k, Freeship 25k đơn từ 100k</span>
              </div>
            </div>

            {/* Sản phẩm tương tự */}
            <div className="bg-white p-4 rounded-lg shadow-lg relative mb-5">
              <h2 className="text-xl font-semibold mb-4">Sản phẩm tương tự</h2>

              {/* Danh sách sản phẩm */}
              <div className="relative">
                {page > 1 && (
                  <button
                    onClick={() => setPage(page - 1)}
                    className="absolute left-0 top-1/2 hover:cursor-pointer
              duration-300 -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
                  >
                    <FaChevronLeft />
                  </button>
                )}

                <div className=" gap-4 grid grid-cols-4">
                  {/* {console.log("danh sách sách", books)} */}
                  {books.map((product) => (
                    <div
                      key={product.id}
                      className=" p-3 border-1 border-gray-200 hover:cursor-pointer
                  rounded-lg hover:shadow-md transition"
                      onClick={() => {
                        navigate(`/sách/${product.id}`);
                        setQuantity(1);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <img
                        src={product.imageURL}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded"
                      />
                      <h3 className="mt-2 text-xs font-semibold line-clamp-2 h-8">
                        {product.title}
                      </h3>
                      <div className="flex text-black mt-1">
                        <p className=" font-medium">
                          {product.finalPrice.toLocaleString("vi-VN")}
                        </p>
                        <p className="text-[13px]">₫</p>
                      </div>
                    </div>
                  ))}
                </div>
                {page < totalPages && (
                  <button
                    onClick={() => setPage(page + 1)}
                    className="absolute right-0 top-1/2 hover:cursor-pointer
              transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
                  >
                    <FaChevronRight />
                  </button>
                )}
              </div>
            </div>
            {/* Sản phẩm tương tự */}
            <div className="bg-white p-4 rounded-lg shadow-lg relative ">
              <h2 className="text-xl font-semibold mb-2">Thông tin chi tiết</h2>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Công ty phát hành </div>
                  <div>Cook A Book </div>
                </div>
                <hr className="text-gray-300" />
              </div>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Ngày xuất bản </div>
                  <div>{truncateDate(book?.createdAt, 2)} </div>
                </div>
                <hr className="text-gray-300" />
              </div>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Kích thước </div>
                  <div>{book.size} </div>
                </div>
                <hr className="text-gray-300" />
              </div>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Loại bìa </div>
                  <div>
                    {book.coverType === "HARDCOVER" && "Bìa cứng"}
                    {book.coverType === "PAPERBACK" && "Bìa mềm"}
                    {book.coverType === "SPIRAL_BOUND" && "Bìa xoắn ốc"}
                    {book.coverType === "LEATHER_BOUND" && "Bìa da"}
                    {book.coverType === "BOARD_BOOK" && "Bìa cứng toàn bộ"}
                    {book.coverType === "DUST_JACKET" && "Bìa dust jacket"}
                  </div>
                </div>
                <hr className="text-gray-300" />
              </div>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Số trang </div>
                  <div>{book.numberOfPages} </div>
                </div>
                <hr className="text-gray-300" />
              </div>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Nhà xuất bản </div>
                  <div>{book.publisher} </div>
                </div>
                <hr className="text-gray-300" />
              </div>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Trọng lượng </div>
                  <div>{book.weight} </div>
                </div>
                <hr className="text-gray-300" />
              </div>
              <div>
                <div className="grid grid-cols-2 items-center">
                  <div className="text-gray-500 py-1.5">Hàng tồn </div>
                  <div>{book.stockQuantity} </div>
                </div>
                <hr className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <div className="3 w-full bg-white h-80 rounded-lg mt-6 shadow-lg">
          <h2 className="flex text-2xl font-semibold text-black p-4 justify-center items-center h-full">
            Đây là phần bình luận
          </h2>
        </div>
      </div>
      {/* {Mua sách này} */}
      <div className="2 w-8/24 sticky top-4 rounded-lg p-4 bg-white shadow-md h-fit">
        {/* Nhà bán */}
        <div className="flex items-center gap-2 mb-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">Nhà sách CookABook</p>
            <p className="text-sm text-gray-500 flex items-center">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold mr-1">
                OFFICIAL
              </span>{" "}
              •
              <span className="text-yellow-500 ml-1">
                ⭐ 4.8 (416k+ đánh giá)
              </span>
            </p>
          </div>
        </div>

        {/* Số lượng */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Số Lượng</p>
          <div className="flex items-center border border-gray-500 rounded-md">
            <button
              className={`px-3 py-1 border-r text-lg ${
                quantity > 1
                  ? "text-black hover:cursor-pointer "
                  : "text-gray-300 hover:cursor-not-allowed"
              }`}
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              className={`px-3 py-1 border-l text-lg ${
                quantity < 1000
                  ? "text-black hover:cursor-pointer "
                  : "text-gray-300 hover:cursor-not-allowed"
              }`}
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>

        {/* Giá tiền */}
        <div className="mb-3">
          <p className="text-gray-500">Tạm tính</p>
          <div className="flex">
            <p className="text-2xl font-bold text-red-500 flex">
              {/* {(book.price * quantity).toLocaleString()} */}
              {(book.finalPrice * quantity)?.toLocaleString("vi-VN")}
            </p>
            <p className="text-[15px] font-bold text-red-500 ">₫</p>
          </div>
        </div>

        {/* Nút hành động */}
        <button
          className="w-full bg-red-500 duration-300 hover:cursor-pointer
        hover:bg-red-600 text-white py-2 rounded-lg font-semibold mb-2"
          onClick={() => {
            if (!user) {
              toast.error("Bạn chưa đăng nhập!");
              navigate("/dang-nhap");
            } else {
              const fetch = async () => {
                try {
                  await addBookToCart(book.id, user.cartId, quantity);
                  await fetchQuantity();
                } catch (error) {
                  console.error("Lỗi khi lấy địa chỉ mặc định:", error);
                }
              };
              fetch();
              setTimeout(() => {
                navigate("/gio-hang");
              }, 100);
              
            }
          }}
        >
          Mua ngay
        </button>
        <button
          className="w-full border border-gray-300 duration-300
          py-2 rounded-lg hover:cursor-pointer hover:bg-gray-200"
          onClick={() => {
            if (!user) {
              toast.error("Bạn chưa đăng nhập!");
              navigate("/dang-nhap");
            } else {
              const fetch = async () => {
                try {
                  await addBookToCart(book.id, user.cartId, quantity);
                  await fetchQuantity();
                } catch (error) {
                  console.error("Lỗi khi lấy địa chỉ mặc định:", error);
                }
              };
              fetch();
            }
          }}
        >
          Thêm vào giỏ
          {/* {console.log("cartItems", cartItems)} */}
        </button>
        {/* <button className="w-full border border-gray-300 py-2 rounded-lg">
          Mua trước trả sau
        </button> */}
      </div>
    </div>
  );
};

export default BookDetail;
