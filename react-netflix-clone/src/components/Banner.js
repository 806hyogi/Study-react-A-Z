import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from "../api/request";
import './Banner.css'

export default function Banner() {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    // 현재 상영중인 영화 정보를 가져오기 (여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);

    // 여러 영화 중 영화 하나의 ID를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" }, // 비디오도 포함시켜라
    });

    setMovie(movieDetail); // 영화 정보가 다들어감
  }

  // 100글자가 넘어가면 ... 이 생기도록 한다.
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url("http://images.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className='banner__contents'>
        {/* 타이틀 */}
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button
            className='banner__button play'
          >
            play
          </button>
          <button
            className='banner__button info'
          >
            <div className='space'></div> More Information
          </button>
        </div>
        {/* 2개의 버튼 */}
        <h1 className='banner__description'>
          {truncate(movie?.overview, 100)}
        </h1>
        {/* Decription */}
      </div>
      <div className='banner--fadeBottom' />
    </header>
  )
}
