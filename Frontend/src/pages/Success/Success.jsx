import React, { useState, useEffect,useContext,useRef } from 'react';
import './Success.css';
import { useNavigate } from 'react-router-dom';
import logo_img from '../Home/images/logo.png';
import { StoreContext } from '../../context/StoreContext.jsx';
import Hls from 'hls.js';
import MovieCard from '../MovieCard/MovieCard.jsx';

const Success = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
  const {movieList,fetchAllMovies,fetchMoviesByCategory}=useContext(StoreContext)

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/')
    }
    fetchAllMovies();

  }, []);

  useEffect(() => {
    if (selectedMovie && videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(selectedMovie.streamURL);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = selectedMovie.streamURL;
      }
    }
  }, [selectedMovie]);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    if (genre) {
      fetchMoviesByCategory(genre);
    } else {
      fetchAllMovies();
    }
  };

  const handleClosePlayer = () => {
    setPlaying(false);
    setSelectedMovie(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token')
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <div className="header">
        <nav>
          <img src={logo_img} className="logo" alt="Netflix Logo" />
          <div className="genre-selection">
            <h3>Select Movie Genre</h3>
            <select value={selectedGenre} onChange={handleGenreChange}>
              <option value="">--Select Genre--</option>
              <option value="horror">Horror</option>
              <option value="comedy">Comedy</option>
              <option value="action">Action</option>
              <option value="suspense-thriller">Suspense-Thriller</option>
            </select>
            {selectedGenre && <p>You selected: {selectedGenre}</p>}
          </div>
          <button onClick={handleLogout}>Logout</button>
        </nav>

        <div className="movie-list">
          {movieList.length === 0 ? (
            <p>No movies available for the selected category</p>
          ) : (
            <div className="movies">
              {movieList.map((movie) => (
                <MovieCard sub={true} key={movie.id} movie={movie} setPlaying={setPlaying} setSelectedMovie={setSelectedMovie}/>
              ))}
            </div>
          )}
        </div>

        {playing && selectedMovie && (
          <div className="video-player">
            <button className="close-btn" onClick={handleClosePlayer}>X</button>
            <video ref={videoRef} controls autoPlay className="video-element" />
            <h4>{selectedMovie.title}</h4>
            <p>{selectedMovie.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Success;
