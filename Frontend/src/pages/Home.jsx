import Hero from '../components/Hero.jsx'
import  '../styles/Home.css'
import SearchBar from '../components/SearchBar.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { useState } from 'react'
function Home(){
    const [results, setResult] = useState([])
    return(
        <div>
    <h2>Trending / Search </h2>
    <SearchBar onResult={setResult} />
    <div className="movie-grid">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
    )
}
export default Home