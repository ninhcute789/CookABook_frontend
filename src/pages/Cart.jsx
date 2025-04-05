import { use, useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
// import b1 from "../assets/books/b1.webp";
// import b2 from "../assets/books/b2.webp";
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  decreaseCartItem,
  deleteCartItemById,
  getCartById,
  handleDeleteCart,
  handleDeleteCartItem,
  increaseCartItem,
  updateCartItemSelectedById,
} from "../services/CartServices";
import { getDefautAddressByUserId } from "../services/AddressServices";
import { AppContext } from "../context/AppContext.jsx";
import { getOrderSession, saveCartToSession } from "../services/OrderServices.jsx";

const Cart = () => {
  const context = useContext(AppContext);

  const [cartItems, setCartItems] = useState([]);
  // const [totalQuantity, setTotalQuantity] = useState(context.quantity);
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalFinalPrice, setTotalFinalPrice] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [address, setAddress] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const addr = async () => {
      const res = await getDefautAddressByUserId(user.id);
      console.log("🏠 Địa chỉ:", res);
      setAddress(res);
    };
    addr();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCartById(user.cartId);
      console.log("✅ API trả về 49:", res);
      setCartItems(res.cartItems);
      context.setQuantity(res.totalQuantity);
      setTotalOriginalPrice(res.totalOriginalPrice);
      setTotalDiscountPrice(res.totalDiscountPrice);
      setTotalFinalPrice(res.totalFinalPrice);
    };
    fetchCart();
  }, []); // Thêm user.cartId vào dependency array

  const fetchCartWithHeader = async () => {
    const res = await getCartById(user.cartId);
    setCartItems(res.cartItems);
    context.setHeaderQuantity(res.totalQuantity);
    context.setQuantity(res.totalQuantity);
    setTotalOriginalPrice(res.totalOriginalPrice);
    setTotalDiscountPrice(res.totalDiscountPrice);
    setTotalFinalPrice(res.totalFinalPrice);
  };

  const fetchCart = async () => {
    const res = await getCartById(user.cartId);
    setCartItems(res.cartItems);
    context.setQuantity(res.totalQuantity);
    setTotalOriginalPrice(res.totalOriginalPrice);
    setTotalDiscountPrice(res.totalDiscountPrice);
    setTotalFinalPrice(res.totalFinalPrice);
  };

  const handleCheckboxChange = async (id) => {
    try {
      // Cập nhật UI trước (Optimistic UI)
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, selected: !item.selected } : item
        )
      );

      // Gọi API cập nhật checkbox
      await updateCartItemSelectedById(id); // Chờ API chạy xong

      // Lấy lại giỏ hàng từ API để cập nhật giá
      await fetchCart();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật checkbox:", error);
    }
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
  {
    // console.log("context", context.theme);
  }
  return (
    <>
      <div className="bg-gray-100 ">
        <div className="w-10/12 mx-auto pt-10">
          <h2 className="text-2xl font-medium mb-4 text-black">GIỎ HÀNG</h2>
          <div className="PAYMENT flex gap-4">
            <div className="LEFT w-20/27">
              <div
                className="bg-white flex justify-between items-center
              rounded-md px-9 mb-3 text-xl shadow-lg py-2"
              >
                <div className="lg:w-13/20 w-1/3 mr-4">Tất cả sản phẩm</div>
                {cartItems.length > 0 && (
                  <>
                    <div className="text-gray-500 w-3/20 text-[16px] text-center">
                      Số lượng
                    </div>
                    <div className="text-gray-500 w-3/20 text-[16px] text-center">
                      Thành tiền
                    </div>
                    <button
                      className=" text-gray-500
                        hover:text-gray-700 w-1/20 flex
                        duration-300 justify-center hover:cursor-pointer"
                      onClick={() =>
                        handleDeleteCart(user, fetchCartWithHeader)
                      }
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>

              <div className="w-full">
                {cartItems.length === 0 && (
                  <div
                    className=" flex items-center font-medium mx-auto
                  text-gray-600 h-60 text-lg mb-4 w-fit"
                  >
                    Chưa có sản phẩm nào trong giỏ hàng
                  </div>
                )}

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-md px-6 mb-4 shadow-lg py-4 flex-col justify-between items-center"
                  >
                    <div
                      className=" flex items-center text-gray-700
                    font-medium text-lg mb-4 border-b-[1.5px] border-red-600 w-fit"
                    >
                      <FcHome className=" mr-2" />
                      Nhà sách Cook A Book
                    </div>
                    <div className="w-full flex items-center bg-white px-3 py-4 rounded">
                      <input
                        type="checkbox"
                        checked={item.selected} // Lấy từ API
                        onChange={() => handleCheckboxChange(item.id)}
                        className="mr-2 w-4 h-4 cursor-pointer"
                      />
                      {/* {console.log("item selected", item.selected)} */}
                      <div className="BOOK flex-col items-center gap-4 w-13/20">
                        <div className="flex">
                          <img
                            src={item.book?.imageURL}
                            alt={item.book?.title}
                            className="w-20 h-20 rounded-lg mx-4"
                          />
                          <div>
                            <p className="font-medium">{item.store}</p>
                            <p className="text-gray-600 text-lg">
                              {item.book?.title}
                            </p>
                            <p className="text-red-500 font-semibold text-xl">
                              {item.book?.finalPrice?.toLocaleString("vi-VN")}đ
                            </p>
                            <p className="text-gray-400 text-sm line-through ">
                              {item.book?.originalPrice?.toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </p>
                          </div>
                        </div>
                        <div className="text-red-600 mt-2 w-fit">
                          Bạn đã được giảm{" "}
                          <span className="text-green-600  bg-stone-200 px-1 rounded-md">
                            {item.book?.discountPercentage}%
                          </span>
                        </div>
                      </div>
                      {/* <p className="ORIGINAL PRICE font-bold w-3/20 mx-auto flex justify-center">
                        {(
                          item.book?.finalPrice * item.quantity
                        ).toLocaleString()}
                        đ
                      </p> */}
                      <div className="QUANTITY flex items-center w-3/20 gap-2 justify-center">
                        <button
                          onClick={() => {
                            const fetch = async () => {
                              if (item.quantity === 1) {
                                handleDeleteCartItem(
                                  item.id,
                                  fetchCartWithHeader,
                                  setCartItems,
                                  context
                                );
                              } else {
                                // Nếu quantity > 1 thì mới giảm số lượng
                                await decreaseCartItem(item.id);
                                updateQuantity(item.id, -1);
                              }

                              await fetchCart();
                            };

                            fetch();
                          }}
                          className="px-2 py-1 w-7 h-7 
                          bg-gray-200 rounded hover:cursor-pointer flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => {
                            const fetch = async () => {
                              updateQuantity(item.id, 1);
                              await increaseCartItem(item.id);
                              await fetchCart();
                            };
                            fetch();
                          }}
                          className="px-2 py-1 w-7 h-7 
                          bg-gray-200 rounded hover:cursor-pointer flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <p className="FINAL PRICE font-bold w-3/20 mx-auto flex justify-center">
                        {(
                          item.book?.finalPrice * item.quantity
                        ).toLocaleString()}
                        đ
                      </p>
                      <button
                        onClick={() =>
                          handleDeleteCartItem(
                            item.id,
                            fetchCartWithHeader,
                            setCartItems,
                            context
                          )
                        }
                        className="TRASH text-red-500 
                        hover:text-red-700 w-1/20 flex 
                        duration-300 justify-center hover:cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="RIGHT w-7/27 sticky top-10 h-fit mb-2">
              <div className="GiaoHang bg-white rounded-md shadow-lg h-fit mb-2">
                <div className="flex justify-between items-center">
                  <div className="text-lg pt-2 ml-5 text-gray-500">
                    Giao hàng
                  </div>
                  <div
                    className="text-sm pt-2 mr-5 text-blue-500 hover:cursor-pointer "
                    onClick={() => navigate("/dia-chi")}
                  >
                    {" "}
                    Thay đổi
                  </div>
                </div>
                <div className="flex text-sm mt-2">
                  <div className="ml-5 font-medium border-r-1 pr-2 w-fit">
                    {address?.name}
                  </div>
                  <div className="pl-2">{address?.phoneNumber}</div>
                </div>
                <div className="flex w-full text-sm pb-3 mt-2">
                  <div className="ml-5 px-1 bg-gray-200 text-green-500 rounded-md w-fit h-fit mr-1">
                    Địa chỉ
                  </div>
                  <div className=" w-8/12">
                    {address?.address}, {address?.ward}, {address?.district},{" "}
                    {address?.city}
                  </div>
                </div>
              </div>
              <div className="TongTien bg-white rounded-md shadow-lg mb-2">
                <div className=" shadow-md rounded-lg ">
                  <div className="mt-4 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-700 font-semibold">
                      <span>Tổng tiền hàng</span>
                      {totalOriginalPrice?.toLocaleString("vi-VN")}₫
                    </div>
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Giảm giá trực tiếp</span>
                      <span>
                        {totalDiscountPrice
                          ? `-${totalDiscountPrice?.toLocaleString("vi-VN")}₫`
                          : ""}
                      </span>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <div className="flex justify-between text-red-600 text-lg font-bold">
                      <span>Tổng tiền thanh toán</span>
                      {totalFinalPrice?.toLocaleString("vi-VN")}₫
                    </div>
                    <div className="text-green-600 text-sm text-right">
                      {totalDiscountPrice
                        ? `Tiết kiệm ${totalDiscountPrice?.toLocaleString(
                            "vi-VN"
                          )}₫`
                        : ""}
                    </div>
                    <button
                      className="w-full bg-red-500 hover:cursor-pointer
                    text-white py-2 mt-4 rounded-lg text-lg 
                    font-semibold duration-300 hoh hover:bg-red-600"
                      onClick={() => {
                        if (context.quantity === 0) {
                          toast.error("Vui lòng chọn sản phẩm để mua!");
                        } else {
                          const fetch = async () => {
                            await saveCartToSession(user.cartId);
                            navigate(`/dia-chi`);
                            await getOrderSession();
                          };
                          fetch();
                          

                          // navigate(`/thanh-toan/${address.id}`);
                        }
                      }}
                    >
                      {context.quantity === 0
                        ? "Bạn chưa chọn sản phẩm nào"
                        : `Mua Hàng (${context.quantity})`}
                      {/* {console.log("totalQuantity", totalQuantity)}/ */}
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
