import {searchMovie , getmovieDetail , rateMovie , toggleFavorite , toggleWatchList} from '../controller/movieController.js'
import {protect} from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()

router.get('/search',searchMovie)
router.get('/:id',getmovieDetail)
router.post('/:id/rate',protect,rateMovie)
router.patch('/:id/favorite',protect,toggleFavorite)
router.patch('/:id/watchlist',protect,toggleWatchList)
export default router