import PropTypes from "prop-types";

const SidebarBooks = (props) => {
  const { onClick, categories, fetchData } = props;

  const handleAllBooksClick = () => {
    window.history.pushState({}, "", "/sách");
    // setId(null); // Reset state
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
          // fetchData();
          onClick(null);
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
