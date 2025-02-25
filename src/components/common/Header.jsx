import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto  py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">CookABook</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="Login">
              <Link to="/dang-nhap" className="text-gray-600 hover:text-gray-900">
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
            <li className="Admin">
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </li>
            {/*<li className="About">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
