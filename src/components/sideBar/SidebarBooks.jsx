import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router";

const SidebarBooks = (props) => {
  const { onClick, categories } = props;
  const location = useLocation();

  const decodedPath = decodeURIComponent(location.pathname); // Giải mã đường dẫn
  console.log("Current path (decoded):", decodedPath);

  const path = decodedPath === "/sách";

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
      {/* {console.log("Current path:", location.pathname)} */}

      {categories.map((category, index) => (
        <div
          key={index}
          className={`py-3 border-b ${
            !path
              ? "hidden opacity-50 text-gray-400 cursor-default hover:text-gray-400 hover:no-underline"
              : " "
          }
            border-gray-400 cursor-pointer hover:text-blue-500 
               hover:underline flex items-center justify-between h-fit`}
          onClick={() => {
            onClick(category.id);
            scrollTo({ top: 0, behavior: "smooth" });
          }}
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
