import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKey } from "../../common/apis/MovieApiKey";
import movieApi from "../../common/apis/MovieApi";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "shows/fetchAsyncShows",
  async (term) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  loading: false,
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // to clean up the state
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("loading...");
        state.loading = true;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("fetched succesfully..!");
        return { ...state, loading: false, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected...");
      })
      .addCase(fetchAsyncShows.pending, (state) => {
        console.log("loading...");
        state.loading = true;
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("fetched succesfully..!");
        return { ...state, laoding: false, shows: payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("fetched succesfully..!");
        return { ...state, selectMovieOrShow: payload };
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
// to get all the value from the store.
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getLoading = (state) => state.movies.loading;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;

// builder
// .addCase(fetchAsyncShows.pending, () => {
//   console.log("loading...");
// })
// .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
//   console.log("fetched succesfully..!");
//   return { ...state, shows: payload };
// })
// .addCase(fetchAsyncShows.rejected, () => {
//   console.log("Rejected...");
// });
