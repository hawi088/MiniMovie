import { createContext , useState ,useEffect} from "react";
export const FavoriteContext = createContext()
export function FavoriteProvider({children}){
 const [favorite , setFavorite] = useState([])
 useEffect(()=>{
   const fetchFavorite = async()=>{
      try{
      const res = await fetch('http://localhost:5000/api/movies/favorites',{
         method:'GET',
         credentials:'include'
      })
      const data = await res.json()
      if(data.success) setFavorite(data.favoriteMovies)}
      
   catch(err){
      console.error(err)
   }}
   fetchFavorite()
 },[])
 const addFavorite =(movie)=>{
    setFavorite(prev =>[...prev,movie])
 }
 const removeFavorite =(id)=>{
    setFavorite(prev=>prev.filter(movie=>movie.id !== id))
 }
 return(
    <FavoriteContext.Provider value={{favorite,addFavorite,removeFavorite}}>
        {children}
    </FavoriteContext.Provider>
 )
}
export default FavoriteProvider