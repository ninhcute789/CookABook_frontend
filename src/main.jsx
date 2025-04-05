import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import AdminBooks from "./pages/AdminBooks.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminNews from "./pages/AdminNews.jsx";
import News from "./pages/News.jsx";
import Books from "./pages/Books.jsx";
import Contact from "./pages/Contact.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import AdminAuthors from "./pages/AdminAuthors.jsx";
import AdminCategories from "./pages/AdminCategories.jsx";
// import AuthorsBooks from "./pages/AuthorsBooks.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Cart from "./pages/Cart.jsx";
import Address from "./pages/Address.jsx";
import Payment from "./pages/Payment.jsx";
import UserInfo from "./components/user/UserInfo.jsx";
import UserOrder from "./components/user/UserOrder.jsx";
import UserAddress from "./components/user/UserAddress.jsx";
import UserArticles from "./components/user/UserArticles.jsx";
import UserSupport from "./components/user/UserSupport.jsx";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="dang-nhap" element={<Login />} />
        <Route path="dang-ky" element={<Register />} />
        <Route index element={<Home />} />
        <Route path="sách" element={<Books />} />
        <Route path="sách/:id" element={<BookDetail />} />
        <Route path="sách/tác-giả/:idAuthor" element={<Books />} />

        <Route path="về-chúng-tôi" element={<About />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="tin-tức" element={<News />} />
        <Route path="gio-hang" element={<Cart />} />
        <Route path="dia-chi" element={<Address />} />
        <Route path="thanh-toan" element={<Payment />} />
        <Route path="thong-tin-tai-khoan" element={<UserProfile />}>
          <Route index element={<UserInfo />} />
          <Route path="dia-chi" element={<UserAddress />} />
          <Route path="don-hang" element={<UserOrder />} />
          <Route path="tin-tuc-cua-toi" element={<UserArticles />} />
          <Route path="ho-tro" element={<UserSupport />} />
        </Route>

        {/* <Route path='admin' element={<Admin />} />
        <Route path='admin-books' element={<AdminBooks />} />
        <Route path='admin-orders' element={<AdminOrders />} />
        <Route path='admin-users' element={<AdminUsers />} />
        <Route path='admin-news' element={<AdminNews />} /> */}

        <Route path="admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admin-books" element={<AdminBooks />} />
          <Route path="admin-orders" element={<AdminOrders />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="admin-news" element={<AdminNews />} />
          <Route path="admin-authors" element={<AdminAuthors />} />
          <Route path="admin-categories" element={<AdminCategories />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
