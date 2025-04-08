import { useEffect } from "react";

const UserSupport = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-39/48">
      <h2 className="text-xl font-semibold px-4 py-[22px]">
        Trung tâm hỗ trợ khách hàng
      </h2>
      <div className="bg-white p-4 mx-4 rounded-md">
        <div className="font-medium mb-2">Chăm sóc khách hàng</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg items-center flex flex-col justify-center">
            <p className="text-lg font-semibold">Hotline</p>
            <div className="h-10 my-2 px-4 font-bold text-2xl rounded-lg">
              1900-6035
            </div>
            <p className="text-sm text-gray-500">
              1000 đ/phút, 8h-21h kể cả T7, CN
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">Gặp Trợ lý cá nhân</p>
            <button
              className="h-10 my-2 hover:cursor-pointer
            px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Chat ngay
            </button>
            <p className="text-sm text-gray-500">8h-21h kể cả T7, CN</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">Gửi yêu cầu hỗ trợ</p>
            <button
              className="h-10 my-2 hover:cursor-pointer
            px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tạo đơn yêu cầu
            </button>
            <p className="text-sm text-gray-500">Hoặc email đến hotro@CAB.vn</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Đơn hàng và thanh toán",
              desc: "Cách tra cứu đơn hàng, sử dụng mã giảm giá...",
            },
            {
              title: "Tài khoản của tôi",
              desc: "Cách đăng ký tài khoản tại CAB...",
            },
            {
              title: "Đơn hàng và vận chuyển",
              desc: "Chính sách đổi trả, cách kích hoạt bảo hành...",
            },

            {
              title: "Đổi trả, bảo hành và hoàn tiền",
              desc: "Chính sách đổi trả, cách kích hoạt bảo hành...",
            },
            {
              title: "Dịch vụ và chương trình",
              desc: "Chính sách của các dịch vụ và chương trình...",
            },
            {
              title: "Thông tin về CAB",
              desc: "Quy chế hoạt động và chính sách của sàn thương mại...",
            },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                Xem chi tiết &gt;
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSupport;
