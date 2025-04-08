import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { cancelOrderById, getOrderById } from "../../services/OrderServices";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const UserSelectedOrder = () => {
  const context = useContext(AppContext);

  const { id } = useParams(); // Lấy id từ URL

  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);

  const [showCancelModal, setShowCancelModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!context?.user?.id) return;

      try {
        setLoading(true);
        setError(null);

        const ordersData = await getOrderById(id);

        setOrder(ordersData);
        setAddress(ordersData.shippingAddress);
        setPayment(ordersData.payment);
        console.log("Danh sách đơn hàng:", ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id, context?.user?.id]);

  const handleCancelOrder = async () => {
    try {
      // Call API to cancel order
      await cancelOrderById(order.id);

      // Update local order state
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: "CANCELLED",
      }));

      // Close the modal
      setShowCancelModal(false);

      // Optional: Refresh order data
      // const updatedOrder = await getOrderById(id);
      // setOrder(updatedOrder);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
    }
  };

  if (loading) {
    return (
      <div className="w-39/48 flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return <div className="w-39/48 text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="w-39/48">
      <h2 className="text-xl font-semibold px-4 py-[22px]">Đơn hàng của bạn</h2>
      <div className="px-4">
        <div className="text-xl text-white font-semibold mb-4 flex bg-[#3d3d3d] w-fit p-2 rounded">
          Chi tiết đơn hàng #{id} -{" "}
          <div
            className={`ml-2 ${
              order.status === "COMPLETED"
                ? "text-green-600"
                : order.status === "PENDING"
                ? "text-[#e8b22c]"
                : order.status === "CONFIRMED"
                ? "text-blue-600"
                : order.status === "CANCELLED"
                ? "text-red-600"
                : order.status === "DELIVERED"
                ? "text-orange-600"
                : order.status === "DELIVERING"
                ? "text-purple-600"
                : order.status === "RETURNED"
                ? "text-gray-600"
                : ""
            }`}
          >
            {order.status === "COMPLETED" && "Đã hoàn thành"}
            {order.status === "CANCELLED" && "Đã hủy"}
            {order.status === "PENDING" && "Đang chờ xử lý"}
            {order.status === "CONFIRMED" && "Được xác nhận"}
            {order.status === "DELIVERED" && "Đã giao hàng"}
            {order.status === "DELIVERING" && "Đang giao hàng"}
            {order.status === "RETURNED" && "Đã trả hàng"}
          </div>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-4 mb-4">
          {/* Column 1 */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">ĐỊA CHỈ NGƯỜI NHẬN</h2>
            <div className="bg-white rounded p-4 shadow-sm flex-1">
              <p className="mb-2 font-medium">{address?.name}</p>
              <p className="mb-2 text-gray-700">
                <span className="text-gray-400">Địa chỉ:</span>{" "}
                {address?.address}, {address?.ward}, {address?.district},{" "}
                {address?.city}
              </p>
              <p className="text-gray-700">
                <span className="text-gray-400">Điện thoại:</span> 0394517504
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">HÌNH THỨC GIAO HÀNG</h2>
            <div className="bg-white rounded p-4 shadow-sm flex-1 text-gray-700">
              <div className="mb-2 ">
                <span className="text-yellow-400 font-medium">FAST</span> Giao
                Tiết Kiệm
              </div>
              <div className="mb-2 ">
                Giao hàng trước ngày{" "}
                {new Date(
                  new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
              <div>Được giao bởi Cook A Book</div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">HÌNH THỨC THANH TOÁN</h2>
            <div className="bg-white rounded p-4 shadow-sm flex-1 text-gray-700">
              {payment?.paymentMethod === "COD" && (
                <p className="mb-2">Thanh toán tiền mặt khi nhận hàng</p>
              )}
              {console.log("🚀 payment:", payment)}
              {payment?.paymentMethod === "VNPAY" && (
                <p className="mb-2">Thanh toán qua VNPAY</p>
              )}
              {/* <p className="mb-2">Thanh toán khi nhận hàng</p>
              <p>Thanh toán tiền mặt khi nhận hàng</p> */}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto overflow-hidden rounded-lg mb-4 shadow-sm">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className=" text-left">
                <th className="px-6 font-medium border-b border-gray-300 first:rounded-tl-lg w-1/2">
                  Sản phẩm
                </th>
                <th className="p-3 font-medium border-b border-gray-300 text-center">
                  Giá
                </th>
                <th className="p-3 font-medium border-b border-gray-300 text-center">
                  Số lượng
                </th>
                <th className="p-3 font-medium border-b border-gray-300 text-center">
                  Giảm giá
                </th>
                <th className="p-3 font-medium border-b border-gray-300 text-center last:rounded-tr-lg">
                  Tạm tính
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="flex  gap-2">
                      <img
                        src={product.book.bookImageURL}
                        alt={product.book.bookTitle}
                        className="w-16 h-16 object-cover rounded mr-2"
                      />
                      <div className="flex flex-col">
                        <p className="text-md text-black ">
                          {product.book.bookTitle}
                        </p>
                        <p className="text-sm text-gray-500">
                          Cung cấp bởi{" "}
                          <span className="text-blue-600">Cook A Book</span>
                        </p>
                        <button
                          className="px-4 py-2 bg-white text-blue-500 rounded-md border
                             w-fit duration-300 border-blue-800 text-sm font-medium 
                             mt-3 hover:cursor-pointer hover:shadow-md active:scale-85"
                          onClick={() => {
                            navigate(`/sách/${product.book.bookId}`);
                          }}
                        >
                          Mua lại
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    {product.book.bookFinalPrice?.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="p-3 text-center">{product.quantity}</td>
                  <td className="p-3 text-center">
                    {product.book.bookDiscountPrice?.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="p-3 text-center">
                    {product.price?.toLocaleString("vi-VN")}₫
                  </td>
                </tr>
              ))}
              <tr className=" font-medium">
                <td colSpan="4" className="p-3 text-right ">
                  Tổng tiền thanh toán:
                </td>
                <td className="p-3 text-center text-red-600">
                  {order.totalPrice?.toLocaleString("vi-VN")}₫
                </td>
              </tr>
            </tbody>
          </table>
        </div>{" "}
        {(order.status === "PENDING" || order.status === "CONFIRMED") && (
          <>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:cursor-pointer
                      hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Hủy đơn hàng
              </button>
            </div>

            {showCancelModal && (
              <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4">
                    Xác nhận hủy đơn hàng
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Bạn có chắc chắn muốn hủy đơn hàng này không?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowCancelModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:cursor-pointer
                              hover:bg-gray-400 transition duration-300"
                    >
                      Không
                    </button>
                    <button
                      onClick={handleCancelOrder}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:cursor-pointer
                            hover:bg-red-600 transition duration-300"
                    >
                      Xác nhận hủy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserSelectedOrder;
