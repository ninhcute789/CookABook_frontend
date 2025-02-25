import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from "react-router";
import { RiBookShelfLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";

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
                        <div className="hover:bg-gray-400 rounded flex hover:translate-x-2 transition-all p-1">
                            <RiBookShelfLine className="translate-y size-7 mr-3" />
                            <NavLink to='/admin-books' className="text-xl">Book Lists</NavLink>
                        </div>
                        <div className="hover:bg-gray-400 rounded flex hover:translate-x-2 transition-all p-1">
                            <BsCart3 className="translate-y size-7 mr-3" />
                            <NavLink to='/admin-orders' className="text-xl">Orders</NavLink>
                        </div>
                        <div className="hover:bg-gray-400 rounded flex hover:translate-x-2 transition-all p-1">
                            <FaRegCircleUser className="translate-y size-7 mr-3" />
                            <NavLink to='/admin-users' className="text-xl">Users</NavLink>
                        </div>
                        {/* <li>About</li>
                        <li>Contact</li> */}
                    </div>
                    <hr className="my-5 w-5/6 mx-auto fade-in"/>
                </div>
                :
                <div className="relative top-0 left-0 w-13 min-h-96 bg-gray-700 text-white transition-all duration-300 ease-in-out">
                    <HiOutlineBars3 className="absolute 
                    top-2 right-2 cursor-pointer size-8
                     bg-white text-gray-700 rounded" onClick={() => outLine()} />
                    {/* <ul>
                        <li>Home</li>
                        <li>Products</li>
                        <li>Services</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul> */}
                </div>
            }
        </>


    );
}

export default SideBar;