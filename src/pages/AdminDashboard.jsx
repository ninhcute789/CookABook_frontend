import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiBook, FiShoppingBag, FiUsers, FiDollarSign } from "react-icons/fi";
import { getTopBooks, getTotalBookQuantity } from "../services/BookServices";
import { getAllOrders, getTotalOrderQuantity } from "../services/OrderServices";
import { getTotalUserQuantity } from "../services/UserSevices";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  const [totalBooks, setTotalBooks] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  // const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      await getTotalBookQuantity(setTotalBooks);
      await getTotalOrderQuantity(setTotalOrders);
      await getTotalUserQuantity(setTotalUsers);
      // await getTotalRevenue(setTotalRevenue);
      const orders = await getAllOrders(0, 5, "DESC", "");
      setRecentOrders(orders.data);
      await getTopBooks(0, 5, setTopBooks);
    };

    fetchStatistics();
  }, []);

  // Add appropriate fetch calls in useEffect

  return (
    <div className="py-8 bg-gray-50 min-h-screen w-full">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tổng quan</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 bg-opacity-50">
                <FiBook className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Tổng số sách
                </h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalBooks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 bg-opacity-50">
                <FiShoppingBag className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Tổng đơn hàng
                </h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 bg-opacity-50">
                <FiUsers className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Người dùng
                </h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 bg-opacity-50">
                <FiDollarSign className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Doanh thu</h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {statistics.totalRevenue?.toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm h-fit">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Đơn hàng gần đây
                </h2>
                <Link
                  to="/admin/admin-orders"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
            <div className="p-6 pt-1">
              <div className="">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Mã đơn
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Ngày đặt
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Tổng tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                          {order.createdAt}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "CONFIRMED"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "DELIVERED"
                                ? "bg-purple-100 text-purple-800"
                                : order.status === "CANCELLED"
                                ? "bg-red-100 text-red-800"
                                : ""
                            }`}
                          >
                            {order.status === "COMPLETED" && "Đã hoàn thành"}
                            {order.status === "PENDING" && "Đang chờ xử lý"}
                            {order.status === "CONFIRMED" && "Đang xử lý"}
                            {order.status === "DELIVERED" && "Đã giao hàng"}
                            {order.status === "CANCELLED" && "Đã hủy"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {order.totalPrice?.toLocaleString("vi-VN")}₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Selling Books */}
          <div className="bg-white rounded-lg shadow-sm h-fit">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sách bán chạy
                </h2>
                <Link
                  to="/admin/admin-books"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
            <div className="p-6 pt-1">
              <div className="">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Sách
                      </th>
                      {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Đã bán
                      </th> */}
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Giá
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={book.imageURL}
                              alt={book.tilte}
                              className="h-10 w-10 rounded-sm object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {book.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {book.author}
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {book.soldCount}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900 text-right">
                          <div className="flex flex-col items-end">
                            <p className="text-green-600">
                              {book.finalPrice?.toLocaleString("vi-VN")}₫
                            </p>
                            <p className="line-through text-sm">
                              <span className="text-red-600">
                                {book.originalPrice?.toLocaleString("vi-VN")}₫
                              </span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
