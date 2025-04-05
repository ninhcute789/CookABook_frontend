import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  createNewAddress,
  deleteAddressById,
  getAllAddressesByUserId,
  getDefautAddressByUserId,
  updateAddress,
} from "../services/AddressServices";
import { AppContext } from "../context/AppContext";
import {
  getOrderSession,
  saveAddressToSession,
} from "../services/OrderServices";

const Address = () => {
  const context = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [newForm, setNewForm] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [addresses, setAddresses] = useState([]);

  const [idDefault, setIdDefault] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [address, setAddress] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const userId = user.id;

  useEffect(() => {}, []);

  useEffect(() => {
    const defaultAddress = async () => {
      const address = await getDefautAddressByUserId(userId);
      // console.log("🏠 Địa chỉ:", address.id);
      setIdDefault(address.id);
    };
    defaultAddress();
    getAllAddressesByUserId(userId, setAddresses);
    setTimeout(() => {
      scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [userId]);

  const handleCancel = () => {
    setAnimateForm(false);
    setTimeout(() => setShowForm(false), 500); // Delay để hiệu ứng chạy mượt hơn
  };

  const handleUpdateSuccess = (updatedId, updatedData) => {
    console.log("Địa chỉ đã cập nhật:", updatedId, updatedData);
    setAddresses((prevAddresses) =>
      prevAddresses.map((addr) =>
        addr.id === updatedId
          ? { ...addr, ...updatedData } // Cập nhật địa chỉ đã chỉnh sửa
          : updatedData.defaultAddress // Nếu địa chỉ được đặt mặc định
          ? { ...addr, defaultAddress: false } // Hủy mặc định các địa chỉ còn lại
          : addr
      )
    );
    setIdDefault(updatedId); // Cập nhật id mặc định
    // setId(null); // Reset id sau khi cập nhật

    handleCancel();
    scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (addr) => {
    setName(addr.name);
    setPhoneNumber(addr.phoneNumber);
    setCity(addr.city);
    setDistrict(addr.district);
    setWard(addr.ward);
    setAddress(addr.address);
    setDefaultAddress(addr.defaultAddress);

    setShowForm(true);
  };

  return (
    <div className="p-4 rounded-lg w-18/24 mx-auto my-5">
      <h2 className="text-2xl font-semibold">Địa chỉ giao hàng</h2>
      <div className="my-3">Chọn địa chỉ giao hàng có sẵn bên dưới:</div>
      <div className="grid grid-cols-2">
        {console.log(
          "🚀 ~ file: Address.jsx ~ line 139 ~ Address ~ addresses",
          addresses
        )}
        {addresses?.map((ad, index) => (
          <div
            key={index}
            className={`p-4 mt-2 mr-7 ${
              ad.defaultAddress ? "border-dashed border-green-500" : ""
            }
              rounded-lg bg-white shadow-md border border-gray-200 flex flex-col gap-1`}
          >
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">{ad.name} </p>
              {ad.defaultAddress ? (
                <p className="text-green-500">Mặc định</p>
              ) : null}
            </div>
            <p className="text-gray-600">
              <span className="font-medium line-clamp-1">
                Địa chỉ: {ad?.address}, {ad.ward}, {ad.district}, {ad.city}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Điện thoại:</span> {ad.phoneNumber}
            </p>
            <div className="mt-2 flex justify-end space-x-2">
              <button
                className="bg-gray-600 hover:bg-gray-500 hover:cursor-pointer
                 duration-300 text-white px-3 py-1 rounded-sm shadow-sm mr-auto"
                onClick={() => {
                  const fetch = async () => {
                    context?.setIdAddress(ad.id);
                    await saveAddressToSession(ad.id);
                    await getOrderSession();
                    setTimeout(() => {
                      navigate("/thanh-toan/");
                    }, 100);
                  };
                  fetch();
                }}
              >
                Giao đến đây
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 hover:cursor-pointer
                 duration-300 text-white px-3 py-1 rounded-sm shadow-sm"
                onClick={() => {
                  setShowForm(true);
                  setAnimateForm(true);

                  handleEdit(ad);
                  setNewForm(false);
                  setId(ad.id);
                  if (addresses.length >= 5) {
                    scrollTo({ top: 458, behavior: "smooth" });
                  } else if (addresses.length >= 3) {
                    scrollTo({ top: 280, behavior: "smooth" });
                  } else {
                    scrollTo({ top: 100, behavior: "smooth" });
                  }
                }}
              >
                Sửa
              </button>
              {!ad.defaultAddress ? (
                <button
                  className="bg-gray-400 hover:bg-gray-500 hover:cursor-pointer
                 duration-300 text-white px-3 py-1 rounded-sm shadow-sm"
                  onClick={() => {
                    deleteAddressById(ad.id);
                    setAddresses(addresses.filter((addr) => addr.id !== ad.id));
                    // console.log("Xóa địa chỉ:", ad.id);
                  }}
                >
                  Xóa
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {addresses.length < 6 ? (
        <div className="mt-3">
          Bạn muốn giao hàng đến địa chỉ khác?{null}
          <span
            className="text-blue-500 hover:cursor-pointer ml-2"
            onClick={() => {
              setShowForm(true);
              setAnimateForm(true);
              setNewForm(true);
              if (addresses.length >= 5) {
                scrollTo({ top: 458, behavior: "smooth" });
              } else if (addresses.length >= 3) {
                scrollTo({ top: 280, behavior: "smooth" });
              } else {
                scrollTo({ top: 100, behavior: "smooth" });
              }
              // scrollTo({ top: 378, behavior: "smooth" });
            }}
          >
            Thêm địa chỉ giao hàng mới
          </span>
        </div>
      ) : (
        <div className="mt-3 font-medium text-red-600">
          Bạn đã thêm tối đa số lượng địa chỉ giao hàng.
        </div>
      )}

      <div
        className={`overflow-hidden mr-2 ${
          animateForm ? "h-fit fade-in" : "h-105 fade-out"
        }`}
      >
        {showForm && (
          <form className="mt-4 border border-[#f5b4b4] p-4 rounded-md font-medium bg-[#fffaf5]">
            <div className="flex w-15/24 mx-auto lg:items-center lg:flex-row flex-col">
              <label className="lg:w-1/2">Họ tên</label>
              <input
                className="w-full border focus:outline-none focus:ring-2 focus:ring-[#f5b4b4]
                border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={!newForm ? name : null}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ tên"
              />
            </div>
            <div className="flex w-15/24 mx-auto lg:items-center lg:flex-row flex-col">
              <label className="lg:w-1/2">Điện thoại di động</label>
              <input
                className="w-full border focus:outline-none focus:ring-2 focus:ring-[#f5b4b4]
                border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={!newForm ? phoneNumber : null}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="flex w-15/24 mx-auto lg:items-center lg:flex-row flex-col">
              <label className="lg:w-1/2">Tỉnh/Thành phố</label>
              <input
                className="w-full border focus:outline-none focus:ring-2 focus:ring-[#f5b4b4]
                border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={!newForm ? city : null}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Nhập tỉnh/thành phố"
              />
            </div>
            <div className="flex w-15/24 mx-auto lg:items-center lg:flex-row flex-col">
              <label className="lg:w-1/2">Quận/Huyện</label>
              <input
                className="w-full border focus:outline-none focus:ring-2 focus:ring-[#f5b4b4]
                border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={!newForm ? district : null}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Nhập quận/huyện"
              />
            </div>
            <div className="flex w-15/24 mx-auto lg:items-center lg:flex-row flex-col">
              <label className="lg:w-1/2">Phường/Xã</label>
              <input
                className="w-full border focus:outline-none focus:ring-2 focus:ring-[#f5b4b4]
                border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={!newForm ? ward : null}
                onChange={(e) => setWard(e.target.value)}
                placeholder="Nhập phường/xã"
              />
            </div>
            <div className="flex w-15/24 mx-auto lg:items-center lg:flex-row flex-col">
              <label className="lg:w-1/2">Địa chỉ</label>
              <input
                className="w-full border focus:outline-none focus:ring-2 focus:ring-[#f5b4b4]
                border-[#f5b4b4] p-2 rounded mb-2 bg-white"
                value={!newForm ? address : null}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ví dụ: 23, đường Hoàng Mai"
              />
            </div>
            <div className="flex w-15/24 mx-auto lg:items-center lg:flex-row flex-col">
              <label className="lg:w-1/2"></label>
              <input
                type="checkbox"
                className="w-6 h-6 cursor-pointer overflow-hidden"
                checked={defaultAddress}
                onChange={() => setDefaultAddress(!defaultAddress)}
                disabled={id === idDefault ? true : false}
              />
              <label className="w-full ml-3">Đặt làm địa chỉ mặc định</label>
            </div>
            {/* {console.log("302", id)} */}

            <div className="flex mt-4 w-15/24 mx-auto">
              <button
                className="bg-gray-400 hover:bg-gray-500 duration-300
                 text-white px-4 py-2 rounded hover:cursor-pointer ml-auto mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                  scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Hủy bỏ
              </button>
              {newForm ? (
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    // If this is the first address, set it as default
                    const isFirstAddress = addresses.length === 0;
                    const defaultForFirst = isFirstAddress
                      ? true
                      : defaultAddress;

                    try {
                      await createNewAddress(
                        name,
                        phoneNumber,
                        city,
                        district,
                        ward,
                        address,
                        defaultForFirst, // Use the modified default value
                        userId
                      );

                      setAddresses([
                        ...addresses,
                        {
                          name,
                          phoneNumber,
                          city,
                          district,
                          ward,
                          address,
                          defaultAddress: defaultForFirst, // Use the same modified value
                        },
                      ]);

                      if (isFirstAddress) {
                        setIdDefault(addresses.length + 1); // Update default address ID
                      }

                      handleCancel();
                    } catch (error) {
                      console.error("Error creating address:", error);
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 duration-300
                 text-white px-4 py-2 rounded hover:cursor-pointer"
                >
                  Giao đến địa chỉ này
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    const update = async () => {
                      await updateAddress(
                        id,
                        name,
                        phoneNumber,
                        city,
                        district,
                        ward,
                        address,
                        defaultAddress
                      );
                    };
                    update();
                    handleUpdateSuccess(id, {
                      name,
                      phoneNumber,
                      city,
                      district,
                      ward,
                      address,
                      defaultAddress, // Giá trị mới của mặc định
                    });
                  }}
                  className="bg-red-500 hover:bg-red-600 duration-300
              text-white px-4 py-2 rounded hover:cursor-pointer"
                >
                  Lưu địa chỉ
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Address;
