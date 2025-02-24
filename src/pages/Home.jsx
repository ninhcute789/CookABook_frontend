import book from '../assets/book-1.jpg';
import libra from '../assets/libra-3.jpg';
import { IoBookOutline } from "react-icons/io5";
import th1 from '../assets/th-1.jpg';
import th2 from '../assets/th-2.jpg';
import th3 from '../assets/th-3.jpg';
import th4 from '../assets/th-4.jpg';
import th5 from '../assets/th-5.jpg';
import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';

const Home = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <>
            <div className="container mx-auto p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${libra})` }}>
                <div className="flex flex-col xl:flex-row justify-between items-center space-y-4 xl:space-y-0 xl:space-x-4 relative">
                    <div className="flex flex-col space-y-2 
                    absolute xl:relative z-10 bottom-0 left-0 
                    bg-amber-400 p-5 rounded-lg mt-auto">
                        <div className='space-y-2 border-dashed border-2 p-5 rounded-lg'>
                            <p className="text-lg font-bold text-center">5000+</p>
                            <p className="text-sm">Thành viên đã <br /> đọc tựa sách!!!</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 max-w-xl mt-10">
                        <div className="text-5xl font-semibold text-white w-3/4">Độ Nhiễu: Sai Lầm Trong Phán Đoán</div>
                        <div className="text-3xl text-amber-300">Daniel Kahneman</div>
                        <div className="text-x text-white w-5/6">
                            Một lựa chọn tuyệt vời cho những ai yêu thích tìm hiểu tâm lý và khoa học hành vi.</div>
                        <div className="text-x text-white w-5/6">Cuốn sách phân tích sâu về “độ nhiễu” trong các quyết định,
                            từ y tế đến kinh tế, và chỉ ra cách giảm thiểu những sai
                            lệch không cần thiết để cải thiện chất lượng phán đoán…</div>
                        <button className="px-4 py-2 bg-amber-300 text-black font-medium rounded hover:bg-amber-500 w-28">Đọc ngay</button>
                        <div className="text-xs text-white">* eBook bao gồm iBooks, PDF và các bản ePub</div>
                    </div>
                    <div className="flex-shrink-0">
                        <img src={book} alt="Book cover" className='w-96 h-auto shadow-2xl' />
                    </div>
                </div>
            </div>

            <div>
                <div className='container mx-auto space-y-2 py-16'>
                    <div className='flex justify-center items-center space-x-2 text-red-600'>
                        <IoBookOutline className='size-7' />
                        <div className='text-xl font-medium'>CHÚNG TÔI LÀM GÌ?</div>
                    </div>
                    <div className='text-center text-4xl font-bold w-2/3 mx-auto'>
                        Chúng tôi giúp bạn mở khóa tiềm năng và
                        xây dựng một tương lai tươi sáng thông qua sức mạnh của sách.
                    </div>
                </div>
                <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2
                    xl:grid-cols-3 w-2/3 space-y-4 '>

                    <div className={scrollPosition >= 120 ? 'fade-in 1 flex flex-col relative mb-20 mx-2 h-80'
                        : 'fade-out 1 flex flex-col relative mb-20 mx-2 h-80'}>
                        <div className='md:w-2/3 md:absolute 
                                top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                                space-y-2 rounded-lg'>
                            <div className='text-xl font-medium'>Khám Phá Cuốn Sách Mới Mỗi Ngày</div>
                            <div className='text-gray-500'>Mỗi ngày là một cơ hội để tìm
                                ra cuốn sách mới sẽ chinh phục bạn,
                                mang đến những câu chuyện, kiến thức mới mẻ.
                            </div>
                            <NavLink className=" text-amber-500 hover:underline">Thêm thông tin</NavLink>
                        </div>
                        <div className='md:absolute right-0 bottom-0'>
                            <img src={th5} className='md:w-full rounded' />
                        </div>

                    </div>
                    <div className={scrollPosition >= 120 ? 'fade-in 2 flex flex-col relative mb-20 mx-2 h-80'
                        : 'fade-out 2 flex flex-col relative mb-20 mx-2 h-80'}>
                        <div className='md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg'>
                            <div className='text-xl font-medium'>Khám Phá Bộ Sưu Tập Sách Đặc Sắc</div>
                            <div className='text-gray-500'>Bộ sưu tập sách của chúng tôi
                                bao gồm những lựa chọn nổi bật và được yêu thích,
                                giúp bạn dễ dàng tìm thấy những cuốn sách phù hợp.
                            </div>
                            <NavLink className=" text-amber-500 hover:underline">Thêm thông tin</NavLink>
                        </div>
                        <div className='md:absolute right-0 bottom-0'>
                            <img src={th2} className='md:w-full rounded' />
                        </div>

                    </div>
                    <div className={scrollPosition >= 120 ? 'fade-in 3 flex flex-col relative mb-20 mx-2 h-80'
                        : 'fade-out 3 flex flex-col relative mb-20 mx-2 h-80'}>
                        <div className='md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg'>
                            <div className='text-xl font-medium'>Tìm Kiếm Sách Theo Sở Thích Của Bạn</div>
                            <div className='text-gray-500'>Tìm những cuốn sách phù hợp với
                                sở thích và nhu cầu đọc của bạn, từ các thể loại khác nhau đến
                                những chủ đề chuyên sâu.
                            </div>
                            <NavLink className=" text-amber-500 hover:underline">Thêm thông tin</NavLink>
                        </div>
                        <div className='md:absolute right-0 bottom-0'>
                            <img src={th3} className='md:w-full rounded' />
                        </div>

                    </div>
                    <div className={scrollPosition >= 500 ? 'fade-in 4 flex flex-col relative mb-20 mx-2 h-80'
                        : 'fade-out 4 flex flex-col relative mb-20 mx-2 h-80'}>
                        <div className='md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg'>
                            <div className='text-xl font-medium'>Sách Mới Nhất Cập Nhật Hàng Ngày</div>
                            <div className='text-gray-500'>Khám phá những cuốn sách mới nhất vừa
                                ra mắt, luôn được cập nhật liên tục để bạn không bỏ lỡ những tác
                                phẩm hot nhất.
                            </div>
                            <NavLink className=" text-amber-500 hover:underline">Thêm thông tin</NavLink>
                        </div>
                        <div className='md:absolute right-0 bottom-0'>
                            <img src={th2} className='md:w-full rounded' />
                        </div>

                    </div>
                    <div className={scrollPosition >= 500 ? 'fade-in 5 flex flex-col relative mb-20 mx-2 h-80'
                        : 'fade-out 5 flex flex-col relative mb-20 mx-2 h-80'}>
                        <div className='md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg'>
                            <div className='text-xl font-medium'>Sách Được Độc Giả Yêu Thích</div>
                            <div className='text-gray-500'>Những cuốn sách nhận được nhiều đánh
                                giá tích cực từ độc giả, giúp bạn dễ dàng tìm ra lựa chọn hoàn hảo
                                cho mình.
                            </div>
                            <NavLink className=" text-amber-500 hover:underline">Thêm thông tin</NavLink>
                        </div>
                        <div className='md:absolute right-0 bottom-0'>
                            <img src={th3} className='md:w-full rounded' />
                        </div>

                    </div>
                    <div className={scrollPosition >= 500 ? 'fade-in 6 flex flex-col relative mb-40 mx-2 h-80'
                        : 'fade-out 6 flex flex-col relative mb-40 mx-2 h-80'}>
                        <div className='md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg'>
                            <div className='text-xl font-medium'>Sách Cho Mọi Lứa Tuổi</div>
                            <div className='text-gray-500'>Dành cho mọi lứa tuổi và
                                nhu cầu đọc, từ sách thiếu nhi đến các tác phẩm dành
                                cho người trưởng thành, mỗi độ tuổi đều có những lựa chọn phù hợp.
                            </div>
                            <NavLink className=" text-amber-500 hover:underline">Thêm thông tin</NavLink>
                        </div>
                        <div className='md:absolute right-0 bottom-0'>
                            <img src={th4} className='md:w-full rounded' />
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Home;