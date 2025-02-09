import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie ,sub,setPlaying,setSelectedMovie}) => {
  const handleMovieClick = () => {
    if(!sub){
      alert("Please subscribe to enjoy 💰");
    }else{
      setSelectedMovie(movie);
    setPlaying(true);
    }
  };

  return (
    <div className="movie-item" onClick={handleMovieClick}>
      <img src={movie.thumbnail} alt={movie.title} className="movie-thumbnail" />
      <h4>{movie.title}</h4>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieCard;
