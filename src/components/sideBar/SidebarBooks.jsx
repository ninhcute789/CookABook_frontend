import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SidebarBooks = () => {
  const categories = [
    {
      name: "English Books",
      subcategories: [
        "Art & Photography",
        "Biographies & Memoirs",
        "Business & Economics",
        "How-to - Self Help",
        "Children's Books",
        "Dictionary",
        "Education - Teaching",
        "Fiction - Literature",
        "Magazines",
        "Medical Books",
        "Parenting & Relationships",
        "Reference",
        "Science - Technology",
        "History, Politics & Social Sciences",
        "Travel & Holiday",
        "Cookbooks, Food & Wine",
      ],
    },
    {
      name: "Sách tiếng Việt",
      subcategories: ["Văn học", "Kinh tế", "Tâm lý & Kỹ năng sống"],
    },
    {
      name: "Văn phòng phẩm",
      subcategories: ["Bút viết", "Sổ tay", "Dụng cụ học tập"],
    },
    {
      name: "Quà lưu niệm",
      subcategories: ["Đồ trang trí", "Thiệp & Phụ kiện", "Hộp quà"],
    },
    // { name: "Đồ chơi giáo dục", subcategories: [] },
    // { name: "Thiết bị công nghệ", subcategories: [] },
    // { name: "Dụng cụ học tập", subcategories: [] },
  ];
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="w-1/2 h-fit p-4 rounded-lg shadow-lg bg-white sticky top-4">
      <h2 className="text-md font-medium border-b w-fit pb-2">Khám phá theo danh mục</h2>
      
      {categories.map((category, index) => (
        <div key={index}>
          <div
            className="py-3 border-b border-gray-400 cursor-pointer hover:text-blue-500 flex 
            items-center justify-between"
            onClick={() => toggleCategory(index)}
          >
            {category.name}
            {category.subcategories.length > 0 && (
              <span>
                {openCategory === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            )}
          </div>
          <div
            className={`pl-4 text-gray-700 transition-max-height duration-700 ease-in-out overflow-hidden ${
              openCategory === index ? "max-h-96" : "max-h-0"
            }`}
          >
            {category.subcategories.map((sub, i) => (
              <div
                key={i}
                className="py-1 hover:text-blue-500 hover:underline hover:cursor-pointer"
              >
                {sub}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default SidebarBooks;
