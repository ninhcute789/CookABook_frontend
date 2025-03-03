// import { LuCalendarFold } from "react-icons/lu";
// import n1 from "../assets/n1.jpg";
// import n2 from "../assets/n2.jpg";
// import n3 from "../assets/n3.jpg";
// import n4 from "../assets/n4.jpg";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
// import { FaUser } from "react-icons/fa6";
// import { NavLink } from "react-router";
import NewsArticle from "../components/common/NewsArticle";
// const News = () => {
//   const title = "’Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống"
//   const content =
//     "Cuốn sách mới của Murakami đã lập kỷ lục về số lượng bán ra trong ngày đầu tiên. Nội dung kể về cuộc hành trình của một người đàn ông cô đơn, khám phá những góc khuất trong tâm hồn khi đối mặt với quá khứ và những giấc mơ kỳ lạ. Với phong cách viết đặc trưng, tác phẩm mang đến sự hòa trộn giữa thực tế và huyền ảo, khiến độc giả không thể rời mắt. Cốt truyện sâu sắc, nhân vật có chiều sâu, cùng những thông điệp triết lý về cuộc sống, cuốn sách hứa hẹn trở thành một trong những tác phẩm đáng đọc nhất năm nay.";

//   const truncateText = (text, wordLimit) => {
//     const words = text.split(" ");
//     return words.length > wordLimit
//       ? words.slice(0, wordLimit).join(" ") + "..."
//       : text;
//   };

//   return (
//     <div>
//       <div className="h-20 mt-10 flex justify-center items-center bg-cover bg-center">
//         {/* <img src={n1} alt="" className='-z-1000'/> */}
//         <h1 className="text-6xl text-black font-bold ">Tin tức</h1>
//       </div>
//       <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 w-11/12 mx-auto my-10">
//         <NewsArticle
//           className="1"
//           title={truncateText(title, 10)}
//           author="Hai Núa"
//           date="03/03/2025"
//           content={truncateText(content, 20)}
//           image={s1}
//         />
//         <NewsArticle
//           className="2"
//           title={truncateText(title, 10)}
//           author="Hai Núa"
//           date="03/03/2025"
//           content={truncateText(content, 20)}
//           image={n1}
//         />
//         <NewsArticle
//           className="3"
//           title={truncateText(title, 10)}
//           author="Hai Núa"
//           date="03/03/2025"
//           content={truncateText(content, 20)}
//           image={s3}
//         />
//         <NewsArticle
//           className="4"
//           title={truncateText(title, 10)}
//           author="Hai Núa"
//           date="03/03/2025"
//           content={truncateText(content, 20)}
//           image={s4}
//         />
//         <NewsArticle
//           className="5"
//           title={truncateText(title, 10)}
//           author="Hai Núa"
//           date="03/03/2025"
//           content={truncateText(content, 20)}
//           image={n4}
//         />
//         <NewsArticle
//           className="6"
//           title={truncateText(title, 10)}
//           author="Hai Núa"
//           date="03/03/2025"
//           content={truncateText(content, 20)}
//           image={s2}
//         />
//       </div>
//     </div>
//   );
// };
// export default News;
{
  /* <div
          className="1 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-6"
        >
          <div>
            <img
              src={s1}
              alt=""
              className="max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm"
            />
          </div>
          <div className="text-xl font-medium my-4">
            ‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống
          </div>
          <div className="flex justify-between">
            <div className="font-bold text-[12px]">24/11/2024</div>
            <div className="font-bold underline cursor-pointer text-[12px]">
              hai múa
            </div>
          </div>
          <div className="text-cyan-800 my-3 text-md">
            Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng
            thênh thang. Ông là tác giả nổi…
          </div>
          <NavLink to="/tin-tuc" className=" text-yellow-500">
            Đọc thêm
          </NavLink>
        </div>
        <div
          className="2 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-6"
        >
          <div>
            <img
              src={s1}
              alt=""
              className="max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm"
            />
          </div>
          <div className="text-xl font-medium my-4">
            ‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống
          </div>
          <div className="flex justify-between">
            <div className="font-bold text-[12px]">24/11/2024</div>
            <div className="font-bold underline cursor-pointer text-[12px]">
              hai múa
            </div>
          </div>
          <div className="text-cyan-800 my-3 text-md">
            Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng
            thênh thang. Ông là tác giả nổi…
          </div>
          <NavLink to="/tin-tuc" className=" text-yellow-500">
            Đọc thêm
          </NavLink>
        </div>
        <div
          className="3 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-6"
        >
          <div>
            <img
              src={s1}
              alt=""
              className="max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm"
            />
          </div>
          <div className="text-xl font-medium my-4">
            ‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống
          </div>
          <div className="flex justify-between">
            <div className="font-bold text-[12px]">24/11/2024</div>
            <div className="font-bold underline cursor-pointer text-[12px]">
              hai múa
            </div>
          </div>
          <div className="text-cyan-800 my-3 text-md">
            Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng
            thênh thang. Ông là tác giả nổi…
          </div>
          <NavLink to="/tin-tuc" className=" text-yellow-500">
            Đọc thêm
          </NavLink>
        </div>
        <div
          className="4 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-6"
        >
          <div>
            <img
              src={s1}
              alt=""
              className="max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm"
            />
          </div>
          <div className="text-xl font-medium my-4">
            ‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống
          </div>
          <div className="flex justify-between">
            <div className="font-bold text-[12px]">24/11/2024</div>
            <div className="font-bold underline cursor-pointer text-[12px]">
              hai múa
            </div>
          </div>
          <div className="text-cyan-800 my-3 text-md">
            Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng
            thênh thang. Ông là tác giả nổi…
          </div>
          <NavLink to="/tin-tuc" className=" text-yellow-500">
            Đọc thêm
          </NavLink>
        </div>
        <div
          className="5 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-6"
        >
          <div>
            <img
              src={s1}
              alt=""
              className="max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm"
            />
          </div>
          <div className="text-xl font-medium my-4">
            ‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống
          </div>
          <div className="flex justify-between">
            <div className="font-bold text-[12px]">24/11/2024</div>
            <div className="font-bold underline cursor-pointer text-[12px]">
              hai múa
            </div>
          </div>
          <div className="text-cyan-800 my-3 text-md">
            Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng
            thênh thang. Ông là tác giả nổi…
          </div>
          <NavLink to="/tin-tuc" className=" text-yellow-500">
            Đọc thêm
          </NavLink>
        </div>
        <div
          className="6 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-6"
        >
          <div>
            <img
              src={s1}
              alt=""
              className="max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm"
            />
          </div>
          <div className="text-xl font-medium my-4">
            ‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống
          </div>
          <div className="flex justify-between">
            <div className="font-bold text-[12px]">24/11/2024</div>
            <div className="font-bold underline cursor-pointer text-[12px]">
              hai múa
            </div>
          </div>
          <div className="text-cyan-800 my-3 text-md">
            Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng
            thênh thang. Ông là tác giả nổi…
          </div>
          <NavLink to="/tin-tuc" className=" text-yellow-500">
            Đọc thêm
          </NavLink>
        </div> */
}

