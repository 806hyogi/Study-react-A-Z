import axios from "../../api/axios";
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SearchPage.css';
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults,setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(query.get("q"), 500);

  // api에 검색한 기록을 넣기
  useEffect(() => {
    if(searchTerm){
      fetchSearchMovie(searchTerm);
    }
  }, [debouncedSearchTerm]); // debouncedSearchTerm이 변경될때마다 바뀌게 하도록 함.

  const fetchSearchMovie = async (searchTerm) => {
    try{
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(request.data.results);
      console.log(request);
    }catch(error){
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                onClick={() => navigate(`/${movie.id}`)}
                className="movie__column-poster"
                >
                  <img src={movieImageUrl} alt="" className="movie__poster"/>
                </div>
              </div>
            )
          }
        })}
      </section>
    ) : (
    <section className="no-results">
      <div className="no-results__text">
        <p>
          your search for "{debouncedSearchTerm}" did not havc
        </p>
        <p>Suggestions:</p>
        <ul>
          <li>Try different keywords</li>
        </ul>
      </div>
    </section>)
  }

  return renderSearchResults();
}
