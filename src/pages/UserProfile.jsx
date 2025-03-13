import { use, useEffect, useState } from "react";
import { fetchUsers, getUserById } from "../services/UserSevices";
import toast from "react-hot-toast";
import b2 from "../assets/books/b2.webp";

const UserProfile = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || " ");

  const Test = async () => {
    //   const user1 = JSON.parse(user);
    //   // setUser(JSON.parse(user));
    //   // console.log(user1.id);
    //   const res = await getUserById(user1.id);
    //   // console.log(res); // Lấy thông tin người dùng từ API
    //   setUser(res);
    getUserById(JSON.parse(user).id).then((res) => {
      console.log(res);
      setUser(res);
    });
  };
  useEffect(() => {
    Test();
  }, []);

  return (
    <div className="!m-10 border mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
      {/* <Test /> */}
      <img
        src={b2}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
      />
      <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
      <p className="text-gray-600">{user?.email}</p>
      <p className="text-gray-600">{user?.gender}</p>
      <p className="text-gray-600">{user?.dob}</p>
      <p className="text-gray-600">{user?.username}</p>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
        // onClick={Test}
      >
        Chỉnh sửa
      </button>
    </div>
  );
};

export default UserProfile;
