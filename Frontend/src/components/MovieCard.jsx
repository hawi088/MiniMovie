import '../styles/MovieCard.css'
import '../components/MovieCard.jsx'
import { ReviewContext } from '../context/ReviewContext.jsx'
import { useState } from 'react'
import { watchlistContext } from '../context/WatchListContext.jsx'
import { FavoriteContext } from '../context/FavoritesContext.jsx'
function MovieCard({movie}){
    const [favorite , addFavorite , removeFavorite] =useState(FavoriteContext)
    cosnt [review , addReview , removeReview] = useState(ReviewContext)
    const [watchlist , addWathList , removeWatchList] = useState(watchlistContext)
    const isWatchList = watchlist.some(m=>m.id ==id)
    const isFavorite  = favorite.some(m=>m.id == id)
    return(
        <div className='movie-card'>
            <img src={movie.poster} alt={movie.title} className='movie-poster'/>
            <h3>{movie.title}</h3>
            <div className='buttons-function'>
            <button className='poster-btn' id='favorite-btn' onClick={isFavorite? removeFavorite(movie.id) : addFavorite(movie.id)}>❤</button>
            <button className='poster-btn' id='review-btn' onClick={addReview}>🖊</button>
            <button className='poster-btn' id='watchlist-btn'onClick={isWatchList ? removeWatchList(movie.id) : addWathList(movie.id)}>👁</button>
            </div>
        </div>
    )
}
export default MovieCard