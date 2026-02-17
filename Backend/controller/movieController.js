import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const TMDB_API_KEY = process.env_API_KEY
export const searchMovie=async(req,res)=>{
    try{
        const {query} = req.query
        if(!query) return res.status(401).json({
            success:false,
            message:"Query is required"
        })
        const response = await axios.get(
            'https://api.themoviedb.org/3/search/movie',
            {
                params:{
                    api_key:process.env.API_KEY,
                    query:query,
                    language:'en-US',
                    page:1,
                    include_adult:false
                },
            }
        )
        const movies = response.data.results.map((movie)=>({
            id:movie.id,
            title:movie.title,
            release_date :movie.release_date,
            poster:movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
            overview:movie.overview

        }))
        res.status(200).json({
            success:true,
            count:movies.length,
            movies
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to search movies"
        })
    }
}
export const getmovieDetail = async(req,res)=>{
    try{
        const {id} = req.params
        if(!id) return res.status(400).json({
            success:false,
            message:'Id not found'
        })
        const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`,{
                params:{
                    api_key:process.env.API_KEY,
                    language:'en-Us'                }
            }
        )
        const creditResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits`,{
                params:{
                    api_key:process.env.API_KEY
                }
            }
        )
        const movie = movieResponse.data
        const credit = creditResponse.data
        const director = credit.crew.find(
            (person)=>person.job === 'Director'
        )
        const cleanMovie = {
            id:movie.id,
            title:movie.title,
            release_date:movie.release_date,
            runtime:movie.runtime,
            genre:movie.genres.map((g)=>g.name),
            poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
            director:director ? director.name : "Not available"
        }
        res.status(200).json({
            success:true,
        cleanMovie
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:'Failed to fetch movie detail'
        })
    }
}