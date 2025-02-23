import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route path='dang-nhap' element={<Login />} />
        <Route path='dang-ky' element={<Register />} />
        <Route index element={<Home />} />
        <Route path='admin' element={<Admin />} />
        <Route path='about' element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
