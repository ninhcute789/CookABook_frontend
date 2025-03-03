import { Link } from "react-router";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between space-x-40 items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">CookABook</Link>
        </div>
        <nav className="w-3xl">
          <ul className="flex space-x-6 md:justify-between ">
            <li className="Login">
              <Link
                to="/dang-nhap"
                className="text-gray-600 hover:text-gray-900"
              >
                Đăng nhập
              </Link>
            </li>
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
        <nav className="">
          <ul className="Cart">
            <Link to="/gio-hang" className="text-white hover:text-gray-900">
              <div className="bg-gray-600 p-1 rounded">
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
