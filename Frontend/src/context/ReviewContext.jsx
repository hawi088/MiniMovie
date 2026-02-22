import { useState , createContext, Children } from "react";
export const ReviewContext = createContext()
export function ReviewProvider({children}){
    const [review , setReview] = useState([])
    const addReview = (movie)=>{
        setReview(prev =>[...prev, movie])
    }
    const removeReview = (id)=>{
        setReview(prev=>prev.filter(movie.id !== id))
    }
    return (
        <ReviewContext.Provider value={{review ,addReview , removeReview}}>
            {children}
        </ReviewContext.Provider>
    )
}
export default ReviewProvider