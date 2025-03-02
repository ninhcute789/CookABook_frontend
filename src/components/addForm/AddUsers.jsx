import { useEffect, useState } from "react";

const AddUsers = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    // add or remove overflow-y-hidden class to body
    if (modal) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [modal]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User Name:", userName);
    console.log("Address:", address);
    let userData = {
      userName: userName,
      email: email,
      password: password,
      address: address,
    };

    let data = localStorage.getItem("data");
    if (data) {
      let siu = JSON.parse(data);
      siu.push(userData);
      localStorage.setItem("data", JSON.stringify(siu));
      setUsers(siu);
    } else {
      localStorage.setItem("data", JSON.stringify([userData]));
      setUsers([userData]);
    }
    console.log("User registered:", userData);

    toggleModal();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.userName);
      setEmail(userData.email);
      setPassword(userData.password);
      setAddress(userData.address);
    }
  }, []);

  const handleDelete = (index) => {
    let data = [...users];
    data.splice(index, 1);
    setUsers(data);
    localStorage.setItem("data", JSON.stringify(data));
  };

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setUsers(JSON.parse(data)); // Cập nhật state users
    }
  }, []);

  return (
    <div className="flex flex-col max-w-2xl   ">
      <div className="flex flex-col max-w-2xl   ">
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:cursor-pointer mt-10 ml-10 w-50
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm người dùng
        </button>
      </div>

      {modal && (
        <div className="w-dvw h-dvh left-0 top-0 right-0 bottom-0 fixed">
          <div className="w-dvw h-dvh left-0 top-0 right-0 bottom-0 fixed opacity-80 bg-black"></div>
          <form
            action=""
            onSubmit={(e) => {
              handleOnSubmit(e);
            }}
          >
            <div
              //onClick={toggleModal} // close modal on click outside
              className="bg-[49,49,49] opacity-20 w-dvw h-dvh left-0 top-0 right-0 bottom-0 fixed"
            ></div>
            <div
              className="absolute top-[40%] left-[50%] rounded
          transform translate-x-[-50%] translate-y-[-50%] line-h-1.4 
          bg-[#f1f1f1] py-[14px] px-[28px] max-w-[800px] min-w-[300px]"
            >
              <h2>Thêm thông tin</h2>
              <hr />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label>email</label>
                  <input
                    type="email"
                    className="border-1 rounded"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label>user name</label>
                  <input
                    type="text"
                    className="border-1 rounded"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label>pass word</label>
                  <input
                    type="password"
                    className="border-1 rounded"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label>address</label>
                  <input
                    type="text"
                    className="border-1 rounded"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:cursor-pointer my-3
              hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleModal}
                  type="button"
                >
                  Đóng
                </button>
                <button
                  className="bg-blue-500 hover:cursor-pointer my-3
              hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Thêm
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="mt-10 ml-10">
        <h2>Danh sách người dùng</h2>
        <table className="min-w-full border-collapse border border-gray-400 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Password</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.userName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.password}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600
                    hover:cursor-pointer text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddUsers;
