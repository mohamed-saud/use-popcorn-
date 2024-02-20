import { useState, useEffect } from "react";

export function useLocalStorge(initaial, key) {
  const [watched, setWatched] = useState(function () {
    const localStorageData = localStorage.getItem(key);
    return localStorageData ? JSON.parse(localStorageData) : initaial;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched]
  );
  return [watched, setWatched];
}
