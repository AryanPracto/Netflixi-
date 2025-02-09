import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/regHome')
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email, 
        password, 
      });

      localStorage.setItem('token',response.data.token)

      if(response.data.subId===1 || response.data.subId===3 || response.data.subId===2 ){
        navigate('/success')
      }else{
        navigate("/regHome"); 
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error during login:", err.response || err.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="cont">
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p className="signup-redirect">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
