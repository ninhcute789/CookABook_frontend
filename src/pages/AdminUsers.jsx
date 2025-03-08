import { useState } from "react";
import AddUsers from "../components/addForm/addUsers";
import SideBar from "../components/common/SideBar";
import UserList from "../components/list/UserList";

const AdminUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmitArticle = (user) => {
    console.log("User đã lưu:", user);
    setIsModalOpen(false);
  };
  return (
    <div className="w-full bg-gray-100">
      <AddUsers
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitArticle}
        initialData={{username: "",password: "", name: "", dob: "",email: "", gender: "" }}
      />
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:cursor-pointer mt-10 ml-10 w-50
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm user
      </button>
      <UserList />
    </div>
  );
};

export default AdminUsers;
