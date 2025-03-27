import { useState } from "react";

const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
  });

  const addresses = [
    {
      id: 1,
      name: "Lê Minh Khánh",
      phone: "0394517504",
      city: "Hà Nội",
      district: "Hoàng Mai",
      ward: "Phường Hoàng Văn Thụ",
      address: "22 Kim Ngưu, Hoàng Mai",
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      phone: "0987654321",
      city: "Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
      address: "52 Nguyễn Huệ, Quận 1",
    },
    {
      id: 3,
      name: "Trần Thị B",
      phone: "0912345678",
      city: "Đà Nẵng",
      district: "Hải Châu",
      ward: "Phường Hòa Cường",
      address: "10 Bạch Đằng, Hải Châu",
    },
    {
      id: 4,
      name: "Phạm Văn C",
      phone: "0321654987",
      city: "Hải Phòng",
      district: "Ngô Quyền",
      ward: "Phường Máy Tơ",
      address: "30 Lê Lợi, Ngô Quyền",
    },
  ];

  const handleCancel = () => {
    setAnimateForm(false);
    setTimeout(() => setShowForm(false), 1000); // Delay để hiệu ứng chạy mượt hơn
  };

  const handleEdit = (addr) => {
    setSelectedAddress(addr);
    setFormData(addr); // Cập nhật form với dữ liệu mới
    setShowForm(true);
  };

  return (
    <div className="p-4 rounded-lg w-7/12 mx-auto my-5">
      <h2 className="text-2xl font-semibold">Địa chỉ giao hàng</h2>
      <div className="my-3">Chọn địa chỉ giao hàng có sẵn bên dưới:</div>
      <div className="grid grid-cols-2">
        {addresses.map((ad, index) => (
          <div
            key={index}
            className="p-4 mt-2 rounded-md bg-gray-100 mr-2 border border-gray-200"
          >
            <p className="font-semibold">{ad.name}</p>
            <p>
              Địa chỉ: {ad.address}, {ad.ward}, {ad.district}, {ad.city}
            </p>
            <p>Điện thoại: {ad.phone}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 duration-300
                 text-white px-3 py-1 rounded hover:cursor-pointer"
                onClick={() => {
                  setShowForm(true);
                  setAnimateForm(true);
                  scrollTo({ top: 370, behavior: "smooth" });
                  handleEdit(ad);
                }}
              >
                Sửa
              </button>
            </div>
          </div>
        ))}
      </div>
      {addresses.length < 4 && (
        <div className="mt-3">
          Bạn muốn giao hàng đến địa chỉ khác?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => {
              setShowForm(true);
              setAnimateForm(true);
              scrollTo({ top: 370, behavior: "smooth" });
            }}
          >
            Thêm địa chỉ giao hàng mới
          </span>{" "}
        </div>
      )}

      <div
        className={`overflow-hidden duration-1000 mr-2 ${
          animateForm ? "h-105 fade-in" : "h-0 fade-out"
        }`}
      >
        {showForm && (
          <div className="mt-4 border border-[#f5b4b4] p-4 rounded-md font-medium bg-[#fffaf5]">
            <div className="flex w-15/24 mx-auto items-center">
              <label className="w-1/2">Họ tên</label>
              <input
                className="w-full border border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex w-15/24 mx-auto items-center">
              <label className="w-1/2">Điện thoại di động</label>
              <input
                className="w-full border border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex w-15/24 mx-auto items-center">
              <label className="w-1/2">Tỉnh/Thành phố</label>
              <input
                className="w-full border border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
            <div className="flex w-15/24 mx-auto items-center">
              <label className="w-1/2">Quận/Huyện</label>
              <input
                className="w-full border border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
              />
            </div>
            <div className="flex w-15/24 mx-auto items-center">
              <label className="w-1/2">Phường/Xã</label>
              <input
                className="w-full border border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={formData.ward}
                onChange={(e) =>
                  setFormData({ ...formData, ward: e.target.value })
                }
              />
            </div>
            <div className="flex w-15/24 mx-auto items-center">
              <label className="w-1/2">Địa chỉ</label>
              <input
                className="w-full border border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div className="flex mt-4 w-15/24 mx-auto">
              <button
                className="bg-gray-400 hover:bg-gray-500 duration-300
                 text-white px-4 py-2 rounded hover:cursor-pointer ml-auto mr-2"
                onClick={() => {
                  handleCancel();
                  scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Hủy bỏ
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 duration-300
              text-white px-4 py-2 rounded hover:cursor-pointer"
              >
                Giao đến địa chỉ này
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
