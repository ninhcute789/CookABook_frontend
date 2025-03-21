import { use, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getAllCategoriesWithSizeAndPage } from "../../services/CategoryServices";
import toast from "react-hot-toast";
import { getAllBooksWithSizeAndPage } from "../../services/BookServices";

const SidebarBooks = (props) => {
  const {onClick} = props;
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const sizeCategories = 20; // Số bài viết mỗi trang
  const [totalElements, setTotalElements] = useState(0); // Tổng số bài viết

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoriesWithSizeAndPage(
          page,
          sizeCategories,
          setCategories,
          setTotalPages,
          setTotalElements
        );
        console.log("Danh sách thể loại sách:", res.data?.data?.data);

        // console.log("Tổng số bài viết:", totalElements);

        // toast.success("🎉 Tải danh sách thể loại sách thành công!");
      } catch (error) {
        toast.error("Lỗi khi tải danh sách thể loại sách:", error);
        console.error("Lỗi khi tải danh sách thể loại sách:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [page]);

  return (
    <div className="w-fit h-fit p-4 rounded-lg shadow-lg bg-white sticky top-4">
      <h2 className="text-md font-medium border-b w-fit pb-2">
        Khám phá theo danh mục
      </h2>
      <div
        className="py-3 border-b border-gray-400 cursor-pointer hover:text-blue-500 
               hover:underline flex items-center justify-between h-fit"
        onClick={onClick}
      >
        Tất cả sách
      </div>
      {categories.map((category, index) => (
        <div
          key={index}
          className="py-3 border-b border-gray-400 cursor-pointer hover:text-blue-500 
               hover:underline flex items-center justify-between h-fit"
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
export default SidebarBooks;