import React, { useEffect, useState } from "react";
import { newsArticles } from "../data/data.js";
import { NavLink } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

// const newsArticles = [
//   {
//     id: 1,
//     title: "’Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống",
//     author: "Hai Núa",
//     date: "03/03/2025",
//     image: s1,
//     content:
//       "Cuốn sách mới của Murakami đã lập kỷ lục về số lượng bán ra trong ngày đầu tiên. Nội dung kể về cuộc hành trình của một người đàn ông cô đơn, khám phá những góc khuất trong tâm hồn khi đối mặt với quá khứ và những giấc mơ kỳ lạ. Với phong cách viết đặc trưng, tác phẩm mang đến sự hòa trộn giữa thực tế và huyền ảo, khiến độc giả không thể rời mắt. Cốt truyện sâu sắc, nhân vật có chiều sâu, cùng những thông điệp triết lý về cuộc sống, cuốn sách hứa hẹn trở thành một trong những tác phẩm đáng đọc nhất năm nay.",
//   },
//   {
//     id: 2,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: s2,
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ trong năm 2025 viết bởi Trần Hà...",
//   },
//   {
//     id: 3,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: s3,
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ...",
//   },
//   {
//     id: 4,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: s4,
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ...",
//   },
//   {
//     id: 5,
//     title: "Top 5 cuốn sách giúp bạn thành công trong năm 2025",
//     author: "Trần Hà",
//     date: "01/03/2025",
//     image: { s2 },
//     content:
//       "Nếu bạn muốn phát triển bản thân trong năm 2025, đây là 5 cuốn sách bạn không thể bỏ lỡ...",
//   },
// ];

const News = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className=" w-11/12 mx-auto my-5 px-6">
      {/* <h1 className="text-3xl font-bold mb-4">Tin tức về sách</h1> */}

      <header className="news-header shadow-md sticky top-5 z-50 backdrop-blur-md rounded-2xl bg-gray-300 opacity-90">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo / Tên trang */}
          <NavLink
            onClick={() => {
              setSelectedArticle(null),
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
            }}
            className="text-2xl font-bold text-gray-800 hover:cursor-pointer"
          >
            📚 Tin tức
          </NavLink>

          {/* Thanh điều hướng */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Danh mục
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Bài viết nổi bật
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Liên hệ
            </a>
          </nav>

          {/* Ô tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm bài viết..."
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400
              hover:cursor-pointer"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-700 translate-y-0.5" />
          </div>
        </div>
      </header>

      {!selectedArticle ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 ">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500 p-6"
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-72 object-cover mx-auto rounded shadow-gray-100 shadow-sm"
              />
              <div className="text-xl font-medium my-4">{truncateText(article.title, 10)}</div>
              <div className="flex justify-between">
                <div className="font-bold text-[12px]">{article.date}</div>
                <div className="font-bold hover:underline cursor-pointer text-[12px]">
                  {article.author}
                </div>
              </div>
              <p className="text-gray-700">
                {article.content.slice(0, 100)}...
              </p>
              <NavLink
                onClick={() => {
                  setSelectedArticle(article),
                    window.scrollTo({
                      top: 70,
                      behavior: "smooth",
                    });
                }}
                className=" text-yellow-500 hover:underline"
              >
                Đọc thêm
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setSelectedArticle(null),
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
            }}
            className="mb-4 px-4 py-2 hover:opacity-50 mt-5
            bg-gray-200 rounded hover:cursor-pointer"
          >
            <IoIosArrowBack className="inline-block -translate-y-0.5 -translate-x-1" />
            Quay lại
          </button>
          <h2 className="text-2xl font-bold ">{selectedArticle.title}</h2>
          <p className="text-gray-600">
            Bởi {selectedArticle.author} - {selectedArticle.date}
          </p>
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className=" max-h-96 object-cover rounded-md my-4 mx-auto"
          />
          <p>{selectedArticle.content}</p>
        </div>
      )}
    </div>
  );
};

export default News;
