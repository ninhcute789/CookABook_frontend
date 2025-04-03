import { use, useContext, useEffect, useState } from "react";
import { getAddressById } from "../services/AddressServices";
import { useNavigate, useParams } from "react-router";
import ic1 from "../assets/iconCASH.png";
import ic2 from "../assets/iconVNP.png";
import { AppContext } from "../context/AppContext";
import { createPayment } from "../services/PaymentServices";

const Payment = () => {
  const context = useContext(AppContext);
  const [address, setAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cash");

  const navigate = useNavigate();

  const paymentMethods = [
    { id: "COD", label: "Thanh toán tiền mặt", img: ic1 },
    // { id: "viettel", label: "Viettel Money" },
    // { id: "momo", label: "Ví Momo" },
    // { id: "zalopay", label: "Ví ZaloPay" },
    {
      id: "VNPAY",
      label: "VNPAY - Quét mã QR từ ứng dụng ngân hàng",
      img: ic2,
    },
    // { id: "credit", label: "Thẻ tín dụng/Ghi nợ" },
  ];

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddressById(context?.idAddress);
      console.log("🏠 Địa chỉ:", address);
      setAddress(address);
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-17/24 mx-auto px-6 pt-6 text-2xl font-semibold">
        Thanh toán
      </div>
      <div className="CONTENT flex w-17/24 gap-4 p-6 mx-auto">
        {/* Chọn phương thức thanh toán */}
        <div className="LEFT bg-white p-4 rounded-lg shadow-md w-17/24 h-fit">
          <h2 className="text-lg font-semibold mb-3">
            Chọn hình thức thanh toán
          </h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={method.id}
                  value={method.value}
                  name="payment"
                  checked={selectedPayment === method.id}
                  onChange={() => setSelectedPayment(method.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                {console.log("🏦 selectedPayment:", selectedPayment)}
                <img
                  src={method.img}
                  alt={method.label}
                  className="w-8 h-8 object-cover "
                />

                <label htmlFor={method.id} className="cursor-pointer">
                  {method.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Tổng hợp đơn hàng */}
        <div className="RIGHT w-7/24 flex flex-col">
          <div className="GiaoHang bg-white rounded-md shadow-lg h-fit mb-2">
            <div className="flex justify-between items-center">
              <div className="text-lg pt-2 ml-5 text-gray-500">Giao hàng</div>
              <div
                className="text-sm pt-2 mr-5 text-blue-500 hover:cursor-pointer "
                onClick={() => navigate("/dia-chi")}
              >
                {" "}
                Thay đổi
              </div>
            </div>
            <div className="flex text-sm mt-2">
              <div className="ml-5 font-medium border-r-1 pr-2 w-fit">
                {address?.name}
              </div>
              <div className="pl-2">{address?.phoneNumber}</div>
            </div>
            <div className="flex w-full text-sm pb-3 mt-2">
              <div className="ml-5 px-1 bg-gray-200 text-green-500 rounded-md w-fit h-fit mr-1">
                Địa chỉ
              </div>
              <div className=" w-8/12">
                {address?.address}, {address?.ward}, {address?.district},{" "}
                {address?.city}
              </div>
            </div>
          </div>
          <div className="DONHANG bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Đơn hàng</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Tổng tiền hàng</span>
                <span>229.000đ</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Giảm giá trực tiếp</span>
                <span>-41.220đ</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-red-500 text-lg">
                <span>Tổng tiền thanh toán</span>
                <span>200.780đ</span>
              </div>
            </div>
            <button
              className="mt-4 w-full bg-red-500 hover:cursor-pointer
             text-white py-2 rounded-lg hover:bg-red-600 duration-300"
              onClick={() => {
                const fetch = async () => {
                  await createPayment(selectedPayment, 200780, context?.userId);
                };
                fetch();
              }}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
