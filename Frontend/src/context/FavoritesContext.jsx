import { createContext , useState } from "react";
export const FavoriteContext = createContext()
export function FavoriteProvider({children}){
 const [favorite , setFavorite] = useState([])
 const addFavorite =(movie)=>{
    setFavorite(prev =>[...prev,movie])
 }
 const removeFavorite =(id)=>{
    setFavorite(prev=>prev.filter(movie.id !== id))
 }
 return(
    <FavoriteContext.Provider value={{favorite,addFavorite,removeFavorite}}>
        {children}
    </FavoriteContext.Provider>
 )
}
export default FavoriteProvider