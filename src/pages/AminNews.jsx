import { useState } from "react";
import AddArticleModal from "../components/addForm/AddAritcle";
import ArticleList from "../components/list/ArticleList";
// import SideBar from "../components/common/SideBar";

const AdminNews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmitArticle = (article) => {
    console.log("Bài báo đã lưu:", article);
    setIsModalOpen(false);
  };
  return (
    <div className=" w-full bg-gray-100">
      {/* <div className="flex flex-col">
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
            </div> */}
      <AddArticleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitArticle}
        initialData={{ title: "", content: "", imageURL: "", createdBy: "" }}
      />

      <button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:cursor-pointer mt-10 ml-10 w-50
          hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Thêm bài báo
      </button>
      <ArticleList truncateText={truncateText} />
    </div>
  );
};

export default AdminNews;
