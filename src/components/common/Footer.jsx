import { BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="main-footer bg-black py-20 ">
      <div className="footer-top container pb-6 mx-auto grid justify-center">
        <div className="text-white grid grid-cols-3 w-6xl">
          <div className="p-3 ">
            <h1>
              <a href="/#" className="text-white no-underline text-3xl">
                Cook A Book
              </a>
            </h1>
          </div>
          <div className="py-3 px-5">
            Khám phá thế giới tri thức <br />
            với hàng ngàn đầu sách chất lượng!
          </div>
          <div className="container grid grid-cols-2 bg-yellow-400 text-black w-3/4 ml-auto px-3 rounded">
            <div className=" grid justify-center my-auto -translate-x-6">
              <BsFillTelephoneFill size="3em" colors="blue" />
            </div>
            <div className="w-48 -translate-x-10 py-3.5">
              <p className="mb-0">Gọi cho chúng tôi</p>
              <p className="font-bold text-xl">(+89)123 456 789</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-10 mx-auto grid justify-center ">
        <div className="grid grid-cols-4 text-white bg-gray-800 w-6xl p-10 rounded">
          <div className="columns">
            {/* column-1 */}
            <h4 className="text-2xl">Hỗ trợ</h4>
            <ul className="pl-0">
              <li className="mt-3">
                <a
                  href="/#"
                  className="text-white 
                                opacity-50 no-underline hover:!text-yellow-300 
                                hover:translate-x-10 ease-in-out ">
                  Điều khoản sử dụng
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="/#"
                  className="text-white 
                                opacity-50 no-underline hover:!text-yellow-300
                                hover:transition-colors">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="/#"
                  className="text-white 
                                opacity-50 no-underline hover:!text-yellow-300 
                                hover:transition-colors">
                  Hướng dẫn thanh toán
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="/#"
                  className="text-white 
                                opacity-50 no-underline hover:!text-yellow-300
                                hover:transition-colors">
                  Hòm thư góp ý
                </a>
              </li>
            </ul>
          </div>
          <div className="columns">
            {/* column-1 */}
            <h4 className="text-2xl">Khách hàng</h4>
            <ul className="pl-0">
              <li className="mt-3">
                <a
                  href="/#"
                  className="text-white opacity-50 no-underline hover:!text-yellow-300 hover:transition-colors">
                  Chính sách bảo hành
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="/#"
                  className="text-white opacity-50 no-underline hover:!text-yellow-300 hover:transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="/#"
                  className="text-white opacity-50 no-underline hover:!text-yellow-300 hover:transition-colors">
                  Chính sách đổi - trả - hoàn tiền
                </a>
              </li>
              <li className="mt-2">
                <a
                  href="/#"
                  className="text-white opacity-50 no-underline hover:!text-yellow-300 hover:transition-colors">
                  Chính sách vận chuyển
                </a>
              </li>
            </ul>
          </div>
          <div className="columns">
            {/* column-1 */}
            <h4 className="text-2xl">Tin tức</h4>
            <ul className="pl-0">
              <li className="mt-4">
                <p className="opacity-60 mb-0">24/11/2024</p>
                <p>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</p>
              </li>
              <li className="!mt-4">
                <p className="opacity-60 mb-0">24/11/2024</p>
                <p>Sách khoa học ‘Một sức khỏe’: Sức khỏe con người và thiên nhiên</p>
              </li>
            </ul>
          </div>
          <div className="columns pl-5">
            {/* column-1 */}
            <h4 className="text-2xl">Về chúng tôi</h4>
            <ul className="pl-0">
              <li className="text-white !mt-4">
                <a
                  href="/#"
                  className="text-white no-underline hover:text-xl
                                    ">
                  Facebook
                </a>
              </li>
              <li className="text-white !mt-4">
                <a href="/#" className="text-white no-underline hover:text-xl">
                  Twitter
                </a>
              </li>
              <li className="text-white !mt-4">
                <a href="/#" className="text-white no-underline hover:text-xl">
                  LinkedIn
                </a>
              </li>
              <li className="text-white !mt-4">
                <a
                  href="/#"
                  className="text-white no-underline hover:text-xl transition ease-in duration-1000">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="text-center text-white">
          &copy;{new Date().getFullYear()} City Guide App - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
