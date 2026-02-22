import '../styles/Favorite.css'
import { FavoriteContext } from '../context/FavoritesContext.jsx';
import MovieCard from '../components/MovieCard.jsx'
import { useState } from 'react';
function Favorite(){
    const {favorite} = useState(FavoriteContext)
    return(
        <>
        <div className='title'>Favorite</div>
        <div className='favorites'>{favorite.length === 0?(
                <p className='not-added'>You haven't added Favorite Movie yet.</p>
        ) : (
            favorite.map(movie=>(
                <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))
        )}</div> 
        </>
    )
}
export default Favorite;