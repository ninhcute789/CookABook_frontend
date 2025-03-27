import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import b1 from "../assets/books/b1.webp";
// import b2 from "../assets/books/b2.webp";
import { FcHome } from "react-icons/fc";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      store: "Một sách Mogu",
      name: "Sách cho bé từ 3 tuổi - Bộ 4 cuốn Phát triển cảm xúc",
      price: 197880,
      oldPrice: 204000,
      quantity: 3,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      store: "HỆ THỐNG NHÀ SÁCH ABC",
      name: "Tiến lên xe cứu hỏa",
      price: 44100,
      oldPrice: 49000,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [checkedItems, setCheckedItems] = useState({});

  // const checkedCount = Object.values(checkedItems).filter(value => value === true).length;
  // // Đếm số lượng item đã tích
  let checkedCount = 0;
  for (let key in checkedItems) {
    if (checkedItems[key]) checkedCount++;
  }

  const toggleCheckbox = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems
    .filter((item) => checkedItems[item.id]) // Chỉ lấy những item đã tích
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="bg-gray-200 ">
        <div className="w-10/12 mx-auto pt-10">
          <h2 className="text-2xl font-medium mb-4 text-black">GIỎ HÀNG</h2>
          <div className="PAYMENT flex gap-4">
            <div className="LEFT w-21/27">
              <div className="bg-white rounded-md px-6 mb-3 text-xl shadow-lg py-2">
                Tất cả sản phẩm
              </div>
              <div className="w-full">
                {/* <div className=" flex items-center font-medium text-lg mb-4 border-b-2 border-gray-500 w-fit">
                  <FcHome className=" mr-2" />
                  Nhà sách Cook A Book
                </div> */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-md px-6 mb-4 shadow-lg py-4 flex-col justify-between items-center"
                  >
                    <div className=" flex items-center font-medium text-lg mb-4 border-b-2 border-gray-500 w-fit">
                      <FcHome className=" mr-2" />
                      Nhà sách Cook A Book
                    </div>
                    <div className="w-full flex items-center">
                      <input
                        key={item.id}
                        type="checkbox"
                        checked={checkedItems[item.id]}
                        onChange={() => toggleCheckbox(item.id)}
                        className="mr-2 w-4 h-4 cursor-pointer"
                      />
                      <div className="BOOK flex-col items-center gap-4 w-1/2">
                        <div className="flex">
                          <img
                            src={b1}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg"
                          />
                          <div>
                            <p className="font-medium">{item.store}</p>
                            <p className="text-gray-600 text-sm">{item.name}</p>
                            <p className="text-red-500 font-semibold">
                              {item.price.toLocaleString("vi-VN")}đ
                            </p>
                            <p className="text-gray-400 text-xs line-through">
                              {item.oldPrice.toLocaleString("vi-VN")}đ
                            </p>
                          </div>
                        </div>
                        <div className="text-red-600 mt-2 w-fit">
                          Bạn đã được giảm{" "}
                          <span className="text-green-600  bg-stone-200 px-1 rounded-md">
                            {30}%
                          </span>
                        </div>
                      </div>
                      <p className="ORIGINAL PRICE font-bold w-3/20 mx-auto flex justify-center">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                      <div className="QUANTITY flex items-center w-3/20 gap-2 justify-center">
                        <button
                          onClick={() => {
                            updateQuantity(item.id, -1);
                            if (item.quantity <= 1) {
                              if (
                                window.confirm(
                                  "Bạn có muốn xóa sách này khỏi giỏ hàng không?"
                                )
                              ) {
                                removeItem(item.id);
                              }
                            } else {
                              updateQuantity(item.id, -1);
                            }
                          }}
                          className="px-2 py-1 bg-gray-200 rounded hover:cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <p className="FINAL PRICE font-bold w-3/20 mx-auto flex justify-center">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="TRASH text-red-500 hover:text-red-700 w-1/20 flex duration-300 justify-center hover:cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="RIGHT w-6/27">
              <div className="GiaoHang bg-white rounded-md shadow-lg h-fit mb-2">
                <div className="text-lg pt-2 ml-5 text-gray-500">Giao hàng</div>
                <div className="flex text-sm mt-2">
                  <div className="ml-5 font-medium border-r-1 pr-2 w-fit">
                    Jason Nguyễn
                  </div>
                  <div className="pl-2">0123456789</div>
                </div>
                <div className="flex w-full text-sm pb-3 mt-2">
                  <div className="ml-5 px-1 bg-gray-200 text-green-500 rounded-md w-fit h-fit mr-1">
                    Địa chỉ
                  </div>
                  <div className=" w-8/12">
                    abc số 567, đường Lạc Long Quân, phố Kiến Huy.
                  </div>
                </div>
              </div>
              {/* <div className="KhuyenMai mb-2 bg-white rounded-md px-5 py-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">
                    CAB Khuyến Mãi
                  </span>
                  <span className="text-gray-500 text-sm">Có thể chọn 2 ⓘ</span>
                </div>
                <div className="flex items-center bg-blue-50 border border-blue-400 rounded-lg p-3">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-md font-bold text-sm mr-2">
                    FREESHIP XTRA
                  </div>
                  <div className="flex-1 text-gray-700">Giảm 100K</div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                    Bỏ Chọn
                  </button>
                </div>
                <div className="text-blue-600 text-sm mt-2 cursor-pointer flex items-center">
                  <span className="mr-1">📝</span> Mua thêm để giảm 4% cho đơn
                  t...
                </div>
              </div> */}
              <div className="TongTien bg-white rounded-md shadow-lg mb-2">
                <div className=" shadow-md rounded-lg ">
                  <div className="mt-4 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-700 font-semibold">
                      <span>Tổng tiền hàng</span>
                      {totalAmount.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Giảm giá trực tiếp</span>
                      <span>-66.600₫</span>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <div className="flex justify-between text-red-600 text-lg font-bold">
                      <span>Tổng tiền thanh toán</span>
                      {totalAmount.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="text-green-600 text-sm text-right">
                      Tiết kiệm 66.600₫
                    </div>
                    <button
                      className="w-full bg-red-500 hover:cursor-pointer
                    text-white py-2 mt-4 rounded-lg text-lg 
                    font-semibold duration-300 hoh hover:bg-red-600"
                    >
                      Mua Hàng ({checkedCount})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
