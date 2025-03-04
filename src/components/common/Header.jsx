import { Link } from "react-router";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
  return (
    <header className="bg-white shadow-md top-0 z-50 px-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">CookABook</Link>
        </div>
        <nav className="w-3xl">
          <ul className="flex lg:space-x-20 space-x-6 justify-center ">
            {/* <li className="Login">
              <Link
                to="/dang-nhap"
                className="text-gray-600 hover:text-gray-900"
              >
                Đăng nhập
              </Link>
            </li> */}
            {/* <li className="Register">
              <Link to="/dang-ky" className="text-gray-600 hover:text-gray-900">
                Đăng ký
              </Link>
            </li> */}

            <li className="Home">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Trang chủ
              </Link>
            </li>
            <li className="Books">
              <Link to="/sach" className="text-gray-600 hover:text-gray-900">
                Sách
              </Link>
            </li>
            <li className="News">
              <Link to="/tin-tuc" className="text-gray-600 hover:text-gray-900">
                Tin tức
              </Link>
            </li>
            <li className="Admin">
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </li>
            {/* <li className="Cart">
              <Link to="/gio-hang" className="text-gray-600 hover:text-gray-900">
                <BsCart3 className="size-6 " />
              </Link>
            </li> */}
            {/*<li className="About">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li> */}
          </ul>
        </nav>
        <nav className="flex space-x-10 items-center">
          <ul className="Login w-20 ">
            <Link to="/dang-nhap" className="text-gray-600 hover:text-gray-900 ">
              Đăng nhập
            </Link>
          </ul>
          <ul className="Cart">
            <Link to="/gio-hang" className="text-gray-700 hover:text-gray-900">
              <div className="bg-gray-400 p-1 rounded">
                <BsCart3 className="size-6  ml-auto" />
              </div>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
