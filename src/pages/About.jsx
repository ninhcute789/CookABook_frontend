import { NavLink } from "react-router";
import bg01 from "../assets/books/bg01.jpg";
import bg02 from "../assets/libra-2.jpg";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r my-10
    from-[#8edfaf] to-white rounded-2xl shadow-xl text-center">
      <h2 className="text-4xl font-extrabold text-[#2c9f24] mb-6">
        Về Chúng Tôi
      </h2>
      <p className="text-lg text-gray-800 leading-relaxed mb-6">
        Chào mừng bạn đến với{" "}
        <span className="font-semibold text-[#FF8C00]">Book Haven</span> – nơi
        cung cấp những cuốn sách hay nhất cho mọi lứa tuổi. Chúng tôi tin rằng
        sách không chỉ là nguồn tri thức mà còn là người bạn đồng hành trong
        cuộc sống.
      </p>
      <p className="text-lg text-gray-800 leading-relaxed mb-6">
        Với hàng ngàn đầu sách từ nhiều thể loại khác nhau như văn học, khoa
        học, kinh tế, kỹ năng sống, chúng tôi mong muốn mang đến cho bạn trải
        nghiệm đọc sách tuyệt vời nhất.
      </p>
      <p className="text-lg text-gray-800 leading-relaxed">
        Hãy cùng chúng tôi khám phá thế giới tri thức vô tận và lan tỏa niềm đam
        mê đọc sách đến mọi người!
      </p>
      <div className="mt-8">
        <NavLink to="/" className="px-6 py-3 bg-[#20B2AA] hover:cursor-pointer
        text-white font-semibold rounded-full shadow-md hover:bg-[#008B8B] transition">
          Khám Phá Ngay
        </NavLink>
      </div>
      {/* Phần giới thiệu về sách */}
      <div className="mt-12 p-6 bg-white rounded-xl shadow-md text-left">
        <h3 className="text-2xl font-bold text-[#a2420a] mb-4">Sách Chúng Tôi Cung Cấp</h3>
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Chúng tôi tự hào mang đến cho bạn những cuốn sách chất lượng từ nhiều thể loại khác nhau:
        </p>
        <ul className="list-disc list-inside text-gray-800 text-lg">
          <li><span className="font-semibold">Văn học:</span> Những tác phẩm kinh điển và hiện đại đầy cảm hứng.</li>
          <li><span className="font-semibold">Khoa học:</span> Các cuốn sách giúp bạn hiểu rõ hơn về thế giới xung quanh.</li>
          <li><span className="font-semibold">Kinh tế:</span> Học hỏi từ những chuyên gia hàng đầu trong lĩnh vực tài chính.</li>
          <li><span className="font-semibold">Kỹ năng sống:</span> Giúp bạn phát triển bản thân và đạt được thành công.</li>
        </ul>
        <img src={bg02} alt="" className=" w-full h-50 object-cover mx-auto rounded mt-5"/>
      </div>
      {/* Phần cam kết và dịch vụ */}
      <div className="mt-12 p-6 bg-gray-100 rounded-xl shadow-md text-left">
        <h3 className="text-2xl font-bold text-[#db1c1c] mb-4">Cam Kết Của Chúng Tôi</h3>
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Chúng tôi luôn đặt chất lượng sách và trải nghiệm khách hàng lên hàng đầu:
        </p>
        <ul className="list-disc list-inside text-gray-800 text-lg">
          <li><span className="font-semibold">Sách chính hãng:</span> Đảm bảo nguồn gốc rõ ràng, nội dung chất lượng.</li>
          <li><span className="font-semibold">Dịch vụ nhanh chóng:</span> Giao hàng tận nơi trên toàn quốc.</li>
          <li><span className="font-semibold">Ưu đãi hấp dẫn:</span> Giảm giá, quà tặng và các chương trình thành viên đặc biệt.</li>
          <li><span className="font-semibold">Hỗ trợ khách hàng:</span> Luôn sẵn sàng giải đáp mọi thắc mắc của bạn.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
