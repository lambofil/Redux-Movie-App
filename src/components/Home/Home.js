import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";

import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};
export default Home;

// For the synchronous reducer fetching will be in the useEffect hooks (after importing APIKey, addMovies, useDispatch, and movieText) as thus:
/* useEffect(()=> {
  const dispatch = useDispatch();
  const movieText = "Harry";
  const fetchMovies = async () => {
    const response = await movieApi.get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
    .catch((err) => {
      console.log("Err :" err);
    })
    dispatch(addMovies(response.data));
  }

  fetchMovies();
}, [dispatch]); 

NB: THE ACTION FOR THE REDUCER IS : addMovies()*/
