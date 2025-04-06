import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getOrderById, updateOrderStatus } from "../services/OrderServices";
import { truncateDate } from "../services/CommonServices";

// Add this component inside AdminOrderDetail but before the return statement
const StatusUpdatePopup = ({ isOpen, onClose, currentStatus, onUpdate }) => {
  const [status, setStatus] = useState(currentStatus);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">
          Cập nhật trạng thái đơn hàng
        </h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="PENDING">Đang chờ xử lý</option>
          <option value="CONFIRMED">Đang xử lý</option>
          <option value="DELIVERED">Đã giao hàng</option>
          <option value="COMPLETED">Đã hoàn thành</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition duration-200"
          >
            Hủy
          </button>
          <button
            onClick={() => onUpdate(status)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

// Update the main component
const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "");

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      const response = await getOrderById(id);
      setOrder(response);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await getOrderById(id);
        setOrder(response);
        setAddress(response.shippingAddress);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full flex justify-center items-center p-6">
        <p className="text-red-500">Không tìm thấy đơn hàng.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/admin-orders")} // Navigate back to orders list
        className="mb-4 px-4 py-2 hover:cursor-pointer
        bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Quay lại
      </button>
      <StatusUpdatePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        currentStatus={order?.status}
        onUpdate={handleStatusUpdate}
      />

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold bg-[#75d535] rounded px-2 py-1 w-fit">
          Chi tiết đơn hàng #{id}
        </h2>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-sm
         hover:bg-green-600 transition duration-300 ease-in-out hover:cursor-pointer
          flex items-center gap-2 font-medium hover:shadow-md"
          onClick={() => setIsPopupOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Cập nhật trạng thái
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Order Information */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
            <p>
              <span className="text-gray-500">Tên:</span> {address.name}
            </p>
            <p>
              <span className="text-gray-500">Địa chỉ:</span> {address.district}
              , {address.city}
            </p>
            <p>
              <span className="text-gray-500">Số điện thoại:</span>{" "}
              {address.phoneNumber}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
            <p>
              <span className="text-gray-500">Ngày đặt:</span>{" "}
              {truncateDate(order.createdAt, 2)}
            </p>
            <p>
              <span className="text-gray-500">Tổng tiền:</span>{" "}
              {order.totalPrice?.toLocaleString("vi-VN")}₫
            </p>
            <p>
              <span className="text-gray-500">Trạng thái:</span>{" "}
              <span
                className={`${
                  order.status === "COMPLETED"
                    ? "text-green-500"
                    : order.status === "PENDING"
                    ? "text-yellow-500"
                    : order.status === "CONFIRMED"
                    ? "text-blue-500"
                    : order.status === "CANCELLED"
                    ? "text-red-500"
                    : order.status === "DELIVERED"
                    ? "text-purple-500"
                    : ""
                }`}
              >
                {order.status === "COMPLETED" && "Đã hoàn thành"}
                {order.status === "CANCELLED" && "Đã hủy"}
                {order.status === "PENDING" && "Đang chờ xử lý"}
                {order.status === "CONFIRMED" && "Đang xử lý"}
                {order.status === "DELIVERED" && "Đã giao hàng"}
              </span>
            </p>
          </div>
        </div>

        {/* Order Items */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">
                Số lượng
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">
                Giá
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.orderItems?.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={item.book?.bookImageURL}
                      alt={item.book?.bookTitle}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium">{item.book?.bookTitle}</p>
                      <p className="text-sm text-gray-500">
                        Nhà xuất bản: {item.book?.publisher}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{item.quantity}</td>
                <td className="px-6 py-4 text-center">
                  {item.book?.bookFinalPrice?.toLocaleString("vi-VN")}₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
