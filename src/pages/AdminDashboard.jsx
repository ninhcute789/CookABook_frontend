const AdminDashboard = () => {
  return (
    <div className="py-6 bg-gray-100 min-h-screen mx-auto w-full">
      <div className="w-3/4 mx-auto">
        {/* Thẻ thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Tổng số sách", value: 128, color: "bg-blue-500" },
            { title: "Tổng đơn hàng", value: 256, color: "bg-green-500" },
            { title: "Người dùng", value: 98, color: "bg-yellow-500" },
            { title: "Doanh thu", value: "$12,340", color: "bg-red-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} text-white p-6 rounded-lg shadow-md`}
            >
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bảng đơn hàng gần đây */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Đơn hàng gần đây</h2>
          <div className=" rounded-lg overflow-hidden">
            <table className="w-full border-collapse border border-gray-300 ">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Khách hàng</th>
                  <th className="border p-2">Tổng tiền</th>
                  <th className="border p-2">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    user: "Nguyễn Văn A",
                    total: "$50",
                    status: "Hoàn thành",
                  },
                  {
                    id: 2,
                    user: "Trần Thị B",
                    total: "$30",
                    status: "Đang xử lý",
                  },
                  { id: 3, user: "Lê Văn C", total: "$120", status: "Đã hủy" },
                ].map((order, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">{order.user}</td>
                    <td className="border p-2">{order.total}</td>
                    <td className="border p-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bảng sách bán chạy */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sách bán chạy</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Tên sách</th>
                <th className="border p-2">Số lượng đã bán</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 101, name: "Dạy Con Làm Giàu", sold: 50 },
                { id: 102, name: "Bí Mật Tư Duy Triệu Phú", sold: 40 },
                { id: 103, name: "Đắc Nhân Tâm", sold: 30 },
              ].map((book, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{book.id}</td>
                  <td className="border p-2">{book.name}</td>
                  <td className="border p-2">{book.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
