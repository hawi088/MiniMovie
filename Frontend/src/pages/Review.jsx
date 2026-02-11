import '../styles/Review.css'
import '../components/MovieCard.jsx'
import { useState } from 'react'
import { ReviewContext } from '../context/ReviewContext.jsx'
import MovieCard from '../components/MovieCard.jsx'
function Review(){
    const {review} = useState(ReviewContext)
    return(
        <>
        <p className='title'>Reviews</p>
        <p className='reviews'>{review.length === 0 ?(
            <p className='not-added'>You haven't added review yet</p>
        ):(
            review.map(movie =>(
                <MovieCard key ={movie.id} movie={movie}></MovieCard>
            ))
        )}</p>
        </>
    )
}
export default Review