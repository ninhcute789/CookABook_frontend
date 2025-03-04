import { useState } from "react";
import { newsArticles } from "../../data/dataNews";

const ArticleSideBar = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <aside className="pr-20 sticky top-15 z-50 mt-5 h-fit ml-auto w-3/8 hidden md:block  p-4 rounded-xl">
      <div className="w-fit mb-5">
        <h3 className="text-2xl font-bold mt-6 mb-3"> Bài viết nổi bật</h3>
        <hr className="text-amber-600 border-2 " />
      </div>
      <ul className="space-y-3">
        {newsArticles.slice(0, 5).map((article) => (
          <li
            key={article.id}
            className="flex gap-3 items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md"
            onClick={() => setSelectedArticle(article)}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-36 h-18 object-cover rounded-md"
            />
            <div>
              <p className="text-sm font-semibold">
                {truncateText(article.title, 10)}
              </p>
              <p className="text-xs text-gray-500">{article.date}</p>
            </div>
            <hr className="" />
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default ArticleSideBar;
