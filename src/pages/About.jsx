import { NavLink } from "react-router";
import bg02 from "../assets/libra-2.jpg";

const About = () => {
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
      </div>

      {/* Video Section */}
      <div className="mt-0">
        <h3 className="text-3xl font-bold text-[#2c9f24] mb-6 text-center">
          Hành Trình Của Chúng Tôi
        </h3>
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full border-0" // Thêm class "border-0" để loại bỏ viền
            src="https://www.youtube.com/embed/3hNNb7z1NMo"
            title="Cook A Book Journey"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <NavLink
          to="/sách"
          className="px-8 py-4 bg-[#20B2AA] hover:cursor-pointer text-white font-semibold rounded-full shadow-lg hover:bg-[#008B8B] transition duration-300 text-lg"
        >
          Khám Phá Ngay
        </NavLink>
      </div>

      {/* Statistics Section */}
      <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
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
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-[#2c9f24] mb-6 text-center">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-lg text-gray-700 italic">
              "Cook A Book đã thay đổi cách tôi nhìn nhận về sách. Dịch vụ tuyệt
              vời và sách chất lượng cao!"
            </p>
            <h4 className="text-xl font-semibold mt-4 text-[#2c9f24]">
              - Nguyễn Văn D
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-lg text-gray-700 italic">
              "Tôi rất thích các chương trình ưu đãi của Cook A Book. Sẽ tiếp
              tục ủng hộ!"
            </p>
            <h4 className="text-xl font-semibold mt-4 text-[#FF8C00]">
              - Trần Thị E
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-lg text-gray-700 italic">
              "Đội ngũ hỗ trợ khách hàng rất nhiệt tình. Tôi đã tìm được cuốn
              sách mình yêu thích!"
            </p>
            <h4 className="text-xl font-semibold mt-4 text-[#db1c1c]">
              - Lê Văn F
            </h4>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
            />
            <h4 className="text-xl font-semibold mt-4">Nguyễn Văn A</h4>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
            />
            <h4 className="text-xl font-semibold mt-4">Trần Thị B</h4>
            <p className="text-gray-600">Marketing Manager</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
            />
            <h4 className="text-xl font-semibold mt-4">Lê Văn C</h4>
            <p className="text-gray-600">Product Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
