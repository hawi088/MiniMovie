import '../styles/MovieCard.css'
import {useContext, useState} from 'react'
import { FavoriteContext } from '../context/FavoritesContext.jsx'
import {watchlistContext} from '../context/WatchListContext.jsx'
function MovieCard({movie, handleFavoriteClick , handleWatchListClick}){ //handleFavoriteClick is a function that is optioal that can be passed fromt he parent(Just like as we did in the favorite.jsx) and if the function exists then let the parent decide the way to handle, if not let movieCard(child compoment handles it)
    const {favorite =[] , addFavorite , removeFavorite} = useContext(FavoriteContext) // extracting the values we want from the context (destructing)
    const {watchlist =[] , addWatchList , removeWatchList} = useContext(watchlistContext)
    const isFavorite = favorite.some(m=>m.id ===movie.id)
    const isWatchList = watchlist.some(n=>n.id === movie.id)
    const handleFavorite = async()=>{
        if(handleFavoriteClick) {
            handleFavoriteClick(movie)  // here the function from the parent handles it
        }else{
            if(isFavorite) return // if not just return the array(a way in which the child component handles things)
        }
    

   
        try{
            const res = await fetch(`http://localhost:5000/api/movies/${movie.id}/favorite`,{
                method:"PATCH",
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify({movieId:movie.id , title:movie.title , poster: movie.poster})
            })
            const data = await res.json()
            console.log(data)
            if(data.favorite){
                addFavorite(movie)
            }
            else{
                removeFavorite(movie)
            }
        }catch(err){
            console.error(err)
        }
    }
    const handleWatchList  =async()=>{
        if(handleWatchListClick) {
            handleWatchListClick(movie)
        }
        else{
            if(isWatchList) return
        }
        try{
            const res = await fetch(`http://localhost:5000/api/movies/${movie.id}/watchlist`,{
                method:'PATCH',
                credentials:'include'
            })
            const data = await res.json()
            console.log(data)
            if(data.watchlist){
                addWatchList(movie)
            }
            else{
                removeWatchList(movie)
            }
        }catch(err){
            console.error(err)
        }

    }
    return(
        <div className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='movie-poster'/>
            <h3>{movie.title}</h3>
            <div className='buttons-function'>
            <button className='poster-btn' id='favorite-btn' onClick={handleFavorite}>❤</button>
            <button className='poster-btn' id='watchlist-btn' onClick={handleWatchList}>👁</button>
             
            </div>
        </div>
    )
}

export default MovieCard