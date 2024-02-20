import { useState, useEffect } from "react";

const KEY = "2cc65b4f";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("can't fetch you movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movies is not found");

          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          if (err.name !== "AbortError") {
            setIsLoading(false);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      query.length >= 3 ? fetchMovies() : setMovies([]);

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return [movies, isLoading, error];
}
