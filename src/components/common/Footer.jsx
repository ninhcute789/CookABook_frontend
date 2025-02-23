import { BsFillTelephoneFill } from "react-icons/bs";
import logo from '../../assets/logo.jpg';
import logo2 from '../../assets/logo2.png';
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="footer-top flex flex-col md:flex-row pb-6 justify-center">
          <div className="text-white flex flex-col md:flex-row w-full md:w-6xl">
            <div className="pl-4 flex flex-col items-center md:items-start">
              <h1>
                <img src={logo} alt="alo" className="h-20 " />
              </h1>
            </div>
            <div className="py-3 px-5 flex flex-col text-center md:text-left ">
              Khám phá thế giới tri thức <br />
              với hàng ngàn đầu sách chất lượng!
            </div>
            <div className="flex bg-yellow-400 text-black mt-4 md:mt-0 md:ml-auto px-3 rounded">
              <div className="flex flex-col justify-center my-auto">
                <BsFillTelephoneFill size="3em" color="black" />
              </div>
              <div className="w-48 py-3.5 px-3 flex flex-col">
                <p className="mb-0">Gọi cho chúng tôi</p>
                <p className="font-bold text-xl">(+89)123 456 789</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-10 mx-auto grid justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 text-white bg-gray-800 w-full md:w-6xl p-10 rounded">
            <div className="columns mb-10">
              <h4 className="text-2xl ">Hỗ trợ</h4>
              <ul className="pl-0">
                <li className="mt-4">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Hướng dẫn mua hàng
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Hướng dẫn thanh toán
                  </a>
                </li>
                <li className="mt-2 ">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Hòm thư góp ý
                  </a>
                </li>
              </ul>
            </div>
            <div className="columns mb-10">
              <h4 className="text-2xl">Khách hàng</h4>
              <ul className="pl-0">
                <li className="mt-4">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách bảo hành
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách bảo mật
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách đổi - trả - hoàn tiền
                  </a>
                </li>
                <li className="mt-2">
                  <a href="/#" className="text-white opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách vận chuyển
                  </a>
                </li>
              </ul>
            </div>
            <div className="columns mb-10">
              <h4 className="text-2xl">Tin tức</h4>
              <ul className="pl-0">
                <li className="mt-4">
                  <p className="opacity-60 mb-0">24/11/2024</p>
                  <p>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</p>
                </li>
                <li className="mt-4">
                  <p className="opacity-60 mb-0">24/11/2024</p>
                  <p>Sách khoa học ‘Một sức khỏe’: Sức khỏe con người và thiên nhiên</p>
                </li>
              </ul>
            </div>
            <div className="columns pl-0 md:pl-10">
              <h4 className="text-2xl">Về chúng tôi</h4>
              <ul className="pl-0">
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex ">
                  <FaFacebook size="1.5em" color="white" className="flex flex-col " />
                  <a href="/#" className="text-white no-underline hover:text-yellow-300 flex flex-col ml-1">
                    Facebook
                  </a>
                </li>
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex">
                  <BsTwitterX size="1.5em" color="white" className="flex flex-col " />
                  <a href="/#" className="text-white no-underline hover:text-yellow-300 flex flex-col ml-1">
                    Twitter
                  </a>
                </li>
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex">
                  <FaLinkedin size="1.5em" color="white" className="flex flex-col " />
                  <a href="/#" className="text-white no-underline hover:text-yellow-300 flex flex-col ml-1">
                    LinkedIn
                  </a>
                </li>
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex">
                  <FaInstagram size="1.5em" color="white" className="flex flex-col " />
                  <a href="/#" className="text-white no-underline hover:text-yellow-300 flex flex-col ml-1">
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
    </footer>
  );
};

export default Footer;
