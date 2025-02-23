import './index.css';
import Footer from './components/common/Footer.jsx';
import Header from './components/common/Header.jsx';
import { Outlet } from "react-router-dom";
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import cr7Image from './assets/cr7.jpg';




const App = () => {

  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sideNav-container'>

        </div>
        <div className='app-content'>
          <Outlet />
        </div>
        {/* <div className='h-lvh'>
          height div
          <img src={cr7Image}
            className='transform  transition-all 
            hover:scale-125' alt='asdasd'
          />
        </div> */}
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  );
}

export default App;