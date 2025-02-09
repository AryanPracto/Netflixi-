import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import "./Signup.css"; 

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/regHome")
    }
  },[])

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/signup", {
        name, 
        email, 
        password, 
      });
      localStorage.setItem('token',response.data.token);
      
      navigate("/regHome"); 

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Sign up failed. Please try again.");
      alert("error in signup")
      console.error(err.response || err.message); 
    }
  };

  return (
    <div className="cont">
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <button type="submit" className="signup-btn" >
           Sign Up
        </button> 
      </form>

      <p className="login-redirect">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
    </div>
  );
};

export default Signup;
