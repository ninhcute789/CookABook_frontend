import book from "../assets/book-1.jpg";
import libra from "../assets/libra-3.jpg";
import { IoBookOutline } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { LuCalendarFold } from "react-icons/lu";
// import th1 from "../assets/th-1.jpg";
import th2 from "../assets/th-2.jpg";
import th3 from "../assets/th-3.jpg";
import th4 from "../assets/th-4.jpg";
import th5 from "../assets/th-5.jpg";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
import b3 from "../assets/books/b3.webp";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import BannerDeal from "../components/banner/BannerDeal";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import SidebarArticles from "../components/sideBar/SidebarArticles";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const truncateDate = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ")
      : text;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState();
  const [Selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error(
            "❌ Không tìm thấy token! Người dùng có thể chưa đăng nhập."
          );
          return;
        }

        const res = await axios.get("http://localhost:8080/api/v1/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("✅ Dữ liệu API trả về:", res.data);
        setArticles(res.data?.data?.data || []);
        // console.log("Danh sách bài báo:", res.data?.data?.data);
      } catch (error) {
        console.error(
          "❌ Lỗi khi lấy danh sách bài báo:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p className="text-center">Đang tải...</p>;
  return (
    <>
      <div
        className="home banner container mx-auto p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${libra})` }}
      >
        <div className="flex flex-col xl:flex-row justify-between items-center space-y-4 xl:space-y-0 relative">
          <div
            className="flex flex-col space-y-2 
                    absolute xl:relative z-10 bottom-0 left-10 2xl:left-30
                    bg-amber-400 p-5 rounded-lg mt-auto"
          >
            <div className="space-y-2 border-dashed border-2 p-2 rounded-lg">
              <p className="text-lg font-bold text-center">5000+</p>
              <p className="text-sm">
                Thành viên đã <br /> đọc tựa sách!!!
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 max-w-xl mt-10">
            <div className="text-5xl font-semibold text-white w-3/4">
              Độ Nhiễu: Sai Lầm Trong Phán Đoán
            </div>
            <div className="text-[40px] text-amber-300">Daniel Kahneman</div>
            <div className="text-x text-white w-5/6">
              Một lựa chọn tuyệt vời cho những ai yêu thích tìm hiểu tâm lý và
              khoa học hành vi.
            </div>
            <div className="text-x text-white w-5/6">
              Cuốn sách phân tích sâu về “độ nhiễu” trong các quyết định, từ y
              tế đến kinh tế, và chỉ ra cách giảm thiểu những sai lệch không cần
              thiết để cải thiện chất lượng phán đoán…
            </div>
            <button
              className="px-4 py-2 bg-amber-300 text-black font-medium rounded 
                            hover:bg-amber-500 w-28
                            cursor-pointer"
            >
              Mua ngay
            </button>
            <div className="text-xs text-white">
              * eBook bao gồm iBooks, PDF và các bản ePub
            </div>
          </div>
          <div className="flex-shrink-0 2xl:-translate-x-40 xl:-translate-x-25 ">
            <img
              src={book}
              alt="Book cover"
              className="w-96 h-auto shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="chung toi lam gi">
        <div className="container mx-auto space-y-2 py-16">
          <div className="flex justify-center items-center space-x-2 text-red-600">
            <IoBookOutline className="size-7" />
            <div className="text-xl font-medium">CHÚNG TÔI LÀM GÌ?</div>
          </div>
          <div className="text-center text-4xl font-bold w-2/3 mx-auto">
            Chúng tôi giúp bạn mở khóa tiềm năng và xây dựng một tương lai tươi
            sáng thông qua sức mạnh của sách.
          </div>
        </div>
        <div
          className="container mx-auto grid grid-cols-1 lg:grid-cols-2
                    xl:grid-cols-3 w-2/3 space-y-4 "
        >
          <div
            className={
              scrollPosition >= 220
                ? "pop-up 1 flex flex-col relative mb-20 mx-2 h-80"
                : "opacity-0 1 flex flex-col relative mb-20 mx-2 h-80"
            }
          >
            <div
              className="md:w-2/3 md:absolute 
                                top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                                space-y-2 rounded-lg"
            >
              <div className="text-xl font-medium">
                Khám Phá Cuốn Sách Mới Mỗi Ngày
              </div>
              <div className="text-gray-500">
                Mỗi ngày là một cơ hội để tìm ra cuốn sách mới sẽ chinh phục
                bạn, mang đến những câu chuyện, kiến thức mới mẻ.
              </div>
              <NavLink className=" text-amber-500 hover:underline">
                Thêm thông tin
              </NavLink>
            </div>
            <div className="md:absolute right-0 bottom-0">
              <img src={th5} className="md:w-full rounded" />
            </div>
          </div>
          <div
            className={
              scrollPosition >= 220
                ? "pop-up 2 flex flex-col relative mb-20 mx-2 h-80"
                : "opacity-0 2 flex flex-col relative mb-20 mx-2 h-80"
            }
          >
            <div
              className="md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg"
            >
              <div className="text-xl font-medium">
                Khám Phá Bộ Sưu Tập Sách Đặc Sắc
              </div>
              <div className="text-gray-500">
                Bộ sưu tập sách của chúng tôi bao gồm những lựa chọn nổi bật và
                được yêu thích, giúp bạn dễ dàng tìm thấy những cuốn sách phù
                hợp.
              </div>
              <NavLink className=" text-amber-500 hover:underline">
                Thêm thông tin
              </NavLink>
            </div>
            <div className="md:absolute right-0 bottom-0">
              <img src={th2} className="md:w-full rounded" />
            </div>
          </div>
          <div
            className={
              scrollPosition >= 220
                ? "pop-up 3 flex flex-col relative mb-20 mx-2 h-80"
                : "opacity-0 3 flex flex-col relative mb-20 mx-2 h-80"
            }
          >
            <div
              className="md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg"
            >
              <div className="text-xl font-medium">
                Tìm Kiếm Sách Theo Sở Thích Của Bạn
              </div>
              <div className="text-gray-500">
                Tìm những cuốn sách phù hợp với sở thích và nhu cầu đọc của bạn,
                từ các thể loại khác nhau đến những chủ đề chuyên sâu.
              </div>
              <NavLink className=" text-amber-500 hover:underline">
                Thêm thông tin
              </NavLink>
            </div>
            <div className="md:absolute right-0 bottom-0">
              <img src={th3} className="md:w-full rounded" />
            </div>
          </div>
          <div
            className={
              scrollPosition >= 600
                ? "pop-up 4 flex flex-col relative mb-20 mx-2 h-80"
                : "opacity-100 4 flex flex-col relative mb-20 mx-2 h-80"
            }
          >
            <div
              className="md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg"
            >
              <div className="text-xl font-medium">
                Sách Mới Nhất Cập Nhật Hàng Ngày
              </div>
              <div className="text-gray-500">
                Khám phá những cuốn sách mới nhất vừa ra mắt, luôn được cập nhật
                liên tục để bạn không bỏ lỡ những tác phẩm hot nhất.
              </div>
              <NavLink className=" text-amber-500 hover:underline">
                Thêm thông tin
              </NavLink>
            </div>
            <div className="md:absolute right-0 bottom-0">
              <img src={th2} className="md:w-full rounded" />
            </div>
          </div>
          <div
            className={
              scrollPosition >= 600
                ? "pop-up 5 flex flex-col relative mb-20 mx-2 h-80"
                : "opacity-100 5 flex flex-col relative mb-20 mx-2 h-80"
            }
          >
            <div
              className="md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg"
            >
              <div className="text-xl font-medium">
                Sách Được Độc Giả Yêu Thích
              </div>
              <div className="text-gray-500">
                Những cuốn sách nhận được nhiều đánh giá tích cực từ độc giả,
                giúp bạn dễ dàng tìm ra lựa chọn hoàn hảo cho mình.
              </div>
              <NavLink className=" text-amber-500 hover:underline">
                Thêm thông tin
              </NavLink>
            </div>
            <div className="md:absolute right-0 bottom-0">
              <img src={th3} className="md:w-full rounded" />
            </div>
          </div>
          <div
            className={
              scrollPosition >= 600
                ? "pop-up 6 flex flex-col relative mb-20 mx-2 h-80"
                : "opacity-100 6 flex flex-col relative mb-20 mx-2 h-80"
            }
          >
            <div
              className="md:w-2/3 md:absolute 
                        top-0 left-0 z-10 bg-white shadow-2xl shadow-black p-5
                        space-y-2 rounded-lg"
            >
              <div className="text-xl font-medium">Sách Cho Mọi Lứa Tuổi</div>
              <div className="text-gray-500">
                Dành cho mọi lứa tuổi và nhu cầu đọc, từ sách thiếu nhi đến các
                tác phẩm dành cho người trưởng thành, mỗi độ tuổi đều có những
                lựa chọn phù hợp.
              </div>
              <NavLink className=" text-amber-500 hover:underline">
                Thêm thông tin
              </NavLink>
            </div>
            <div className="md:absolute right-0 bottom-0">
              <img src={th4} className="md:w-full rounded" />
            </div>
          </div>
        </div>
      </div>

      <BannerDeal />

      <div className="tin tuc tu chung toi  p-4 bg-cover bg-center">
        <div className="container mx-auto space-y-2 py-16">
          <div className="flex justify-center items-center space-x-2 text-red-600">
            <FaEarthAsia className="size-7" />
            <div className="text-xl font-medium uppercase">
              Tin tức từ chúng tôi
            </div>
          </div>
          <div className="text-center text-4xl font-bold w-2/3 mx-auto">
            Chúng tôi giúp bạn mở khóa tiềm năng và xây dựng một tương lai tươi
            sáng thông qua sức mạnh của sách.
          </div>
        </div>

        <div className="grid max-w-6xl mx-auto grid-cols-1">
          <div className=" px-10 pb-10">
            {/* <h2 className="text-xl font-bold mb-4">Danh sách bài báo</h2> */}
            {articles.length === 0 ? (
              <p className="text-gray-500">Không có bài báo nào!</p>
            ) : (
              <div
                className={`grid gap-2 
                ${Selected ? "grid-cols-1" : 
                  "grid-cols-1 [@media(min-width:910px)]:grid-cols-2 [@media(max-width:910px)]:w-2/3 [@media(max-width:910px)]:mx-auto"}`}
              >
                {!Selected ? (
                  articles
                    .slice(0, 4)
                    .reverse()
                    .map(
                      (
                        article // Đảo ngược thứ tự bài viết
                      ) => (
                        <div
                          key={article.id}
                          className="img4 flex justify-center items-center
                     shadow-xl mb-4 mr-2 bg-white p-2
                    xl:flex-row flex-col"
                        >
                          <div className="flex flex-col space-y-2 ">
                            {article.imageURL && (
                              <img
                                src={article.imageURL}
                                className="h-50 w-50 p-1 object-cover rounded-md "
                              />
                            )}
                          </div>
                          <div className="flex flex-col space-y-2 px-5 my-5 w-2/3">
                            <div>
                              <button
                                className="bg-gray-400  
                                text-cyan-800 font-bold py-1 
                                text-xs px-3 rounded hover:bg-yellow-500 
                                hover:text-black transition-all duration-200
                                cursor-pointer"
                                onClick={() => {
                                  setSelected(true);
                                  setArticle(article);
                                }}
                              >
                                Tin tức
                              </button>
                            </div>
                            <div className="  justify-between grid sm:grid-cols-2 grid-cols-1">
                              <div className="flex">
                                <div>
                                  <LuCalendarFold className="translate-y-1 mr-1" />
                                </div>
                                <div>{truncateDate(article.createdAt, 1)}</div>
                              </div>
                              <div className="flex sm:ml-auto">
                                <div>
                                  <FaUser className="translate-y-1 mr-1" />
                                </div>
                                <div>By {article.user?.name}</div>
                              </div>
                            </div>
                            <div>
                              <NavLink
                                to="#"
                                className="font-bold hover:text-yellow-500 duration-200 transition-all"
                                onClick={() => {
                                  setSelected(true);
                                  setArticle(article);
                                }}
                              >
                                {truncateText(article.title,10)}
                              </NavLink>
                            </div>
                            <div className=" xl:mb-0 mb-10">
                              {truncateText(article.content, 10)}
                            </div>
                          </div>
                        </div>
                      )
                    )
                ) : (
                  <div className="flex ">
                    <div className="w-4/5">
                      <button
                        onClick={() => {
                          setSelected(null)
                        }}
                        className="mb-4 px-4 py-2 hover:opacity-50 mt-5
                            bg-gray-200 rounded hover:cursor-pointer"
                      >
                        <IoIosArrowBack className="inline-block -translate-y-0.5 -translate-x-1" />
                        Quay lại
                      </button>
                      <h2 className="text-2xl font-bold ">{article.title}</h2>
                      <p className="text-gray-600">
                        Bởi {article.user?.name} - {article.createdAt}
                      </p>
                      <img
                        src={article.imageURL}
                        alt={article.title}
                        className=" max-h-96 object-cover rounded-md my-4 mx-auto"
                      />
                      <p className="min-h-96">{article.content}</p>
                    </div>
                    <SidebarArticles
                      newsArticles={articles} // ✅ Truyền dữ liệu từ JSON
                      setArticle={setArticle}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {/* <div
            className="img4 flex justify-center items-center
                    w-fit shadow-emerald-950 shadow-md mr-4 mb-4 rounded
                    xl:flex-row flex-col"
          >
            <div className="flex flex-col space-y-2 ">
              <img src={s4} className="max-h-96 object-cover rounded " />
            </div>
            <div className="flex flex-col space-y-2 px-5 my-5">
              <div>
                <button
                  className="bg-gray-400  
                                text-cyan-800 font-bold py-1 
                                text-xs px-3 rounded hover:bg-yellow-500 
                                hover:text-black transition-all duration-200
                                cursor-pointer"
                >
                  Tin tức
                </button>
              </div>
              <div className="flex w-9/10 justify-between">
                <div className="flex">
                  <div>
                    <LuCalendarFold className="translate-y-1 mr-1" />
                  </div>
                  <div>Th11 24, 2024</div>
                </div>
                <div className="flex ">
                  <div>
                    <FaUser className="translate-y-1 mr-1" />
                  </div>
                  <div>by hai múa</div>
                </div>
              </div>
              <div>
                <NavLink
                  to="#"
                  className="font-bold hover:text-yellow-300 duration-200 transition-all"
                >
                  Phá vỡ khuôn mẫu: Hành trình chữa lành từ những tổn thương
                </NavLink>
              </div>
              <div className="w-3/4 xl:mb-0 mb-10">
                Tháng 11/2024, Phá vỡ khuôn mẫu ra mắt ấn tượng. Cuốn sách khám
                phá tâm lý học và…
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
