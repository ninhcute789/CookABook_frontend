import { useContext, useEffect, useState } from "react";
import { getAllOrdersByUserId } from "../../services/UserSevices";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { getOrderById, reorderByOrderId } from "../../services/OrderServices";
import { useNavigate } from "react-router";
import { getQuantityOfCartItems } from "../../services/CartServices";

const UserOrder = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [change, setChange] = useState("");
  const size = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrderItems = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!context?.user?.id) return;

      try {
        setLoading(true);
        setError(null);

        const ordersData = await getAllOrdersByUserId(
          context.user.id,
          page,
          size,
          change,
          setTotalPages
        );

        setOrders(ordersData);
        console.log("Danh sách đơn hàng:", ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, change, context?.user?.id, size]);

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
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-semibold  py-[22px]">Đơn hàng của bạn</h2>
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
      <div className="flex flex-col gap-4 px-4">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div key={order.id}>
              <div className=" rounded-lg p-4 shadow-sm bg-white">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Mã đơn #{order.id}</span>
                  <span
                    className={`${
                      order.status === "COMPLETED"
                        ? "bg-green-600 text-[#333]"
                        : order.status === "PENDING"
                        ? "bg-yellow-400 text-[#333]"
                        : order.status === "CONFIRMED"
                        ? "bg-blue-600 text-white"
                        : order.status === "CANCELLED"
                        ? "bg-red-600 text-white"
                        : order.status === "DELIVERED"
                        ? "bg-orange-600 text-white"
                        : ""
                    } bg-amber-400 px-2 rounded-md  text-sm font-semibold flex items-center`}
                  >
                    {order.status === "COMPLETED" && "Đã giao hàng"}
                    {order.status === "PENDING" && "Đang xử lý"}
                    {order.status === "CANCELLED" && "Đã hủy"}
                    {order.status === "CONFIRMED" && "Đã xác nhận"}
                    {order.status === "DELIVERED" && "Đã giao hàng"}
                  </span>
                </div>
                {order.orderItems?.length > 0 ? (
                  <div className=" gap-4">
                    <hr className="border-0.5 text-gray-200" />
                    {(expandedOrders[order.id]
                      ? order.orderItems
                      : order.orderItems.slice(0, 2)
                    ).map((item) => (
                      <div
                        key={item.id}
                        className="flex  gap-2 border-b-1 border-gray-200 py-2"
                      >
                        {" "}
                        <div className="relative w-fit ">
                          <img
                            src={item.book?.bookImageURL}
                            alt={item.book?.title}
                            className="w-22 h-22 object-cover rounded border-1 border-gray-300"
                          />
                          <p
                            className="text-sm h-5 w-7 text-center
                        text-gray-700 bottom-0 right-0 absolute bg-gray-300 px-1 rounded-tl rounded-br "
                          >
                            x{item.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {item.book?.bookTitle}
                          </p>
                          <p className="text-sm text-gray-500">
                            Nhà sách CookABook
                          </p>
                        </div>
                        <div className="ml-auto">
                          <p className="font-semibold">
                            {item.book?.bookFinalPrice?.toLocaleString("vi-VN")}
                            ₫
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Không có sản phẩm nào</p>
                )}

                <div className="text-sm">
                  {order.totalQuantity > 2 && (
                    <button
                      onClick={() => toggleOrderItems(order.id)}
                      className="text-gray-500 hover:cursor-pointer border border-gray-500 rounded-md px-2 py-1
                       hover:text-gray-700 duration-300 my-2 hover:shadow-md "
                    >
                      {expandedOrders[order.id]
                        ? "Thu gọn"
                        : `Xem thêm ${order.totalQuantity - 2} sản phẩm`}
                    </button>
                  )}

                  <p>
                    <span className="text-gray-600">Ngày đặt:</span>{" "}
                    {new Date(
                      new Date(order.createdAt).getTime()
                    ).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-right text-xl text-black font-medium">
                    <span className="text-gray-500">Tổng tiền: </span>{" "}
                    {order.totalPrice?.toLocaleString("vi-VN")}₫
                  </p>
                </div>
                <div className="flex justify-end mt-1 text-sm text-gray-500">
                  <button
                    className="px-4 py-1.5 mr-2 rounded-md bg-white text-blue-500 
                    border border-blue-700 duration-300 font-medium text-sm
                    hover:shadow-md active:scale-85 hover:cursor-pointer"
                    onClick={async () => {
                      try {
                        await reorderByOrderId(order.id);

                        context?.setHeaderQuantity(
                          await getQuantityOfCartItems(user.cartId)
                        );

                        toast.success(`Đơn hàng đã được mua lại: ${order.id}`);

                        setTimeout(() => {
                          navigate("/gio-hang");
                        }, 100);
                      } catch (error) {
                        console.error("Lỗi khi mua lại:", error);
                        toast.error("Có lỗi xảy ra khi mua lại đơn hàng");
                      }
                    }}
                  >
                    Mua lại
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-md bg-white text-blue-500 
                   border border-blue-700 duration-300 font-medium text-sm
                     hover:shadow-md active:scale-85 hover:cursor-pointer"
                    onClick={() => {
                      toast.success(`Chi tiết đơn hàng: ${order.id}`);
                      const fetch = async () => {
                        await getOrderById(order.id);
                      };
                      fetch();
                      setTimeout(() => {
                        navigate(`/thong-tin-tai-khoan/don-hang/${order.id}`);
                      }, 100); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
        )}
        {/* Phân trang */}
        {orders?.length > 0 && (
          <div className="flex justify-center mb-4 space-x-2">
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
              }}
              className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
              }`}
              disabled={page === 1}
            >
              Trước
            </button>

            <span className="px-4 py-2 rounded-lg shadow-md">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages));
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 0); // Delay nhỏ để đảm bảo React đã cập nhật UI trước khi cuộn
              }}
              className={`px-4 py-2 rounded-lg shadow-md shadow-gray-400 ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-300 duration-300 hover:cursor-pointer"
              }`}
              disabled={page === totalPages}
            >
              Tiếp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
