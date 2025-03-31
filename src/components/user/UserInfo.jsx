import { useContext, useState } from "react";
// import { getAllArticlesByUserId, getUsersById } from "../services/UserSevices";
// import UserUpdate from "../components/update/UserUpdate";
// import { handleDelete } from "../services/ArticleServices";
// import { LuPencilLine } from "react-icons/lu";
// import { GoTrash } from "react-icons/go";
// import ArticleUpdate from "../components/update/ArticleUpdate";
// import { truncateText } from "../services/CommonServices";
// import AddArticle from "../components/addForm/AddAritcle";
import ava from "../../assets/ava.png"; // Thay bằng ảnh đại diện thực tế
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
// import { FaBell } from "react-icons/fa";
// import { RiFileList2Fill } from "react-icons/ri";
// import { IoNewspaper } from "react-icons/io5";
// import { PiAddressBookFill } from "react-icons/pi";
// import { FaUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const UserInfo = () => {
  const context = useContext(AppContext);

  // const [user, setUser] = useState({});

  const navigate = useNavigate();

  const parsedUser = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState("Lê Minh Khánh");
  const [nickname, setNickname] = useState("khanh-131");
  const [dob, setDob] = useState({ day: "13", month: "10", year: "2004" });
  const [gender, setGender] = useState("Nam");
  const [country, setCountry] = useState("Việt Nam");

  return (
    <div className="w-39/48">
      <h2 className="text-xl font-semibold px-4 py-[22px]">
        Thông tin tài khoản
      </h2>
      <div className="flex w-full bg-white p-4 mx-4 rounded-lg shadow-md">
        <div className=" THONG-TIN-TAI-KHOAN bg-white  flex flex-row w-full">
          <div className="THONG-TIN-CA-NHAN pr-5 border-r-2 border-gray-400 w-15/27">
            <div className="mb-3 text-gray-500">Thông tin cá nhân</div>
            <div className="ANH+TEN flex items-center justify-between space-x-4 w-full">
              <img
                src={context.user?.avatar || ava}
                alt="Avatar"
                className="w-30 h-30 rounded-full border-2 border-gray-300"
              />
              <div className="TEN-NICKNAME flex flex-col w-full">
                <div className="flex items-center space-x-2 ">
                  <label className="block font-medium w-1/4">Họ và Tên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded border-gray-300 w-3/4"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <label className="block font-medium w-1/4">Nickname</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="border p-2 rounded border-gray-300 w-3/4"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Ngày sinh</label>
                <div className="flex space-x-2">
                  <select className="border rounded p-2 w-full">
                    <option>13</option>
                  </select>
                  <select className="border rounded p-2 w-full">
                    <option>10</option>
                  </select>
                  <select className="border rounded p-2 w-full">
                    <option>2004</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-600">Giới tính</label>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      className="mr-1"
                      checked
                    />{" "}
                    Nam
                  </label>
                  <label>
                    <input type="radio" name="gender" className="mr-1" /> Nữ
                  </label>
                  <label>
                    <input type="radio" name="gender" className="mr-1" /> Khác
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-600">Quốc tịch</label>
                <select className="border rounded p-2 w-full">
                  <option>Việt Nam</option>
                </select>
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:cursor-pointer duration-300
                text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Lưu thay đổi
            </button>
          </div>
          <div className="SDT-EMAIL w-12/27 pl-5">
            <div className=" bg-white py-2">
              <h3 className="text-lg text-gray-500 mb-4">
                Số điện thoại và Email
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                  <div className="flex flex-row items-center space-x-3">
                    <FiPhone className="text-gray-600 text-2xl " />
                    <div className="flex  flex-col space-x-2">
                      <span className=""> Số điện thoại</span>
                      <span className=""> 9034563488</span>
                    </div>
                  </div>
                  <button className=" px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    Cập nhật
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-row items-center space-x-3">
                    <HiOutlineMail className="text-gray-600 text-2xl " />
                    <div className="flex  flex-col space-x-2">
                      <span className=""> Địa chỉ Email</span>
                      <span className="text-gray-600"> Thêm địa chỉ Email</span>
                    </div>
                  </div>
                  <button className=" px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>

            <div className=" bg-white py-2">
              <h3 className="text-lg text-gray-500 mb-4">Bảo mật</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                  <span className="text-gray-600">🔒 Đổi mật khẩu</span>
                  <button className=" px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    Cập nhật
                  </button>
                </div>
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                  <span className="text-gray-600">🔐 Thiết lập mã PIN</span>
                  <button className=" px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    Thiết lập
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-500">🗑 Yêu cầu xóa tài khoản</span>
                  <button className=" px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer">
                    Yêu cầu
                  </button>
                </div>
              </div>
            </div>

            <div className=" bg-white py-2">
              <h3 className="text-lg text-gray-500 mb-4">
                Liên kết mạng xã hội
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                  <span className="text-gray-600">📘 Facebook</span>
                  <button className=" px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    Liên kết
                  </button>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-gray-600">🌍 Google</span>
                  <button className=" px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    Liên kết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
