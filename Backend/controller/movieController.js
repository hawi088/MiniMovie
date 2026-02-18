import axios from 'axios'
import dotenv from 'dotenv'
import UserMovie from '../model/UserMovie.js'
dotenv.config()
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
        let userInteraction = null
        if(req.user){
            userInteraction = await UserMovie.findOne({
                user:req.user.id,
                movieId:id
            })
        }
        const cleanMovie = {
            id:movie.id,
            title:movie.title,
            release_date:movie.release_date,
            runtime:movie.runtime,
            genre:movie.genres.map((g)=>g.name),
            poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
            director:director ? director.name : "Not available",
            userInteraction: userInteraction ?userInteraction : {
                rating:userInteraction.rating|| null,
            favorite:userInteraction.favorite,
            watchlist:userInteraction.watchlist,
            review:userInteraction.review || null
            }
            
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
export const rateMovie = async (req,res)=>{
    try{
        console.log("USER:", req.user);
console.log("BODY:", req.body);
console.log("PARAMS:", req.params);

        const {id} = req.params
        const {rating} = req.body
        if(!rating || rating<1 || rating > 10) return res.status(400).json({
            success:false,
            message:'Rating must be between 1 - 10'
        })
        const movieId = Number(id)
        const userMovie = await UserMovie.findOneAndUpdate({
            user:req.user.id,
            movieId
        },{
            $set:{rating}
        },
        {new:true,
        upsert:true}
        )
        res.status(201).json({
            success:true,
            messasge:'Rated Successfully',
            userMovie
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:'Failed to rate a movie'
        })
    }
}
export const toggleFavorite = async(req,res)=>{
    try{
        const {id} = req.params
        const movieId = Number(id)
        const userMovie = await UserMovie.findOneAndUpdate({user:req.user.id,movieId},
        
        [{
            $set:{favorite:{$not:"$favorite"}}
        }],{new:true,upsert:true,updatePipeline:true})
        res.status(201).json({
            success:true,
            message:'Favorite status Updated',
            favorite:userMovie.favorite
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Failed update favorite status"
        })
    }
}
export const toggleWatchList = async(req,res)=>{
    try{
        const {id} = req.params
        const movieId = Number(id)
        const userMovie = await UserMovie.findOneAndUpdate({user:req.user.id,movieId},[
            {
                $set:{watchlist:{$not:'$watchlist'}}
            }
        ],{new:true,upsert:true,updatePipeline:true})
        res.status(201).json({
            success:true,
            message:'Watchlist status updated successfully',
            watchlist:userMovie.watchlist
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Failed to update watchlist status"
        })
    }
}
export const reviewMovie = async (req,res)=>{
    try{
        const {id} = req.params;
        const {review} = req.body
        if(!review || review.trim==="") return res.status(400).json({
            success:false,
            message:'Review cannot be empty'
        })
        const movieId = Number(id)
        const userMovie = await UserMovie.findOneAndUpdate({user:req.user.id,movieId},{$set:{review}} , {new:true,upsert:true})
        res.status(201).json({
            success:true,
            message:'Reviewed movie successfully',
            review:userMovie.review
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:'Failed to Review a movie'
        })
    }
}
export const getMovieReviews = async(req,res)=>{
    try{
        const {id} = req.params
        const movieId = Number(id)
        const reviews = await UserMovie.find({
            movieId,
            review:{$exists:true , $ne : ""}
        }).populate('user',"username").sort({createdAt:-1})
        res.status(201).json({
            success:true,
            message:'Reviews successfully fetched',
            reviews
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:'Failed to get Reviews for the Movie'
        })
    }
}