import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import AdminBooks from "./pages/AdminBooks.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminNews from "./pages/AminNews.jsx";
import News from "./pages/News.jsx";
import Cart from "./pages/Cart.jsx";
import Books from "./pages/Books.jsx";
import Contact from "./pages/Contact.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import AdminAuthors from "./pages/AdminAuthors.jsx";

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

        <Route path="về-chúng-tôi" element={<About />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="tin-tức" element={<News />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="gio-hang" element={<Cart />} />
        {/* <Route path='admin' element={<Admin />} />
        <Route path='admin-books' element={<AdminBooks />} />
        <Route path='admin-orders' element={<AdminOrders />} />
        <Route path='admin-users' element={<AdminUsers />} />
        <Route path='admin-news' element={<AdminNews />} /> */}

        <Route path="admin" element={<Admin />}>
          <Route path="admin-books" element={<AdminBooks />} />
          <Route path="admin-orders" element={<AdminOrders />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="admin-news" element={<AdminNews />} />
          <Route path="admin-authors" element={<AdminAuthors />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
