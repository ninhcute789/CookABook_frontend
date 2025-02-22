import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">CookABook</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="text-gray-600 hover:text-gray-900">
                Recipes
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
