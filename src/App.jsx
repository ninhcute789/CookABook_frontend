import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminBooks from "./pages/AdminBooks";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/books" element={<AdminBooks />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
