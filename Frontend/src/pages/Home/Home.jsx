import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom'; 
import logo_img from './images/logo.png';

const Home = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/regHome')
    }
  },[])

  return (
    <>
      <div className="header">
        <nav> <Link to='/'><img src={logo_img} className="logo" alt="Netflix Logo" /></Link>
          <div>
              <Link to="/signup">
                <button>SignUp/Login</button>  
              </Link>
          </div>
        </nav>
        <div className="header-content">
          <h1>Unlimited Movies, TV Shows and more ..</h1>
          <h3>Watch anywhere, cancel anytime</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
