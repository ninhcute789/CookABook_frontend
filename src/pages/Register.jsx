// import cr7 from '../assets/cr7.jpeg';
// import cr7_2 from '../assets/cr7_2.jpg';
// import cr7_3 from '../assets/cr7_3.jpg';
// import cr7_5 from '../assets/cr7_5.jpg';
import { FaUser } from "react-icons/fa";
import { LuCalendarFold } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { RiMoneyCnyBoxFill } from "react-icons/ri";
import { GiFrozenArrow } from "react-icons/gi";
import bg from '../assets/bg-10.jpg';
import { NavLink } from "react-router";
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const Register = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [rewirtePasswordType, setRewirtePasswordType] = useState('password');
    const [password, setPassword] = useState('');
    const [rewirtePassword, setRewirtePassword] = useState('');
    const [account, setAccount] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState('');


    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log('FirstName:', firstName);
        console.log('LastName:', lastName);
        console.log('Date:', date);
        console.log('Email:', email);
        console.log('Account:', account);
        console.log('Password:', password);
        console.log('RewirtePassword:', rewirtePassword);
        if (password !== rewirtePassword) {
            alert("Mật khẩu nhập lại không đúng");
        }
    }

    // const onPasswordChange = (e) => {
    //     setPassword(e.target.value);
    // }
    // const onRewirtePasswordChange = (e) => {
    //     setRewirtePassword(e.target.value);
    // }

    const SCROLL_OFFSET = 70; // Adjust this value based on your header height

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo({
                top: SCROLL_OFFSET,
                behavior: 'smooth'
            });
        }, [pathname]);

        return null;
    };



    return (
        <div className="Login-container flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}>
            <ScrollToTop />
            <div className="login-box text-white rounded-xl px-7 py-1 mt-2 
            bg-transparent border-2 backdrop-blur-xs max-w-sm w-full">
                <form action='' onSubmit={(e) => handleOnSubmit(e)}>
                    <h1 className="text-4xl text-center my-4 font-bold">Đăng ký</h1>
                    <p className="text-xs text-center mb-2">Tham gia ngay để trải nghiệm trang web</p>
                    <div className="flex space-x-1">
                        <div className="input-box flex-col w-full h-8 relative mb-1">
                            <input
                                type="text"
                                placeholder="Họ"
                                required
                                onChange={(e) => { setLastName(e.target.value) }}
                                className="flex flex-col w-full h-full bg-transparent
                                rounded-4xl pl-5 pr-14 placeholder:text-white
                                border-2 border-cyan-950 placeholder:text-sm text-sm" />
                            <RiMoneyCnyBoxFill className="flex flex-col size-5 my-auto absolute right-4 top-1.5" />
                        </div>
                        <div className="input-box flex-col w-full h-8 relative mb-1">
                            <input
                                type="text"
                                placeholder="Tên"
                                required
                                onChange={(e) => { setFirstName(e.target.value) }}
                                className="flex flex-col w-full h-full bg-transparent
                                rounded-4xl pl-5 pr-14 placeholder:text-white
                                border-2 border-cyan-950 placeholder:text-sm text-sm" />
                            <GiFrozenArrow className="flex flex-col size-5 my-auto absolute right-4 top-1.5" />
                        </div>
                    </div>
                    <div className="input-box flex w-full h-8 relative mb-1">
                        <div className="absolute top-0.5 left-6 text-[8px]">Ngày sinh</div>
                        <input
                            type="date"
                            placeholder=""
                            onChange={(e) => { setDate(e.target.value) }}
                            required
                            className=" flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 py-2 uppercase z-10
                        placeholder:text-sm text-sm" />
                        <LuCalendarFold className=" size-5  my-auto absolute right-4 top-1.5 cursor-pointer" />
                    </div>
                    
                    <div className="input-box flex w-full h-8 relative mb-1">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 placeholder:text-sm text-sm" />
                        <MdOutlineMail className="flex flex-col size-5 my-auto absolute right-4 top-1.5" />
                    </div>
                    <div className="input-box flex w-full h-8 relative mb-1">
                        <input
                            type="text"
                            placeholder="Tài khoản"
                            required
                            onChange={(e) => { setAccount(e.target.value) }}
                            className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 placeholder:text-sm text-sm" />
                        <FaUser className="flex flex-col size-5 my-auto absolute right-4 top-1.5" />
                    </div>
                    <div className="input-box flex w-full h-8 relative mb-1">
                        <input
                            type={passwordType}
                            placeholder="Mật khẩu"
                            required
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 placeholder:text-sm text-sm" />
                        {passwordType === 'password'
                            ? <FaEyeSlash className="flex flex-col size-5 my-auto absolute right-4 top-1.5 cursor-pointer" onClick={() => { setPasswordType('text') }} />
                            : <FaEye className="flex flex-col size-5 my-auto absolute right-4 top-1.5 cursor-pointer" onClick={() => { setPasswordType('password') }} />
                        }
                    </div>
                    <div className="input-box flex w-full h-8 relative mb-2">
                        <input
                            type={rewirtePasswordType}
                            placeholder="Nhập lại mật khẩu"
                            required
                            onChange={(e) => { setRewirtePassword(e.target.value) }}
                            className="flex flex-col w-full h-full bg-transparent
                        rounded-4xl pl-5 pr-14 placeholder:text-white
                        border-2 border-cyan-950 placeholder:text-sm text-sm" />
                        {rewirtePasswordType === 'password'
                            ? <FaEyeSlash className="flex flex-col size-5 my-auto absolute right-4 top-1.5 cursor-pointer" onClick={() => { setRewirtePasswordType('text') }} />
                            : <FaEye className="flex flex-col size-5 my-auto absolute right-4 top-1.5 cursor-pointer" onClick={() => { setRewirtePasswordType('password') }} />
                        }
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black h-10 rounded-4xl shadow-2xl
                        font-bold text-xl hover:bg-black hover:text-white transition-all duration-300">
                        Đăng Ký
                    </button>
                    <div className="signup text-center my-4 text-xs text-white">
                        Bạn đã có tài khoản? <NavLink to="/dang-nhap" className="font-bold hover:underline">Đăng nhập ngay</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register;