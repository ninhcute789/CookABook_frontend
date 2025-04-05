import { useContext, useEffect, useRef, useState } from "react";
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
// import { useNavigate } from "react-router";
// import { FaBell } from "react-icons/fa";
// import { RiFileList2Fill } from "react-icons/ri";
// import { IoNewspaper } from "react-icons/io5";
// import { PiAddressBookFill } from "react-icons/pi";
// import { FaUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {
  // getAllArticlesByUserId,
  getUsersById,
  handleUpdateUser,
} from "../../services/UserSevices";
import { SlLock } from "react-icons/sl";
import { GoKey } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import ImageUploader from "../common/ImageUpload";

const UserInfo = () => {
  const context = useContext(AppContext);

  // const [user, setUser] = useState({});

  // const navigate = useNavigate();

  // const [editingUserId, setEditingUserId] = useState(null);
  // const [editingArticleId, setEditingArticleId] = useState(null);

  const genders = [
    { label: "Nam", value: "MALE" },
    { label: "Nữ", value: "FEMALE" },
    { label: "Khác", value: "OTHER" },
  ];

  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isUpdateAvatar, setIsUpdateAvatar] = useState(false);
  const popupRef = useRef(null);

  // const parsedUser = JSON.parse(localStorage.getItem("user"));
  // const currentUserId = parsedUser.id;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("❌ Không tìm thấy token!");
  //       return;
  //     }

  //     const res = await axiosInstance.put(
  //       "/users",
  //       {
  //         id: id,
  //         password: password,
  //         name: name,
  //         gender: gender || null,
  //         dob: dob,
  //         email: email,
  //         avatar: avatar,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setAvatar(res.data.data.avatar);
  //     console.log("avatar đã được cập nhật:", res.data.data.avatar);
  //     console.log("✅ Người dùng đã được cập nhật:", res.data);
  //     onUpdate(res.data.data); // Cập nhật danh sách user
  //     onClose();
  //     // alert("🎉 Cập nhật người dùng thành công!");
  //     toast.success("🎉 Cập nhật người dùng thành công!");
  //   } catch (error) {
  //     toast.error(
  //       "❌ Lỗi khi cập nhật người dùng:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const res = await getUsersById(parsedUser.id);
      context.setUser(res);
      // const fetchUserArticles = await getAllArticlesByUserId(parsedUser.id);
      // setArticles(fetchUserArticles.data.data);
      // console.log("👤 Dữ liệu bài báo:", id);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpenAvatar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   // add or remove overflow-y-hidden class to body
  //   if (editingUserId || editingArticleId) {
  //     document.body.classList.add("overflow-y-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-y-hidden");
  //   }
  // }, [editingUserId, editingArticleId]);

  // const handleCloseUser = () => {
  //   setEditingUserId(null);
  // };

  // const handleUpdate = (updatedUser) => {
  //   context.setUser((prev) => {
  //     console.log("🔄 Trước khi cập nhật:", prev);
  //     const updatedUserData = { ...prev, ...updatedUser }; // ✅ Gộp dữ liệu cũ với mới
  //     console.log("✅ Sau khi cập nhật:", updatedUserData);
  //     return updatedUserData;
  //   });
  // };

  // const [user, setUser] = useState({});

  return (
    <div className="w-39/48">
      <h2 className="text-xl font-semibold px-4 py-[22px]">
        Thông tin tài khoản
      </h2>
      <div className="flex w-full bg-white p-4 mx-4 rounded-lg shadow-md">
        <div className=" THONG-TIN-TAI-KHOAN bg-white  flex flex-row w-full">
          <div className="THONG-TIN-CA-NHAN pr-5 border-r-2 border-gray-400 w-15/27">
            <div className="mb-3 text-gray-500">Thông tin cá nhân</div>
            <div className="ANH+TEN flex xl:flex-row flex-col items-center  space-x-4 ">
              <div
                className=" rounded-full hover:cursor-pointer relative"
                ref={popupRef}
                onClick={() => {
                  setIsOpenAvatar(!isOpenAvatar);
                  console.log("isOpenAvatar", isOpenAvatar);
                }}
              >
                <img
                  src={context?.user?.avatar || ava}
                  alt="Avatar"
                  className="w-30 h-30  object-cover rounded-full border-2 border-gray-300"
                />
                {isOpenAvatar && (
                  <div
                    className="absolute shadow-neutral-500
                  left-[50%] -translate-x-[50%] mt-2 w-55 bg-white shadow-md rounded-lg z-50"
                  >
                    <ul className="py-2">
                      {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                        <span className="mr-2">👁️</span> Xem ảnh đại diện
                      </li> */}
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => {
                          setIsOpenAvatar(false);
                          setIsUpdateAvatar(true);
                        }}
                      >
                        <span className="mr-2">📤</span> Cập nhật ảnh đại diện
                      </li>
                      {/* <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-red-500"
                        onClick={() => {
                          const fetchUser = async () => {
                            context?.setUser((prevState) => ({
                              ...prevState,
                              avatar: null,
                            }));
                            // await handleUpdateUser(
                            //   context?.user.id,
                            //   context?.user.password,
                            //   context?.user.name,
                            //   context?.user.gender,
                            //   context?.user.dob,
                            //   context?.user.email,
                            //   context?.user.avatar,
                            //   context?.setUser
                            //   // setEditingUserId
                            // );
                          };
                          fetchUser();
                        }}
                      >
                        <span className="mr-2">🗑️</span> Xóa ảnh đại diện hiện
                        tại
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
              {isUpdateAvatar && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-7/22">
                    <h2 className="text-lg font-semibold mb-4">
                      Đổi ảnh đại diện
                    </h2>
                    <div className="space-y-4 w-full">
                      <ImageUploader
                        onUploadSuccess={(url) =>
                          context?.setUser((prevState) => ({
                            ...prevState,
                            avatar: url,
                          }))
                        }
                      />
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button
                        className="px-4 py-2 duration-300
                        bg-gray-300 rounded hover:cursor-pointer hover:bg-gray-400"
                        onClick={() => setIsUpdateAvatar(false)}
                      >
                        Hủy
                      </button>
                      <button
                        className="px-4 py-2 duration-300
                        bg-blue-500 hover:bg-blue-600 text-white rounded hover:cursor-pointer"
                        onClick={() => {
                          handleUpdateUser(
                            context?.user.id,
                            context?.user.password,
                            context?.user.name,
                            context?.user.gender,
                            context?.user.dob,
                            context?.user.email,
                            context?.user.avatar,
                            context?.setUser
                            // setEditingUserId
                          );
                          setIsUpdateAvatar(false);
                        }}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="TEN-NICKNAME flex flex-col w-full xl:w-3/4">
                <div className="flex flex-col [@media(min-width:1490px)]:flex-row items-center space-x-2 ">
                  <label className="block font-medium [@media(min-width:1490px)]:w-1/4 w-fit">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    value={context?.user?.name}
                    onChange={(e) =>
                      context?.setUser((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    className="border p-2 rounded border-gray-300 w-3/4"
                  />
                </div>
                <div className="flex flex-col [@media(min-width:1490px)]:flex-row items-center space-x-2 mt-2">
                  <label className="block font-medium [@media(min-width:1490px)]:w-1/4 w-fit">
                    Username
                  </label>
                  <input
                    type="text"
                    value={context?.user?.username}
                    disabled
                    onChange={(e) =>
                      context?.setUser((prevState) => ({
                        ...prevState,
                        username: e.target.value,
                      }))
                    }
                    className="border p-2 rounded border-gray-300 w-3/4"
                  />
                </div>
                <div className="flex flex-col [@media(min-width:1490px)]:flex-row items-center space-x-2 mt-2">
                  <label className="block font-medium [@media(min-width:1490px)]:w-1/4 w-fit ">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    className="border p-2 rounded border-gray-300 w-3/4"
                    name="dob"
                    value={context?.user?.dob}
                    onChange={(e) =>
                      context?.setUser((prevState) => ({
                        ...prevState,
                        dob: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col [@media(min-width:1490px)]:flex-row items-center space-x-2 mt-2">
                  <label className="block font-medium [@media(min-width:1490px)]:w-1/4 w-fit">
                    Giới tính
                  </label>
                  <div className="flex items-center space-x-4">
                    {genders.map((gender) => (
                      <label
                        key={gender.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={gender.value}
                          className="mr-1 w-3/4"
                          checked={context?.user?.gender === gender.value}
                          onChange={(e) =>
                            context?.setUser((prevState) => ({
                              ...prevState,
                              gender: e.target.value,
                            }))
                          }
                        />{" "}
                        {gender.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex xl:justify-end justify-center">
              <button
                className="mt-4 bg-green-700 w-fit 
                  hover:cursor-pointer duration-300
                text-white px-4 py-2 rounded hover:bg-green-800"
                onClick={() =>
                  handleUpdateUser(
                    context?.user.id,
                    context?.user.password,
                    context?.user.name,
                    context?.user.gender,
                    context?.user.dob,
                    context?.user.email,
                    context?.user.avatar,
                    context?.setUser
                    // setEditingUserId
                  )
                }
              >
                Lưu thay đổi
              </button>
            </div>
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
                    <div className="flex  flex-col ">
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
                    <div className="flex  flex-col ">
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
                  <div className="text-gray-600 flex items-center space-x-3">
                    <SlLock className="text-gray-600 text-2xl " />
                    <span>Đổi mật khẩu</span>
                  </div>
                  <button className=" px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    Cập nhật
                  </button>
                </div>
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                  <div className="text-gray-600 flex items-center space-x-3">
                    <GoKey className="text-gray-600 text-2xl " />
                    <span>Thiết lập mã pin</span>
                  </div>
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
