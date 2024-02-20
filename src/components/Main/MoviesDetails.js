import { useState, useEffect } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MoviesDetails({
  moviesID,
  handelCloseDetalesMovies,
  handelAddMovieWatched,
  watched,
  KEY,
}) {
  const [movie, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [error, setError] = useState(false);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const isWatched = !watched.find((watched) => watched.imdbID === movie.imdbID);
  const cuurentMovieRate = watched.find(
    (watched) => watched.imdbID === movie.imdbID
  )?.userRating;

  useEffect(
    function () {
      async function getMoviesDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${moviesID}`
          );
          if (!res.ok) throw new Error("can't fetch your movie");
          const data = await res.json();
          setMovies(data);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMoviesDetails();
    },
    [moviesID]
  );

  function handelAddWatchd() {
    const newWatchedMovie = {
      imdbID: moviesID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handelAddMovieWatched(newWatchedMovie);
    handelCloseDetalesMovies();
  }

  return (
    <div className="details">
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loader />}
      {movie.imdbID ? (
        <>
          <header>
            <button
              className="btn-back"
              onClick={() => handelCloseDetalesMovies()}
            >
              &larr;
            </button>
            <img src={poster} alt={`Poster of movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handelAddWatchd}>
                      + Add movie
                    </button>
                  )}
                </>
              ) : (
                <p>
                  This movie is rated before <span>{cuurentMovieRate} ⭐️</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      ) : null}
    </div>
  );
}
