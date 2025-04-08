import { NavLink } from "react-router";
import bg02 from "../assets/libra-2.jpg";
import ava1 from "../assets/ava/1.png";
import ava2 from "../assets/ava/2.png";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      text: "Cook A Book đã thay đổi cách tôi nhìn nhận về sách. Dịch vụ tuyệt vời và sách chất lượng cao!",
      author: "Nguyễn Minh Hoàng",
      color: "#2c9f24",
    },
    {
      text: "Tôi rất thích các chương trình ưu đãi của Cook A Book. Sẽ tiếp tục ủng hộ!",
      author: "Trần Thị Mai",
      color: "#FF8C00",
    },
    {
      text: "Đội ngũ hỗ trợ khách hàng rất nhiệt tình. Tôi đã tìm được cuốn sách mình yêu thích!",
      author: "Lê Văn Hùng",
      color: "#db1c1c",
    },
    {
      text: "Sách rất đa dạng và chất lượng. Tôi rất hài lòng với dịch vụ của Cook A Book.",
      author: "Phạm Thị Hạnh",
      color: "#1e90ff",
    },
    {
      text: "Giao hàng nhanh chóng, đóng gói cẩn thận. Tôi sẽ giới thiệu cho bạn bè của mình!",
      author: "Hoàng Văn Nam",
      color: "#8a2be2",
    },
    {
      text: "Tôi đã tìm được rất nhiều cuốn sách hay tại đây. Cảm ơn Cook A Book!",
      author: "Nguyễn Thị Lan",
      color: "#ff4500",
    },
    {
      text: "Dịch vụ khách hàng rất tốt, luôn sẵn sàng hỗ trợ. Tôi rất hài lòng!",
      author: "Đặng Văn Phúc",
      color: "#32cd32",
    },
    {
      text: "Sách rất đẹp và chất lượng. Tôi sẽ tiếp tục mua sách tại đây.",
      author: "Vũ Thị Ngọc",
      color: "#ff1493",
    },
    {
      text: "Cook A Book là nơi tôi luôn tin tưởng để mua sách cho gia đình.",
      author: "Trần Văn Bình",
      color: "#ffa500",
    },
    {
      text: "Tôi rất thích cách Cook A Book chăm sóc khách hàng. Rất chuyên nghiệp!",
      author: "Lý Thị Hương",
      color: "#4682b4",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Chuyển slide sau mỗi 3 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, [testimonials.length]);

  // const handleNext = () => {
  //   setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  // };

  // const handlePrev = () => {
  //   setCurrentSlide(
  //     (prev) => (prev - 1 + testimonials.length) % testimonials.length
  //   );
  // };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-[#f0f9ff] to-[#e0f7fa] rounded-2xl shadow-xl my-10">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-5xl font-extrabold text-[#2c9f24] mb-6">
          Về Chúng Tôi
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-4">
          Chào mừng bạn đến với{" "}
          <span className="font-semibold text-[#FF8C00]">Cook A Book</span> –
          nơi cung cấp những cuốn sách hay nhất cho mọi lứa tuổi. Chúng tôi tin
          rằng sách không chỉ là nguồn tri thức mà còn là người bạn đồng hành
          trong cuộc sống.
        </p>
        <div className="mb-8 flex justify-center">
          <NavLink
            to="/sách"
            className="px-8 py-4 bg-[#20B2AA] hover:cursor-pointer text-white font-semibold rounded-full shadow-lg hover:bg-[#008B8B] transition duration-300 text-lg"
          >
            Khám Phá Ngay
          </NavLink>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-[#2c9f24] text-center">
          Hành Trình Của Chúng Tôi
        </h3>
        {/* <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full border-0" // Thêm class "border-0" để loại bỏ viền
            src="https://www.youtube.com/embed/3hNNb7z1NMo"
            title="Cook A Book Journey"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div> */}
      </div>

      {/* Statistics Section */}
      <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-[#db1c1c] mb-6 text-center">
          Thành Tựu Của Chúng Tôi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-5xl font-extrabold text-[#2c9f24]">10,000+</h4>
            <p className="text-lg text-gray-700 mt-2">Đầu sách</p>
          </div>
          <div>
            <h4 className="text-5xl font-extrabold text-[#FF8C00]">50,000+</h4>
            <p className="text-lg text-gray-700 mt-2">Khách hàng hài lòng</p>
          </div>
          <div>
            <h4 className="text-5xl font-extrabold text-[#db1c1c]">5,000+</h4>
            <p className="text-lg text-gray-700 mt-2">Đánh giá tích cực</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold text-[#a2420a] mb-6">
            Sách Chúng Tôi Cung Cấp
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Chúng tôi tự hào mang đến cho bạn những cuốn sách chất lượng từ
            nhiều thể loại khác nhau:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-4">
            <li>
              <span className="font-semibold">Văn học:</span> Những tác phẩm
              kinh điển và hiện đại đầy cảm hứng.
            </li>
            <li>
              <span className="font-semibold">Khoa học:</span> Các cuốn sách
              giúp bạn hiểu rõ hơn về thế giới xung quanh.
            </li>
            <li>
              <span className="font-semibold">Kinh tế:</span> Học hỏi từ những
              chuyên gia hàng đầu trong lĩnh vực tài chính.
            </li>
            <li>
              <span className="font-semibold">Kỹ năng sống:</span> Giúp bạn phát
              triển bản thân và đạt được thành công.
            </li>
          </ul>
        </div>
        <div>
          <img
            src={bg02}
            alt="Books"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 overflow-hidden w-full rounded-xl shadow-lg py-6 bg-white">
        <h3 className="text-3xl font-bold text-[#2c9f24] mb-6 text-center">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h3>
        <div className="relative w-full mx-auto">
          {/* Slide Container */}
          <div
            className="flex transition-transform duration-1000"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full bg-transparent p-6 rounded-xl  text-center"
              >
                <p className="text-lg text-gray-700 italic">
                  {testimonial.text}
                </p>
                <h4
                  className="text-xl font-semibold mt-4"
                  style={{ color: testimonial.color }}
                >
                  - {testimonial.author}
                </h4>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {/* <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Trước
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Tiếp
            </button>
          </div> */}
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-[#2c9f24] mb-6 text-center">
          Đội Ngũ Của Chúng Tôi
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed text-center mb-12">
          Chúng tôi là một đội ngũ trẻ trung, năng động và đầy nhiệt huyết, luôn
          sẵn sàng mang đến cho bạn những trải nghiệm tốt nhất.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <img
              src={ava1}
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
            />
            <h4 className="text-xl font-semibold mt-4">Lê Minh Khánh</h4>
            <p className="text-gray-600">Frontend Developer</p>
          </div>
          <div className="text-center">
            <img
              src={ava2}
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
            />
            <h4 className="text-xl font-semibold mt-4">Đoàn Hải Ninh</h4>
            <p className="text-gray-600">Backend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
