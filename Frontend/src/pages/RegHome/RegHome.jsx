import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RegHome.css";
import logo_img from "../Home/images/logo.png";
import { StoreContext } from "../../context/StoreContext.jsx";
import MovieCard from '../MovieCard/MovieCard.jsx'; 

const RegHome = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("");
  const { movieList, fetchMoviesByCategory, setToken, fetchAllMovies } =
    useContext(StoreContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    if (genre) {
      fetchMoviesByCategory(genre);
    } else {
      fetchAllMovies();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSubscribe = () => {
    navigate("/subscribe");
  };

  return (
    <>
      <div className="header">
        <nav>
          <img src={logo_img} className="logo" alt="Netflix Logo" />
          <div className="genre-selection">
            <h3>Select Movie Genre</h3>
            <select value={selectedGenre} onChange={handleGenreChange}>
              <option value="">-- Select Genre --</option>
              <option value="horror">Horror</option>
              <option value="comedy">Comedy</option>
              <option value="action">Action</option>
              <option value="suspense-thriller">Suspense-Thriller</option>
            </select>
          </div>
          <div className="subscribe-section">
            <button className="subscribe-btn" onClick={handleSubscribe}>
              Subscribe
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <div className="movie-list">
          {movieList.length === 0 ? (
            <p>No movies available for the selected category</p>
          ) : (
            <div className="movies">
              {movieList.map((movie) => (
                <MovieCard sub={false} key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegHome;
