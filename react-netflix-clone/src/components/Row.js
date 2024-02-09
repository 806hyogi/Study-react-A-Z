import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';

export default function Row({ title, fetchUrl, isLargeRow, id }) {

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  
  // 영화 클릭했을때
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };



  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  return (
    <section className="row">
      <h2>{title}</h2>
      {/* 좌측 방향 */}
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>

        {/* 하나하나 영화를 넣어줌 */}
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading='lazy'
              alt={movie.name}
            />
          ))}
        </div>

        {/* 우측 방향 */}
        <div className='slider__arrow-right'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>

      {modalOpen && (
        <MovieModal
          {...movieSelected} setModalOpen={setModalOpen}
        />
      )}
    </section>
  );
};
