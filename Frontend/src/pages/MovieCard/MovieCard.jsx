import React from "react";
import "./MovieCard.css";
import { toast } from "react-toastify";

const MovieCard = ({ movie ,sub,setPlaying,setSelectedMovie}) => {
  const handleMovieClick = () => {
    if(!sub){
      toast.error("plz subscribe to watch !")
    }else{
      setSelectedMovie(movie);
    setPlaying(true);
    toast.success(`playing ${movie.title}`)
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
