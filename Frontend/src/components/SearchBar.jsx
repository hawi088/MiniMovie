import '../styles/SearchBar.css'
import React, {useState} from 'react'
function SearchBar({onResult}){
    const [query , setQuery] = useState("")
    const handleSearch = async(e)=>{ 
        e.preventDefault()
        if(!query) return
        const apiKey = import.meta.env.VITE_API_KEY
        console.log("API KEY:",apiKey)
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
        try{
            const res = await fetch(url)
            const data = await res.json()
            onResult(data.results || [])
                }catch(err){
            console.error(err)
        }
    }
    return (
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      );
}
export default SearchBar