import '../styles/MovieCard.css'
function MovieCard({movie}){
    const handleFavorite= async()=>{
        try{
            const res = await fetch(`http://localhost:5000/api/movies/${movie.id}/favorite`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify({movieId:movie.id , title:movie.title , poster: movie.poster})
            })
            const data = await res.json()
            console.log(data)
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
            
            </div>
        </div>
    )
}
export default MovieCard