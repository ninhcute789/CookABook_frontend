import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from "react-router";
import { RiBookShelfLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";

const SideBar = () => {
    const [outlineState, setOutlineState] = useState(false);

    const outLine = () => {
        setOutlineState(!outlineState);
    }

    return (
        <>
            {outlineState === false ?
                <div className="relative top-0 left-0 w-52 min-h-96 bg-gray-700 text-white transition-all duration-300 ease-in-out">
                    <div className="h-10">
                        <HiOutlineBars3 className="absolute top-2 right-2 cursor-pointer size-8
                         bg-white text-gray-700 rounded" onClick={() => outLine()} />
                    </div>
                    <hr className="my-5 w-5/6 mx-auto fade-in" />
                    <div className=" pl-3 pr-3 space-y-4 goes-in">
                        <NavLink to='/admin/admin-books' className="text-xl flex hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1">
                            <RiBookShelfLine className="translate-y size-7 mr-3" />
                            Book Lists
                        </NavLink>
                        <NavLink to='/admin/admin-orders' className="text-xl flex hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1">
                            <BsCart3 className="translate-y size-7 mr-3" />
                            Orders
                        </NavLink>
                        <NavLink to='/admin/admin-users' className="text-xl flex hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1">
                            <FaRegCircleUser className="translate-y size-7 mr-3" />
                            Users
                        </NavLink>
                        <NavLink to='/admin/admin-news' className="text-xl flex hover:bg-gray-400 rounded w-full hover:translate-x-2 transition-all p-1">
                            <FaNewspaper className="translate-y size-7 mr-3" />
                            News
                        </NavLink>

                        {/* <div className="hover:bg-gray-400 rounded flex hover:translate-x-2 transition-all p-1">
                            <BsCart3 className="translate-y size-7 mr-3" />
                            <NavLink to='/admin-orders' className="text-xl">Orders</NavLink>
                        </div>
                        <div className="hover:bg-gray-400 rounded flex hover:translate-x-2 transition-all p-1">
                            <FaRegCircleUser className="translate-y size-7 mr-3" />
                            <NavLink to='/admin-users' className="text-xl">Users</NavLink>
                        </div> */}
                        {/* <li>About</li>
                        <li>Contact</li> */}
                    </div>
                    <hr className="my-5 w-5/6 mx-auto fade-in transition-all" />
                </div>
                :
                // <div className="relative top-0 left-0 w-13 min-h-96 bg-gray-700 text-white transition-all duration-300 ease-in-out">
                //     <HiOutlineBars3 className="absolute 
                //     top-2 right-2 cursor-pointer size-8
                //      bg-white text-gray-700 rounded" onClick={() => outLine()} />

                //     <hr className="my-5 w-5/6 mx-auto fade-in mt-15" />
                //     <div className=" pl-3 pr-3 space-y-6 goes-out ">
                //         <RiBookShelfLine className="translate-y size-7 mr-3"></RiBookShelfLine>
                //         <BsCart3 className="translate-y size-7 mr-3"></BsCart3>
                //         <FaRegCircleUser className="translate-y size-7 mr-3"></FaRegCircleUser>
                //     </div>
                //     <hr className="mt-7 w-5/6 mx-auto fade-in transition-all" />
                // </div>
                <div className="relative top-0 left-0 w-13 min-h-96 bg-gray-700 text-white transition-all duration-300 ease-in-out">
                    <div className="h-10">
                        <HiOutlineBars3 className="absolute top-2 right-2 cursor-pointer size-8
                         bg-white text-gray-700 rounded" onClick={() => outLine()} />
                    </div>
                    <hr className="my-5 w-5/6 mx-auto " />
                    <div className="space-y-4 goes-out mx-auto">
                        <NavLink to='/admin-books' className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1">
                            <RiBookShelfLine className="translate-y size-7 mx-auto" />
                        </NavLink>
                        <NavLink to='/admin-orders' className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1">
                            <BsCart3 className="translate-y size-7 mx-auto" />
                        </NavLink>
                        <NavLink to='/admin-users' className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1">
                            <FaRegCircleUser className="translate-y size-7 mx-auto" />
                        </NavLink>
                        <NavLink to='/admin-users' className="text-xl flex hover:bg-gray-400 rounded w-5/6 mx-auto transition-all p-1">
                            <FaNewspaper className="translate-y size-7 mx-auto" />
                        </NavLink>

                        {/* <div className="hover:bg-gray-400 rounded flex hover:translate-x-2 transition-all p-1">
                            <BsCart3 className="translate-y size-7 mr-3" />
                            <NavLink to='/admin-orders' className="text-xl">Orders</NavLink>
                        </div>
                        <div className="hover:bg-gray-400 rounded flex hover:translate-x-2 transition-all p-1">
                            <FaRegCircleUser className="translate-y size-7 mr-3" />
                            <NavLink to='/admin-users' className="text-xl">Users</NavLink>
                        </div> */}
                        {/* <li>About</li>
                        <li>Contact</li> */}
                    </div>
                    <hr className="my-5 w-5/6 mx-auto " />
                </div>
            }
        </>


    );
}

export default SideBar;