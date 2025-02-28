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
        <div className="footer-top flex pb-6 justify-center">
          <div className="text-white grid md:grid-cols-3 w-full md:w-6xl
          md:justify-between">
            <div className="1 pl-4 flex justify-center items-center md:mr-auto">
              <h1>
                <img src={logo} alt="alo" className="h-20 " />
              </h1>
            </div>
            <div className="2 py-3  flex text-sm md:justify-normal justify-center text-center md:text-left lg:-ml-40 font-avanta">
              Khám phá thế giới tri thức <br />
              với hàng ngàn đầu sách chất lượng!
            </div>
            <div className="3 flex justify-center bg-yellow-400 text-black mt-4 md:mt-0 md:ml-auto rounded">
              <div className="flex flex-col my-auto pl-3">
                <BsFillTelephoneFill size="2em" color="black " />
              </div>
              <div className="w-48 py-3.5 px-3 flex flex-col">
                <p className="mb-0">Gọi cho chúng tôi</p>
                <p className="font-bold text-xl">(+89)123 456 789</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10 mx-auto flex justify-center">
          <div className="grid text-white  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
          gap-4 bg-gray-800 w-full md:w-6xl p-10 rounded lg:pl-0">
            <div className="flex w-40  mx-auto flex-col columns mb-10 lg:ml-10">
              <h4 className="text-md sm:text-left ">Hỗ trợ</h4>
              <ul className="1 pl-0">
                <li className="mt-2">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li className="">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Hướng dẫn mua hàng
                  </a>
                </li>
                <li className="">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Hướng dẫn thanh toán
                  </a>
                </li>
                <li className=" ">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Hòm thư góp ý
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex w-40  mx-auto flex-col mb-10 ">
              <h4 className="text-md sm:text-left">Khách hàng</h4>
              <ul className="2 pl-0">
                <li className="mt-2">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách bảo hành
                  </a>
                </li>
                <li className="">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách bảo mật
                  </a>
                </li>
                <li className="">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách đổi - trả - hoàn tiền
                  </a>
                </li>
                <li className="">
                  <a href="/#" className="text-white text-[11px] opacity-50 no-underline hover:text-yellow-300 hover:translate-x-1 transition ease-in-out">
                    Chính sách vận chuyển
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex w-40  mx-auto flex-col columns mb-10 max-w-2xs">
              <h4 className="text-md sm:text-left">Tin tức</h4>
              <ul className="3 pl-0">
                <li className="mt-3 text-[11px]">
                  <p className="opacity-60 mb-0 ">24/11/2024</p>
                  <p>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</p>
                </li>
                <li className="mt-2 text-[11px]">
                  <p className="opacity-60 mb-0">24/11/2024</p>
                  <p>Sách khoa học ‘Một sức khỏe’: Sức khỏe con người và thiên nhiên</p>
                </li>
              </ul>
            </div>
            <div className="flex w-40  mx-auto  flex-col columns pl-0 lg:pl-10">
              <h4 className="text-md sm:text-left">Về chúng tôi</h4>
              <ul className="4 pl-0">
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex ">
                  <FaFacebook size="1em" color="white" className="flex flex-col text-center" />
                  <a href="/#" className="text-white text-[11px] no-underline hover:text-yellow-300 flex flex-col ml-1">
                    Facebook
                  </a>
                </li>
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex">
                  <BsTwitterX size="1em" color="white" className="flex flex-col " />
                  <a href="/#" className="text-white text-[11px] no-underline hover:text-yellow-300 flex flex-col ml-1">
                    Twitter
                  </a>
                </li>
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex">
                  <FaLinkedin size="1em" color="white" className="flex flex-col " />
                  <a href="/#" className="text-white text-[11px] no-underline hover:text-yellow-300 flex flex-col ml-1">
                    LinkedIn
                  </a>
                </li>
                <li className="text-white mt-4 hover:translate-x-2 transition ease-in duration-200 flex">
                  <FaInstagram size="1em" color="white" className="flex flex-col " />
                  <a href="/#" className="text-white text-[11px] no-underline hover:text-yellow-300 flex flex-col ml-1">
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
