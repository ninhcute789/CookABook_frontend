import { useEffect, useState } from "react";
import { getAllOrders, getOrderById } from "../services/OrderServices";
import { truncateDate } from "../services/CommonServices";
import { useNavigate } from "react-router";
import { getPaymentById } from "../services/PaymentServices";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [change, setChange] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");

  const size = 10;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(page, size, change, status); // Get all orders at once
        setOrders(response.data);
        setTotalPages(response.meta.totalPages); // Set total pages from response
        const payment = await getOrderById(response.id); // Get payment by ID
        // console.log("255555555555:", response.data);
        setPayment(payment);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [page, size, change, status]);

  return (
    <div className="w-full bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý đơn hàng</h2>
        <div className="SORT+FILTER flex gap-4">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1); // Reset to page 1 when status changes
            }}
            className=" border-gray-300 appearance-none focus:outline-none
              duration-300 ease-in-out border text-gray-500 bg-white
              rounded-full px-5 py-2 shadow-sm outline-none"
          >
            <option value="" className="hidden bg-gray-400">
              Lọc theo trạng thái
            </option>
            <option value="CANCELLED">Đã hủy</option>
            <option value="PENDING">Đang chờ xử lý</option>
            <option value="CONFIRMED">Đang xử lý</option>
            <option value="COMPLETED">Đã hoàn thành</option>
            <option value="DELIVERED">Đã giao hàng</option>
            <option value="">Tất cả</option>
          </select>
          <select
            value={change}
            onChange={(e) => setChange(e.target.value)}
            className=" border-gray-300 appearance-none focus:outline-none
              duration-300 ease-in-out border text-gray-500 bg-white
              rounded-full px-5 py-2 shadow-sm outline-none"
          >
            <option value="" className="hidden bg-gray-400">
              Sắp xếp theo thời gian
            </option>
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                Mã đơn
              </th>
              {/* <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                Khách hàng
              </th> */}
              <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                Trạng thái đơn hàng
              </th>
              {/* <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                Trạng thái thanh toán
              </th> */}
              <th className="px-6 py-3 text-sm font-medium text-gray-500 text-center">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-center">#{order.id}</td>
                {/* <td className="px-6 py-4 text-sm text-center">
                  {order.user?.name}
                </td> */}
                <td className="px-6 py-4 text-sm text-center">
                  {truncateDate(order.createdAt, 2)}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {order.totalPrice?.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "COMPLETED"
                        ? "text-green-800 bg-green-100"
                        : order.status === "PENDING"
                        ? "text-yellow-800 bg-yellow-100"
                        : order.status === "CONFIRMED"
                        ? "text-blue-800 bg-blue-100"
                        : order.status === "CANCELLED"
                        ? "text-red-800 bg-red-100"
                        : order.status === "DELIVERED"
                        ? "text-purple-800 bg-purple-100"
                        : ""
                    }`}
                  >
                    {order.status === "COMPLETED" && "Đã hoàn thành"}
                    {order.status === "CANCELLED" && "Đã hủy"}
                    {order.status === "PENDING" && "Đang chờ xử lý"}
                    {order.status === "CONFIRMED" && "Đang xử lý"}
                    {order.status === "DELIVERED" && "Đã giao hàng"}
                  </span>
                </td>
                {/* <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      payment?.status === "COMPLETED"
                        ? "text-green-800 bg-green-100"
                        : payment?.status === "PENDING"
                        ? "text-yellow-800 bg-yellow-100"
                        : payment?.status === "FAILED"
                        ? "text-red-800 bg-red-100"
                        : ""
                    }`}
                  >
                    {payment?.status === "COMPLETED" && "Đã thanh toán"}
                    {payment?.status === "PENDING" && "Đang chờ xử lý"}
                    {payment?.status === "FAILED" && "Thanh toán thất bại"}
                  </span>
                </td> */}
                <td className="px-6 py-4 text-sm text-center">
                  <button
                    className="text-blue-600 hover:text-blue-900 hover:cursor-pointer"
                    onClick={() => {
                      navigate(`/admin/admin-orders/${order.id}`);
                    }}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length > 0 ? (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
            }`}
          >
            Trước
          </button>
          <span className="px-4 py-2 bg-white rounded">
            {page} / {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${
              page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
            }`}
          >
            Tiếp
          </button>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          Không tìm thấy đơn hàng nào
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
