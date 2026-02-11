import { useState, createContext } from "react";
export const watchlistContext = createContext()
export function WatchListProvider ({children}){
    const [watchlist , setWatchList] = useState([])
    const addWathList = (movie)=>{
        setWatchList(prev , [...prev,movie])
    }
    const removeWatchList = (id)=>{
        setWatchList(prev.filter(movie.id !== id))
    }
    return(
        <watchlistContext.Provider value={{watchlist , addWathList , removeWatchList}}>
            {children}
        </watchlistContext.Provider>
    )
}
export default watchlistContext