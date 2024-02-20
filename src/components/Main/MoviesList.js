import Movie from "./Movie";
export default function MoviesList({ movies, handelOpenDetalesMovies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          handelOpenDetalesMovies={handelOpenDetalesMovies}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
