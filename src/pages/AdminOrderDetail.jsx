import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import PropTypes from "prop-types";
import {
  deleteOrderById,
  getOrderById,
  updateOrderStatus,
} from "../services/OrderServices";
import {
  getPaymentById,
  updatePaymentStatus,
} from "../services/PaymentServices";
import toast from "react-hot-toast";

// Add this component inside AdminOrderDetail but before the return statement
const OrderStatusUpdatePopup = ({
  isOpen,
  onClose,
  currentOrderStatus,
  onUpdate,
}) => {
  const [status, setStatus] = useState(currentOrderStatus);

  // Đồng bộ giá trị status khi currentOrderStatus thay đổi
  useEffect(() => {
    if (isOpen) {
      setStatus(currentOrderStatus); // Đồng bộ giá trị khi popup mở
    }
  }, [currentOrderStatus, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 hover:cursor-pointer
           right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">
          Cập nhật trạng thái đơn hàng
        </h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none "
        >
          <option value="PENDING">Đang chờ xử lý</option>
          <option value="CONFIRMED">Được chấp nhận</option>
          <option value="DELIVERING">Đang giao hàng</option>
          <option value="DELIVERED">Đã giao hàng</option>
          <option value="COMPLETED">Đã hoàn thành</option>
          <option value="RETURNED">Đã trả lại</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:cursor-pointer 
            hover:bg-gray-100 rounded-md transition duration-200"
          >
            Hủy
          </button>
          <button
            onClick={() => onUpdate(status)}
            className="px-4 py-2 bg-blue-500 hover:cursor-pointer 
            text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

OrderStatusUpdatePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentOrderStatus: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const PaymentStatusUpdatePopup = ({
  isOpen,
  onClose,
  currentPaymentStatus,
  onUpdate,
}) => {
  const [status, setStatus] = useState(currentPaymentStatus);

  // Đồng bộ giá trị status khi currentPaymentStatus thay đổi
  useEffect(() => {
    if (isOpen) {
      setStatus(currentPaymentStatus); // Đồng bộ giá trị khi popup mở
    }
  }, [currentPaymentStatus, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 hover:cursor-pointer
           right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">
          Cập nhật trạng thái thanh toán
        </h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none"
        >
          <option value="PENDING">Đang chờ xử lý</option>
          <option value="COMPLETED">Đã thanh toán</option>
          <option value="FAILED">Thanh toán thất bại</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:cursor-pointer 
            hover:bg-gray-100 rounded-md transition duration-200"
          >
            Hủy
          </button>
          <button
            onClick={() => onUpdate(status)}
            className="px-4 py-2 bg-blue-500 hover:cursor-pointer 
            text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

PaymentStatusUpdatePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentPaymentStatus: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [paymentId, setPaymentId] = useState(null);
  const [payment, setPayment] = useState(null);

  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  // const [selectedStatus, setSelectedStatus] = useState(order?.status || "");

  const handleOrderStatusUpdate = async (newStatus) => {
    try {
      // Kiểm tra nếu trạng thái mới là COMPLETED nhưng thanh toán chưa hoàn tất
      if (newStatus === "COMPLETED" && payment?.status !== "COMPLETED") {
        toast.error(
          "Không thể đặt trạng thái 'Hoàn thành' khi thanh toán chưa hoàn tất."
        );
        return;
      }

      // Gọi API để cập nhật trạng thái đơn hàng
      await updateOrderStatus(id, newStatus);

      // Lấy lại thông tin đơn hàng sau khi cập nhật
      const updatedOrder = await getOrderById(id);
      setOrder(updatedOrder);

      // Đóng popup
      setIsOrderPopupOpen(false);
      // toast.success("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(
        "Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại sau."
      );
    }
  };

  const handlePaymentStatusUpdate = async (newStatus) => {
    try {
      // Gọi API để cập nhật trạng thái thanh toán
      await updatePaymentStatus(payment.id, newStatus);

      // Lấy lại thông tin thanh toán sau khi cập nhật
      const updatedPayment = await getPaymentById(payment.id);
      setPayment(updatedPayment);

      // Đóng popup
      setIsPaymentPopupOpen(false);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const handleDeleteOrder = async () => {
    // Chỉ cho phép xóa khi trạng thái là CANCELLED, COMPLETED, hoặc RETURNED
    if (
      order.status !== "CANCELLED" &&
      order.status !== "COMPLETED" &&
      order.status !== "RETURNED"
    ) {
      toast.error(
        "Chỉ có thể xóa đơn hàng đã hủy, đã hoàn thành hoặc đã trả hàng."
      );
      return;
    }

    try {
      // Gọi API để xóa đơn hàng
      await deleteOrderById(order.id);

      // Đóng popup
      setIsDeletePopupOpen(false);

      // Điều hướng về danh sách đơn hàng sau khi xóa
      navigate("/admin/admin-orders");
      toast.success("Đơn hàng đã được xóa thành công!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Không thể xóa đơn hàng. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await getOrderById(id);
        setOrder(response);
        setAddress(response.shippingAddress);
        const payment = await getPaymentById(response.payment.id);
        setPayment(payment);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
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
    <div className="w-full bg-gray-100 p-6 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/admin-orders")} // Navigate back to orders list
        className="mb-4 px-4 py-2 hover:cursor-pointer
        bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
      >
        Quay lại
      </button>
      <OrderStatusUpdatePopup
        isOpen={isOrderPopupOpen}
        onClose={() => setIsOrderPopupOpen(false)}
        currentOrderStatus={order?.status} // Đảm bảo truyền đúng prop
        onUpdate={handleOrderStatusUpdate}
      />
      <PaymentStatusUpdatePopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        currentPaymentStatus={payment?.status} // Truyền trạng thái hiện tại
        onUpdate={handlePaymentStatusUpdate}
      />

      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-xl font-semibold flex items-center gap-2
          bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
          px-4 py-2 shadow-md w-fit hover:shadow-lg transition-shadow duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Chi tiết đơn hàng #{id}
        </h2>
        <button
          className={`px-4 py-2 rounded-sm flex items-center gap-2 font-medium hover:shadow-md transition duration-300 ease-in-out ${
            order.status === "CANCELLED" ||
            order.status === "COMPLETED" ||
            order.status === "RETURNED"
              ? "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => {
            if (
              order.status === "CANCELLED" ||
              order.status === "COMPLETED" ||
              order.status === "RETURNED"
            ) {
              setIsDeletePopupOpen(true);
            }
          }}
          disabled={
            order.status !== "CANCELLED" &&
            order.status !== "COMPLETED" &&
            order.status !== "RETURNED"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm3 3a1 1 0 112 0v1h-2V5zm-3 3a1 1 0 011-1h8a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 000 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          {order.status !== "CANCELLED" &&
          order.status !== "COMPLETED" &&
          order.status !== "RETURNED"
            ? "Không thể xóa"
            : "Xóa đơn hàng"}
        </button>
        {isDeletePopupOpen && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                Xác nhận xóa đơn hàng
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa đơn hàng này không? Hành động này
                không thể hoàn tác.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeletePopupOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:cursor-pointer
                   hover:bg-gray-400 transition duration-300"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteOrder}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:cursor-pointer
                   hover:bg-red-600 transition duration-300"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <div className=" flex gap-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-sm
         hover:bg-green-600 transition duration-300 ease-in-out hover:cursor-pointer
          flex items-center gap-2 font-medium hover:shadow-md"
            onClick={() => setIsOrderPopupOpen(true)}
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
            Cập nhật trạng thái đơn hàng
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-sm
         hover:bg-green-600 transition duration-300 ease-in-out hover:cursor-pointer
          flex items-center gap-2 font-medium hover:shadow-md"
            onClick={() => setIsPaymentPopupOpen(true)}
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
            Cập nhật trạng thái thanh toán
          </button>
        </div> */}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Order Information */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="THONG_TIN_KHACH_HANG">
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
          <div className="THONG_TIN_DON_HANG relative">
            <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
            <p>
              <span className="text-gray-500">Ngày đặt:</span> {order.createdAt}
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
                    : order.status === "DELIVERING"
                    ? "text-orange-500"
                    : order.status === "RETURNED"
                    ? "text-gray-700"
                    : ""
                }`}
              >
                {order.status === "COMPLETED" && "Đã hoàn thành"}
                {order.status === "CANCELLED" && "Đã hủy"}
                {order.status === "PENDING" && "Đang chờ xử lý"}
                {order.status === "CONFIRMED" && "Được chấp nhận"}
                {order.status === "DELIVERED" && "Đã giao hàng"}
                {order.status === "DELIVERING" && "Đang giao hàng"}
                {order.status === "RETURNED" && "Đã trả lại"}
              </span>
            </p>
            <button
              className="p-2 bg-white text-black border border-black absolute bottom-0 right-0
              hover:bg-black hover:text-white rounded-full transition duration-300 ease-in-out hover:cursor-pointer
                flex items-center gap-2 font-medium hover:shadow-md"
              onClick={() => setIsOrderPopupOpen(true)}
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
            </button>
          </div>
          <div className="THONG_TIN_THANH_TOAN relative">
            <h3 className="font-semibold mb-2">Thông tin thanh toán</h3>
            <p>
              <span className="text-gray-500">Ngày thanh toán:</span>{" "}
              {payment.createdAt}
            </p>
            <p>
              <span className="text-gray-500">Phương thức:</span>{" "}
              {payment.method === "COD" && "Thanh toán khi nhận hàng"}
              {payment.method === "VNPAY" && "Thanh toán qua VNPAY"}
            </p>
            <p>
              <span className="text-gray-500">Trạng thái:</span>{" "}
              <span
                className={`${
                  payment.status === "COMPLETED"
                    ? "text-green-500"
                    : payment.status === "PENDING"
                    ? "text-yellow-500"
                    : payment.status === "FAILED"
                    ? "text-red-500"
                    : ""
                }`}
              >
                {payment.status === "COMPLETED" && "Đã thanh toán"}
                {payment.status === "PENDING" && "Đang chờ xử lý"}
                {payment.status === "FAILED" && "Thanh toán thất bại"}
              </span>
            </p>
            <button
              className="p-2 bg-white text-black border border-black absolute bottom-0 right-0
             hover:bg-black hover:text-white rounded-full transition duration-300 ease-in-out hover:cursor-pointer
              flex items-center gap-2 font-medium hover:shadow-md"
              onClick={() => setIsPaymentPopupOpen(true)}
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
            </button>
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
                        Nhà xuất bản: Cook A Book
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
