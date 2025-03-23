import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const SidebarBooks = (props) => {
  const { onClick, categories } = props;

  const navigate = useNavigate();

  const handleAllBooksClick = () => {
    navigate("/sách"); // Chuyển hướng về trang tất cả sách
  };

  return (
    <div className="w-fit h-fit p-4 rounded-lg shadow-lg bg-white sticky top-4">
      <h2 className="text-md font-medium border-b w-fit pb-2">
        Khám phá theo danh mục
      </h2>
      <div
        className="py-3 border-b border-gray-400 cursor-pointer hover:text-blue-500 
               hover:underline flex items-center justify-between h-fit"
        onClick={() => {
          handleAllBooksClick();
          onClick(null);
          scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Tất cả sách
      </div>
      {categories.map((category, index) => (
        <div
          key={index}
          className="py-3 border-b border-gray-400 cursor-pointer hover:text-blue-500 
               hover:underline flex items-center justify-between h-fit"
          onClick={() => onClick(category.id)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
SidebarBooks.propTypes = {
  onClick: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
export default SidebarBooks;
