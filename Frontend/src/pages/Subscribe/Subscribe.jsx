import React, { useEffect, useState } from 'react';
import './Subscribe.css';
import logo_img from '../Home/images/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const plans = [
  { name: "Basic", price: 149, devices: 1, duration: "1 Month" },
  { name: "Advanced", price: 349, devices: 3, duration: "3 Months" },
  { name: "Premium", price: 549, devices: 5, duration: "6 Months" }
];

const Subscribe = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(plans[0].name); 

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName')
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      email,
      plan: selectedPlan
    };

    try {
      const response = await axios.post('http://localhost:5000/api/v1/payment/checkout', requestData);
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Something went wrong during payment. Please try again.');
    }
  };

  return (
    <>
      <div className="header">
        <nav>
          <img src={logo_img} className="logo" alt="Netflix Logo" />
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <div className="subs">
          <div className="subscription-container">
          <h2>Choose Your Plan</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Your email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <p className='abv'>select your plan : </p>

            {/* Plan Selection Cards */}
            <div className="plans">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`plan-card ${selectedPlan === plan.name ? "selected" : ""}`}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  <h3>{plan.name}</h3>
                  <p>Price: ₹{plan.price}</p>
                  <p>Devices: {plan.devices}</p>
                  <p>Duration: {plan.duration}</p>
                </div>
              ))}
            </div>

            <button type="submit" className="pay-now-btn">Pay Now</button>
          </form>
        </div>
          </div>
      </div>
    </>
  );
};

export default Subscribe;
