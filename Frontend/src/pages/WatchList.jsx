import '../styles/WatchList.css'
import { watchlistContext } from '../context/WatchListContext.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { useContext } from 'react'
function WatchList(){
    const {watchlist=[] , removeWatchList} = useContext(watchlistContext)
    const handleFavoriteClick = (movie)=>{
        removeWatchList(movie)
    }
    return(
        <>
        <div className='title'>Watchlist</div>
        <div className='watchlists'>
            {watchlist.length === 0 ? (
                <p className='not-added'>No watchlist yet.</p>
            ) : (
                watchlist.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        handleWatchListClick={handleFavoriteClick} // pass handler
                    />
                ))
            )}
        </div>
    </>

    )
}
export default WatchList