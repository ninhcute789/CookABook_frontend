import React from "react";
import PropTypes from "prop-types";
import s1 from "../../assets/s1.jpg";
import { NavLink } from "react-router";

const NewsArticle = ({ title, author, date, content, image }) => {
  return (
    <div className="mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500 p-6">
      <div>
        <img
          src={image}
          alt={title}
          className="max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm"
        />
      </div>
      <div className="text-xl font-medium my-4">{title}</div>
      <div className="flex justify-between">
        <div className="font-bold text-[12px]">{date}</div>
        <div className="font-bold underline cursor-pointer text-[12px]">
          {author}
        </div>
      </div>
      <div className="text-cyan-800 my-3 text-md ">{content}</div>
      <NavLink to="/tin-tuc" className=" text-yellow-500">
        Đọc thêm
      </NavLink>
    </div>
  );
};

NewsArticle.propTypes = {
  title: PropTypes.string.isRequired, // Bắt buộc phải có title dạng string
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string, // Có thể không có ảnh, nên không dùng isRequired
};

export default NewsArticle;
