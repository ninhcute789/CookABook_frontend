import { useState } from "react";
import SideBar from "../components/common/SideBar";
import UserList from "../components/list/UserList";
import AddUsers from "../components/addForm/AddUsers";

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
      <UserList />
    </div>
  );
};

export default AdminUsers;
