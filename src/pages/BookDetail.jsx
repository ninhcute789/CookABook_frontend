import { useParams, useNavigate } from "react-router-dom";
// import { books } from "../data/dataBooks";
import { use, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getBooksById } from "../services/BookServices";
import { set } from "@cloudinary/url-gen/actions/variable";
import { BsInfoCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const BookDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [book, setBook] = useState([]);
  // const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    getBooksById(id).then((data) => {
      if (data) {
        console.log(data);
      }
      setBook(data);
    });
  }, [id]);
  console.log(book);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Tìm sách theo id
  // const book = books.find((b) => b.id.toString() === id);

  // if (!book) {
  //   return <div className="text-center text-red-500">Không tìm thấy sách!</div>;
  // }

  return (
    <div className=" px-[5%] p-4 flex gap-6 relative bg-gray-100">
      {/* Ảnh sách */}
      <div className="w-7/24 bg-white sticky top-4 flex flex-col items-center p-4 rounded-lg h-fit shadow-md">
        <img
          src="https://salt.tikicdn.com/cache/750x750/ts/product/5e/cd/08/7c2853c447bec11c57cb66dccb0cdd32.jpg.webp"
          alt={book.title}
          className="w-full rounded-md object-center object-cover border-1 border-gray-200 "
        />
      </div>

      {/* Thông tin sách */}
      <div className="w-11/24 ">
        {/* Giá tiền */}
        <div className="bg-white shadow-md space-y-4 p-4 rounded-lg h-fit mb-5">
          <p className="text-gray-600">
            <span className="font-semibold">Tác giả:</span> {book.author}
          </p>
          <h1 className="text-xl font-bold">{book.title}</h1>

          {/* Đánh giá */}
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, index) =>
              index < Math.round(4) ? (
                <FaStar key={index} />
              ) : (
                <FaRegStar key={index} />
              )
            )}
            <span className="font-semibold text-gray-700">{book.rating}</span>
            <span className="text-gray-500">
              ({book.reviews} đánh giá) - Đã bán 190
              {/* {book.sold} */}
            </span>
          </div>

          {/* Giá tiền */}
          <div className="flex items-center gap-4">
            <div className="text-red-500 text-3xl font-bold flex ">
              {/* {book.originalPrice.toLocaleString()} */}
              {book.discountPrice?.toLocaleString("vi-VN")}
              <p className="text-[20px]">₫</p>
            </div>
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
                    <span className="font-bold text-lg">Chi tiết giá</span>
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
          <div className=" text-sm">
            <h3 className=" font-semibold text-gray-500">
              Giá sau áp dụng mã khuyến mãi
            </h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-700 space-x-1">
                <span className="text-blue-500 text-lg">🏷️</span>
                <span className=" font-semibold text-black">Giảm 20.000₫</span>
                <span className=" text-gray-500">
                  từ mã khuyến mãi của nhà bán
                </span>
              </div>
              <div className="flex items-center text-gray-700 space-x-1">
                <span className="text-blue-500 text-lg">🏷️</span>
                <span className=" font-semibold text-black">Giảm 10.000₫</span>
                <span className=" text-gray-500">từ mã khuyến mãi của CAB</span>
              </div>
            </div>
          </div>
        </div>
        {/* {Thông tin vận chuyển} */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Thông tin vận chuyển</h2>

          {/* Địa chỉ */}
          <div className="flex justify-between items-center text-gray-700 text-sm">
            <span>Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span>
            <a href="#" className="text-blue-500 text-sm">
              Đổi
            </a>
          </div>

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
      </div>

      {/* {Mua sách này} */}
      <div className="w-6/24 sticky top-4 rounded-lg p-4 bg-white shadow-md h-fit">
        {/* Nhà bán */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={book.image || book.image}
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Nhà sách Fahasa</p>
            <p className="text-sm text-gray-500 flex items-center">
              <span className="text-blue-500 font-semibold">OFFICIAL</span> •
              <span className="text-yellow-500 ml-1">
                ⭐ 4.8 (416k+ đánh giá)
              </span>
            </p>
          </div>
        </div>

        {/* Số lượng */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Số Lượng</p>
          <div className="flex items-center border rounded-md">
            <button
              className="px-3 py-1 border-r text-lg hover:cursor-pointer"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              className="px-3 py-1 border-l text-lg hover:cursor-pointer"
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
              {(book.discountPrice * quantity)?.toLocaleString("vi-VN")}
            </p>
            <p className="text-[15px] font-bold text-red-500 ">₫</p>
          </div>
        </div>

        {/* Nút hành động */}
        <button
          className="w-full bg-red-500 duration-300 hover:cursor-pointer
        hover:bg-red-600 text-white py-2 rounded-lg font-semibold mb-2"
        >
          Mua ngay
        </button>
        <button className="w-full border border-gray-300 py-2 rounded-lg mb-2">
          Thêm vào giỏ
        </button>
        <button className="w-full border border-gray-300 py-2 rounded-lg">
          Mua trước trả sau
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
