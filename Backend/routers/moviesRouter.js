import {searchMovie ,
        getmovieDetail ,
        rateMovie , 
        toggleFavorite , 
        toggleWatchList ,
        reviewMovie,
        getMovieReviews,
        getFavoriteOfUser,
        getWatchlistOfUser} from '../controller/movieController.js'
import {protect} from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()

router.get('/search',searchMovie)
router.get('/favorites',protect,getFavoriteOfUser)
router.get('/watchlists',protect,getWatchlistOfUser)
router.get('/:id',getmovieDetail)
router.post('/:id/rate',protect,rateMovie)
router.patch('/:id/favorite',protect,toggleFavorite)
router.patch('/:id/watchlist',protect,toggleWatchList)
router.post('/:id/review',protect,reviewMovie)
router.get('/:id/reviews',getMovieReviews)
export default router