import '../styles/Favorite.css';
import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoritesContext.jsx';
import MovieCard from '../components/MovieCard.jsx';

function Favorite() {
    const { favorite, removeFavorite } = useContext(FavoriteContext);

    const handleFavoriteClick = (movie) => {
        removeFavorite(movie.id); // remove from favorites
    };

    return (
        <>
            <div className='title'>Favorite</div>
            <div className='favorites'>
                {favorite.length === 0 ? (
                    <p className='not-added'>No Favorite Movie yet.</p>
                ) : (
                    favorite.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            handleFavoriteClick={handleFavoriteClick} // pass handler
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default Favorite;