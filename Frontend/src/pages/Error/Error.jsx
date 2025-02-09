import { Link } from "react-router-dom";
import "./Error.css"; // Import CSS file

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="error-button">Go Home</Link>
    </div>
  );
};

export default Error;
