import '../styles/MovieCard.css'
import '../components/MovieCard.jsx'
import { useContext } from 'react'
import { FavoriteContext } from '../context/FavoritesContext'
function MovieCard({movie}){
    const [favorite , addFavorite , removeFavorite] =useState(FavoriteContext)
    const isFavorite  = favorite.some(m=>m.id == id)
    return(
        <div className='movie-card'>
            <img src={movie.poster} alt={movie.title} className='movie-poster'/>
            <h3>{movie.title}</h3>
            <button className='favorite-btn' onClick={isFavorite? removeFavorite(movie.id) : addFavorite(movie.id)}>❤</button>
        </div>
    )
}
export default MovieCard