import { useContext, useEffect, useState } from "react";
import { getAddressById } from "../services/AddressServices";
import { useNavigate } from "react-router";
import ic1 from "../assets/iconCASH.png";
import ic2 from "../assets/iconVNP.png";
import { AppContext } from "../context/AppContext";
import {
  createPayment,
  getCartPaymentById,
  savePaymentTosession,
} from "../services/PaymentServices";
import { FaTruck } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  createOrder,
  getOrderSession,
  saveAddressToSession,
  saveCartToSession,
} from "../services/OrderServices";
import toast from "react-hot-toast";

const Payment = () => {
  const context = useContext(AppContext);
  const [address, setAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(() => {
    return sessionStorage.getItem("selectedPayment") || "COD";
  });
  const [cartPayment, setCartPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Local loading state
  const [expand, setExpand] = useState(false);
  const [paymentId, setPaymentId] = useState(null); // Local state for paymentId

  const navigate = useNavigate();

  const paymentMethods = [
    { id: "COD", label: "Thanh toán tiền mặt", img: ic1 },
    {
      id: "VNPAY",
      label: "VNPAY - Quét mã QR từ ứng dụng ngân hàng",
      img: ic2,
    },
  ];

  useEffect(() => {
    sessionStorage.setItem("selectedPayment", selectedPayment);
  }, [selectedPayment]);

  useEffect(() => {
    const fetchAddress = async () => {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);

      // if (!context?.idAddress || !context?.user?.cartId) {
      //   console.log("User or address data is not ready yet.");
      //   setIsLoading(false); // Stop loading if data is not ready
      //   return;
      // }

      try {
        console.log("👤 ID người dùng:", context?.idAddress);
        const address = await getAddressById(context?.idAddress);
        console.log("🏠 Địa chỉ:", address);
        setAddress(address);

        const paymentCart = await getCartPaymentById(parsedUser.cartId);
        console.log("47:", paymentCart?.cartItems);
        setCartPayment(paymentCart);
        console.log("🛒 Cart ID:", context?.user.cartId);
      } catch (error) {
        console.error("Error fetching address or cart:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching data
      }
    };

    if (!context.loadingUser) {
      fetchAddress();
    }
  }, [context.loadingUser, context?.idAddress, context?.user?.cartId]);
  const fetchOrdering = async () => {
    try {
      // const storedUser = localStorage.getItem("user");
      // const parsedUser = JSON.parse(storedUser);

      // await saveCartToSession(parsedUser.cartId);

      // await saveAddressToSession(context?.idAddress);

      // Gọi API createPayment và lấy paymentId từ kết quả trả về
      const paymentId = await createPayment(
        selectedPayment,
        cartPayment?.totalFinalPrice,
        context?.user.id
      );

      // Gọi API savePaymentTosession với paymentId
      await savePaymentTosession(paymentId.id);

      await getOrderSession();

      // Gọi API createOrder
      await createOrder(context?.user.id);
      console.log("✅ Order created successfully");
    } catch (error) {
      console.error("❌ Error in payment process:", error);
    }
  };

  // useEffect(() => {
  //   console.log("🔄 Context loadingUser:", context.loadingUser);
  //   console.log("🔄 Context user:", context.user);
  //   console.log("🔄 Context idAddress:", context.idAddress);
  // }, [context.loadingUser, context.user, context.idAddress]);

  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // if (context.loadingUser || isLoading) {
  //   // Show a loading spinner or placeholder while data is being fetched
  //   return <div>Loading...</div>;
  // }

  // if (!context?.user || !context?.user.cartId) {
  //   // Handle case where user data is not available
  //   return <div>No user data available</div>;
  // }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-17/24 mx-auto px-6 pt-6 text-2xl font-semibold">
        Thanh toán
      </div>
      <div className="CONTENT flex w-17/24 gap-4 p-6 mx-auto">
        {/* Chọn phương thức thanh toán */}
        <div className="LEFT  w-17/24 h-fit">
          <div className="SANPHAM bg-white p-3 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-3">Sản phẩm của bạn</p>
            {cartPayment.cartItems?.map((item) => (
              <div
                key={item.id}
                className="flex border-green-400  mt-2 border rounded-md p-2"
              >
                <div className="LEFT flex w-full items-center">
                  <img
                    src={item.book?.imageURL}
                    alt={item.book?.title}
                    className="w-12 h-12 mr-3 rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      {item.book?.title}
                    </p>
                    <p className="text-gray-600">SL: x{item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 font-semibold">
                      {item.book?.finalPrice?.toLocaleString()} ₫
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      {item.book?.originalPrice?.toLocaleString()} ₫
                    </p>
                  </div>
                </div>
                <div className="RIGHT  flex bg-gray-200 p-2 w-1/2 rounded-md ml-2">
                  <CiDeliveryTruck className=" text-black size-7 mr-2" />
                  <div className="text-gray-500">
                    Được giao bởi hệ thống nhà sách CAB
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="flex justify-between items-center mt-3">
              <p className="text-gray-600">Phí ship:</p>
              <p className="text-gray-800">
              </p>
            </div> */}
            {/* <div className="mt-2 flex items-center text-gray-500 text-sm">
              <FaTruck className="mr-2" />
              <span>{selectedShipping.provider}</span>
            </div> */}
          </div>
          <div className="CHONHINHTHUC bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-semibold mb-3">
              Chọn hình thức thanh toán
            </h2>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={method.id}
                    value={method.id}
                    name="payment"
                    required
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  {console.log("🏦 selectedPayment:", selectedPayment)}
                  <img
                    src={method.img}
                    alt={method.label}
                    className="w-8 h-8 object-cover "
                  />

                  <label htmlFor={method.id} className="cursor-pointer">
                    {method.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tổng hợp đơn hàng */}
        <div className="RIGHT w-8/24 flex flex-col">
          <div className="GIAOHANG bg-white rounded-md shadow-lg h-fit ">
            <div className="flex justify-between items-center">
              <div className="text-lg pt-2 ml-5 text-gray-500 font-medium">
                Giao hàng
              </div>
              <div
                className="text-sm pt-2 mr-5 text-blue-500 hover:cursor-pointer "
                onClick={() => navigate("/dia-chi")}
              >
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
          <div className="DONHANG bg-white p-4 rounded-lg shadow-md mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-500">Đơn hàng</h2>
              <div
                className="text-sm text-blue-500 hover:cursor-pointer"
                onClick={() => navigate("/gio-hang")}
                // onClick={navigate("/gio-hang")}
              >
                Thay đổi
              </div>
            </div>
            <div className=" flex text-sm mt-2">
              <div className="">{cartPayment?.totalQuantity} sản phẩm.</div>
              {cartPayment?.totalQuantity === 0 ? (
                <div className="ml-2 text-red-500 font-medium">
                  Giỏ hàng trống
                </div>
              ) : (
                <div
                  className={`ml-1 text-blue-500 hover:cursor-pointer duration-300 `}
                  onClick={() => setExpand(!expand)}
                >
                  {expand ? (
                    <>
                      <div>
                        Thu gọn{" "}
                        <IoIosArrowDown className="inline duration-500 rotate-180" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        Xem thêm{" "}
                        <IoIosArrowDown className="inline duration-500 rotate-0" />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div
              className={`overflow-hidden duration-600  ${
                expand ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <hr className="my-2 text-gray-500" />
              {cartPayment.cartItems?.map((item) => (
                <div
                  key={item.id}
                  className=" text-gray-600 font-medium text-sm flex"
                >
                  <div className="text-black w-4/24">{item.quantity}x</div>
                  <div className="w-full">{item.book?.title}</div>
                  <div className="w-8/24 text-black text-right">
                    {item.book?.finalPrice?.toLocaleString("vi-VN")} ₫
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-2 text-gray-500" />
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Tổng tiền hàng</span>
                <span className="font-medium">
                  {cartPayment?.totalOriginalPrice?.toLocaleString("vi-VN")}₫
                </span>
              </div>
              <div className="flex justify-between text-green-500">
                <span className="font-medium">Giảm giá trực tiếp</span>
                <span className="font-medium">
                  - {cartPayment?.totalDiscountPrice?.toLocaleString("vi-VN")}₫
                </span>
              </div>
              <hr className="my-2 text-gray-500" />
              <div className="flex justify-between font-bold text-red-500 text-lg">
                <span>Tổng tiền thanh toán</span>
                <span className="font-medium">
                  {cartPayment?.totalFinalPrice?.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>
            <button
              className="mt-4 w-full bg-red-500 hover:cursor-pointer
             text-white py-2 rounded-lg hover:bg-red-600 duration-300"
              onClick={() => {
                if (cartPayment.cartItems?.length === 0) {
                  toast.error("Giỏ hàng trống!");
                  navigate("/sách");
                  return;
                }
                const placeOrder = async () => {
                  await fetchOrdering();
                  context.setHeaderQuantity(0);
                  setTimeout(() => {
                    navigate("/thong-tin-tai-khoan/don-hang");
                  }, 100);
                };
                placeOrder();
              }}
            >
              {cartPayment.cartItems?.length > 0
                ? "Đặt hàng"
                : "Giỏ hàng trống"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
