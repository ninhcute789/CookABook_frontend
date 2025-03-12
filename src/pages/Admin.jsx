import { NavLink, Outlet } from "react-router";
import SideBar from "../components/common/SideBar";
const Admin = () => {
    return (
        <div className="flex w-full bg-gray-100">
            <SideBar />
            <Outlet />
        </div>
    )
}

export default Admin;