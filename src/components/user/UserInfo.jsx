import { useContext, useEffect, useRef, useState } from "react";
import ava from "../../assets/ava.png"; // Thay bằng ảnh đại diện thực tế
import { AppContext } from "../../context/AppContext";
import { HiOutlineMail } from "react-icons/hi";
import {
  getUsersById,
  handleUpdatePassword,
  handleUpdateUser,
} from "../../services/UserSevices";
import { SlLock } from "react-icons/sl";
import { GoKey } from "react-icons/go";
import ImageUploader from "../common/ImageUpload";
import toast from "react-hot-toast";

const UserInfo = () => {
  const context = useContext(AppContext);

  const genders = [
    { label: "Nam", value: "MALE" },
    { label: "Nữ", value: "FEMALE" },
    { label: "Khác", value: "OTHER" },
  ];
  const [isLoading, setIsLoading] = useState(true);

  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isUpdateAvatar, setIsUpdateAvatar] = useState(false);
  const popupRef = useRef(null);

  const [isUpdateEmail, setIsUpdateEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(context?.user?.email);
  const [currentAvatar, setCurrentAvatar] = useState(
    context?.user?.avatar || ava
  );

  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (context?.user?.email) {
      setNewEmail(context.user.email);
    }
  }, [context?.user]);
  // Thêm useEffect để theo dõi thay đổi của avatar
  useEffect(() => {
    if (context?.user?.avatar) {
      setCurrentAvatar(context.user.avatar);
    }
  }, [context?.user]);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const res = await getUsersById(parsedUser.id);
      context.setUser(res);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
    } finally {
      setIsLoading(false);
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
                        onUploadSuccess={(url) => {
                          setCurrentAvatar(url);
                          context?.setUser((prevState) => ({
                            ...prevState,
                            avatar: url,
                          }));
                        }}
                        initialImage={currentAvatar}
                      />
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button
                        className="px-4 py-2 duration-300 bg-gray-300 rounded hover:cursor-pointer hover:bg-gray-400"
                        onClick={() => {
                          setIsUpdateAvatar(false);
                          setCurrentAvatar(context?.user?.avatar || ava);
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        className="px-4 py-2 duration-300 bg-blue-500 hover:bg-blue-600 text-white rounded hover:cursor-pointer"
                        onClick={async () => {
                          try {
                            await handleUpdateUser(
                              context?.user?.id,
                              context?.user?.password,
                              context?.user?.name,
                              context?.user?.gender,
                              context?.user?.dob,
                              context?.user?.email,
                              currentAvatar,
                              context?.setUser
                            );

                            // Cập nhật context sau khi API thành công
                            context?.setUser((prevState) => ({
                              ...prevState,
                              avatar: currentAvatar,
                            }));

                            setIsUpdateAvatar(false);
                          } catch (error) {
                            console.error("Lỗi khi cập nhật avatar:", error);
                          }
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
          {isUpdateEmail && (
            <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Cập nhật Email</h2>
                <div className="space-y-4 w-full">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email mới
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Nhập địa chỉ email mới"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    className="px-4 py-2 duration-300
                   bg-gray-300 rounded hover:cursor-pointer hover:bg-gray-400"
                    onClick={() => {
                      setIsUpdateEmail(false);
                      setNewEmail(context?.user?.email);
                    }}
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
                        newEmail,
                        context?.user.avatar,
                        context?.setUser
                      );
                      setIsUpdateEmail(false);
                    }}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="SDT-EMAIL w-12/27 pl-5">
            <div className="bg-white py-2">
              <h3 className="text-lg text-gray-500 mb-4">Email</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                  <div className="flex flex-row items-center space-x-3">
                    <HiOutlineMail className="text-gray-600 text-2xl" />
                    <div className="flex flex-col">
                      <span>Địa chỉ Email</span>
                      {context?.user?.email ? (
                        <span className="text-gray-600">
                          {context.user.email}
                        </span>
                      ) : (
                        <span className="text-gray-600">
                          Thêm địa chỉ Email
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
                    onClick={() => {
                      setNewEmail(context?.user?.email || ""); // Đồng bộ email khi mở modal
                      setIsUpdateEmail(true);
                    }}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>

            {isUpdatePassword && (
              <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-lg font-semibold mb-4">Đổi mật khẩu</h2>
                  <div className="space-y-4 w-full">
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Mật khẩu cũ
                      </label>
                      <input
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            oldPassword: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Nhập mật khẩu cũ"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Nhập mật khẩu mới"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-2">
                    <button
                      className="px-4 py-2 duration-300
                        bg-gray-300 rounded hover:cursor-pointer hover:bg-gray-400"
                      onClick={() => {
                        setIsUpdatePassword(false);
                        setPasswordForm({
                          oldPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 duration-300
                      bg-blue-500 hover:bg-blue-600 text-white rounded hover:cursor-pointer"
                      onClick={() => {
                        if (
                          passwordForm.newPassword ===
                            passwordForm.confirmPassword &&
                          passwordForm.oldPassword !== passwordForm.newPassword
                        ) {
                          handleUpdatePassword(
                            context.user.username,
                            passwordForm.oldPassword,
                            passwordForm.newPassword,
                            context.setUser
                          );
                          setIsUpdatePassword(false);
                        } else if (passwordForm.oldPassword === passwordForm.newPassword) {
                          toast.error("Mật khẩu cũ và mới giống nhau!");
                        } else {
                          toast.error("Mật khẩu không khớp!");
                        }
                      }}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className=" bg-white py-2">
              <h3 className="text-lg text-gray-500 mb-4">Bảo mật</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                  <div className="text-gray-600 flex items-center space-x-3">
                    <SlLock className="text-gray-600 text-2xl " />
                    <span>Đổi mật khẩu</span>
                  </div>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
                    onClick={() => {
                      setPasswordForm({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setIsUpdatePassword(true);
                    }}
                  >
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
                <div className="flex justify-between items-center pb-3">
                  <span className="text-red-500">🗑 Yêu cầu xóa tài khoản</span>
                  <button className=" px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer">
                    Yêu cầu
                  </button>
                </div>
              </div>
            </div>

            {/* <div className=" bg-white py-2">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
