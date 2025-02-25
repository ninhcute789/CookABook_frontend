import { LuCalendarFold } from 'react-icons/lu';
import n1 from '../assets/n1.jpg';
import n2 from '../assets/n2.jpg';
import n3 from '../assets/n3.jpg';
import n4 from '../assets/n4.jpg';
import s1 from '../assets/s1.jpg';
import { FaUser } from 'react-icons/fa6';
import { NavLink } from 'react-router';
const News = () => {
  return (
    <div>
      <div className="h-80 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${n4})` }}>
        {/* <img src={n1} alt="" className='-z-1000'/> */}
        <h1 className="text-6xl text-white font-bold ">Tin tức</h1>
      </div>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-col-1 w-3/4 mx-auto my-10'>
        <div className='1 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-10'>
          <div>
            <img src={s1} alt="" className='max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm' />
          </div>
          <div className='text-2xl font-medium my-4'>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</div>
          <div className='flex justify-between'>
            <div className='font-bold '>24/11/2024</div>
            <div className='font-bold underline cursor-pointer'>hai múa</div>
          </div>
          <div className='text-cyan-800 my-3'>Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng thênh thang. Ông là tác giả nổi…</div>
          <NavLink to='/tin-tuc'className=' text-yellow-500'>Đọc thêm</NavLink>
        </div>
        <div className='2 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-10'>
          <div>
            <img src={s1} alt="" className='max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm' />
          </div>
          <div className='text-2xl font-medium my-4'>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</div>
          <div className='flex justify-between'>
            <div className='font-bold '>24/11/2024</div>
            <div className='font-bold underline cursor-pointer'>hai múa</div>
          </div>
          <div className='text-cyan-800 my-3'>Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng thênh thang. Ông là tác giả nổi…</div>
          <NavLink to='/tin-tuc'className=' text-yellow-500'>Đọc thêm</NavLink>
        </div>
        <div className='3 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-10'>
          <div>
            <img src={s1} alt="" className='max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm' />
          </div>
          <div className='text-2xl font-medium my-4'>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</div>
          <div className='flex justify-between'>
            <div className='font-bold '>24/11/2024</div>
            <div className='font-bold underline cursor-pointer'>hai múa</div>
          </div>
          <div className='text-cyan-800 my-3'>Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng thênh thang. Ông là tác giả nổi…</div>
          <NavLink to='/tin-tuc'className=' text-yellow-500'>Đọc thêm</NavLink>
        </div>
        <div className='4 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-10'>
          <div>
            <img src={s1} alt="" className='max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm' />
          </div>
          <div className='text-2xl font-medium my-4'>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</div>
          <div className='flex justify-between'>
            <div className='font-bold '>24/11/2024</div>
            <div className='font-bold underline cursor-pointer'>hai múa</div>
          </div>
          <div className='text-cyan-800 my-3'>Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng thênh thang. Ông là tác giả nổi…</div>
          <NavLink to='/tin-tuc'className=' text-yellow-500'>Đọc thêm</NavLink>
        </div>
        <div className='5 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-10'>
          <div>
            <img src={s1} alt="" className='max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm' />
          </div>
          <div className='text-2xl font-medium my-4'>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</div>
          <div className='flex justify-between'>
            <div className='font-bold '>24/11/2024</div>
            <div className='font-bold underline cursor-pointer'>hai múa</div>
          </div>
          <div className='text-cyan-800 my-3'>Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng thênh thang. Ông là tác giả nổi…</div>
          <NavLink to='/tin-tuc'className=' text-yellow-500'>Đọc thêm</NavLink>
        </div>
        <div className='6 mt-5 mx-3 rounded-2xl inset-shadow-xl shadow-lg border-y-4 border-yellow-500
        p-10'>
          <div>
            <img src={s1} alt="" className='max-h-90 mx-auto rounded  shadow-gray-100 shadow-sm' />
          </div>
          <div className='text-2xl font-medium my-4'>‘Đường rộng thênh thang’: Ứng dụng triết lý Phật giáo vào đời sống</div>
          <div className='flex justify-between'>
            <div className='font-bold '>24/11/2024</div>
            <div className='font-bold underline cursor-pointer'>hai múa</div>
          </div>
          <div className='text-cyan-800 my-3'>Tháng 11/2024, nhà văn Nguyễn Tường Bách ra mắt cuốn sách Đường rộng thênh thang. Ông là tác giả nổi…</div>
          <NavLink to='/tin-tuc'className=' text-yellow-500'>Đọc thêm</NavLink>
        </div>
        
        
      </div>
    </div>
  );
}
export default News;