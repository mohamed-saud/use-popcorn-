import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { useEffect, useState } from "react";
import Search from "./components/Navbar/Search";
import Logo from "./components/Navbar/Logo";
import NumResult from "./components/Navbar/NumResult";
import Box from "./components/Main/Box";
import MoviesList from "./components/Main/MoviesList";
import WatchedSummrey from "./components/Main/WatchedSummrey";
import WatchedMovieList from "./components/Main/WatchedMovieList";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MoviesDetails from "./components/Main/MoviesDetails";
import { useMovies } from "./CustomeHooks/useMovis";
import { useLocalStorge } from "./CustomeHooks/useLocalStorge";

const KEY = "2cc65b4f";

export default function App() {
  const [query, setQuery] = useState("ring");
  const [moviesId, setMoviesId] = useState("");
  // const [watched, setWatched] = useState(function () {
  //   const localStorageData = localStorage.getItem("watched");
  //   return JSON.parse(localStorageData);
  // });

  function handelOpenDetalesMovies(id) {
    setMoviesId(() => (id === moviesId ? null : id));
  }

  function handelCloseDetalesMovies() {
    setMoviesId(null);
  }

  function handelAddMovieWatched(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleDeleteWatched(watchMovId) {
    setWatched(() => watched.filter((movie) => movie.imdbID !== watchMovId));
  }
  const [watched, setWatched] = useLocalStorge([], "watched");
  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );
  useEffect(
    function () {
      document.title = moviesId
        ? `Movie: ${movies.find((movie) => movie.imdbID == moviesId)?.Title}`
        : "use pupcorn";
    },
    [moviesId]
  );
  const [movies, isLoading, error] = useMovies(query);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MoviesList
              handelOpenDetalesMovies={handelOpenDetalesMovies}
              movies={movies}
            />
          )}
        </Box>
        <Box>
          {moviesId ? (
            <MoviesDetails
              handelCloseDetalesMovies={handelCloseDetalesMovies}
              moviesID={moviesId}
              KEY={KEY}
              handelAddMovieWatched={handelAddMovieWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummrey watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
