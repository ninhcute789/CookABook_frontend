import { books } from "../../data/dataBooks";

const BookItem = () => {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  // const categories = [
  //   "English Books",
  //   "Sách tiếng Việt",
  //   "Văn phòng phẩm",
  //   "Quà lưu niệm",
  // ];

  // const Sidebar = () => {
  //   return (
  //     <div className="w-50 p-4  rounded-lg shadow-lg bg-white h-fit sticky top-4">
  //       <h2 className="text-md font-bold mb-3">Khám phá theo danh mục</h2>
  //       {categories.map((category, index) => (
  //         <div
  //           key={index}
  //           className="py-2 border-b cursor-pointer hover:text-blue-500"
  //         >
  //           {category}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <div className="flex gap-4">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className=" p-4 rounded-md shadow-lg bg-white hover:shadow-2xl transition duration-200"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-70 object-cover rounded-lg"
            />
            <div className="p-2">
              <p className="text-xl font-semibold text-black">{book.price}</p>
              <h3 className="text-lg my-2">{truncateText(book.title, 15)}</h3>
              {book.isOfficial ? (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  CHÍNH HÃNG
                </span>
              ):(
                <span className=" text-white text-xs px-2 py-1 rounded-full font-semibold">
                  
                </span>
              )
              }
              <div className="flex items-center gap-1 text-yellow-500 mt-2">
                {[...Array(book.rating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.211 1.192-5.939 5.791 1.401 8.17-7.341-3.857-7.341 3.857 1.401-8.17-5.939-5.791 8.211-1.192z" />
                    {/* path vẽ ngôi sao */}
                  </svg>
                ))}
                <span className="text-gray-600 text-sm">
                  (Đã bán {book.sold})
                </span>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Mua ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookItem;
