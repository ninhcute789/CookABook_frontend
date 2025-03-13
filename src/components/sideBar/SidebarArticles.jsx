import PropTypes from "prop-types";

const SidebarArticles = ({ newsArticles, setArticle }) => {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const truncateDate = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ")
      : text;
  };
  return (
    <aside className=" sticky top-15 z-50 mt-5 h-fit ml-auto w-3/8 hidden md:block  p-4 rounded-xl">
      <div className="w-fit mb-5">
        <h3 className="text-2xl font-bold mt-6 mb-3"> Bài viết nổi bật</h3>
        <hr className="text-amber-600 border-2 " />
      </div>
      <ul className="space-y-3">
        {newsArticles?.slice(0, 5).map((article) => (
          <li
            key={article.id}
            className="grid xl:grid-cols-2 grid-cols-1 text-center lg:text-left
                    items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md"
            onClick={() => setArticle(article)}
          >
            <img
              src={article.imageURL}
              alt={article.title}
              className="w-45 h-20 object-cover rounded-md xl:mx-0 mx-auto"
            />
            <div className="xl:mx-0 mx-auto">
              <p className="text-sm font-semibold line-clamp-1">
                {article.title}
              </p>
              <p className="line-clamp-2 h-12">{article.content}</p>
              <div className="inline-flex justify-between w-full">
                <p className="text-xs text-gray-500">
                  {truncateDate(article.createdAt, 1)}
                </p>
                <p className="text-xs text-gray-500">
                  Tác giả - {article.user?.name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};
SidebarArticles.propTypes = {
  newsArticles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // id phải là số và bắt buộc
      title: PropTypes.string.isRequired, // title là chuỗi và bắt buộc
      author: PropTypes.string.isRequired, // author là chuỗi và bắt buộc
      date: PropTypes.string.isRequired, // date là chuỗi và bắt buộc
      image: PropTypes.string.isRequired, // image là chuỗi (URL ảnh)
      content: PropTypes.string.isRequired, // content là chuỗi và bắt buộc
    })
  ).isRequired, // Mảng này là bắt buộc
  setArticle: PropTypes.func.isRequired, // ✅ Thêm kiểm tra prop này
};
export default SidebarArticles;
