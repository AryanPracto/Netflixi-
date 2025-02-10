import { Link } from "react-router-dom";
import "./Error.css"; // Import CSS file

const onClickHandler=()=>{
  if(localStorage.getItem('token')){
    localStorage.removeItem('token');
  }
  if(localStorage.getItem('userName')){
    localStorage.removeItem('userName');
  }
}

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="error-button" onClick={onClickHandler}>Go Home</Link>
    </div>
  );
};

export default Error;
