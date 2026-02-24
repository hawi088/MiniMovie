import { useState, createContext, useEffect } from "react";

export const watchlistContext = createContext();

export function WatchListProvider({ children }) {
  const [watchlist, setWatchList] = useState([]);

  // Fetch user's watchlist from backend on mount
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/movies/watchlists", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) setWatchList(data.watchlistMovies || []); // make sure key matches backend
      } catch (err) {
        console.error(err);
      }
    };
    fetchWatchlist();
  }, []);

  // Add a movie to watchlist
  const addWatchList = (movie) => {
    setWatchList((prev) => [...prev, movie]);
  };

  // Remove a movie from watchlist
  const removeWatchList = (id) => {
    setWatchList((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <watchlistContext.Provider
      value={{ watchlist, addWatchList, removeWatchList }}
    >
      {children}
    </watchlistContext.Provider>
  );
}

export default WatchListProvider