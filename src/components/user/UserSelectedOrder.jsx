import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getOrderById } from "../../services/OrderServices";
import { useNavigate, useParams } from "react-router";

const UserSelectedOrder = () => {
  const context = useContext(AppContext);

  const { id } = useParams(); // Lấy id từ URL

  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);

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
                : ""
            }`}
          >
            {order.status === "COMPLETED" && " Đã hoàn thành"}
            {order.status === "CANCELLED" && "Đã hủy"}
            {order.status === "PENDING" && "Đang chờ xử lý"}
            {order.status === "CONFIRMED" && "Được xác nhận"}
            {order.status === "DELIVERED" && "Đã giao hàng"}
          </div>
        </div>

        <div className="grid xl:grid-cols-3 grid-cols-1 gap-4 mb-4">
          {/* Column 1 */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">ĐỊA CHỈ NGƯỜI NHẬN</h2>
            <div className="bg-white rounded p-4 shadow-sm flex-1">
              <p className="mb-2 font-medium">{address?.name}</p>
              <p className="mb-2">
                Địa chỉ: {address?.address}, {address?.ward},{" "}
                {address?.district}, {address?.city}
              </p>
              <p>Điện thoại: 0394517504</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">HÌNH THỨC GIAO HÀNG</h2>
            <div className="bg-white rounded p-4 shadow-sm flex-1">
              <div className="mb-2">FAST Giao Tiết Kiệm</div>
              <div className="mb-2">Phí vận chuyển: 46.100₫</div>
              <div>
                Giao hàng trước ngày{" "}
                {new Date(
                  new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">HÌNH THỨC THANH TOÁN</h2>
            <div className="bg-white rounded p-4 shadow-sm flex-1">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSelectedOrder;
