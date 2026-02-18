import {searchMovie , getmovieDetail , rateMovie} from '../controller/movieController.js'
import {protect} from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()

router.get('/search',searchMovie)
router.get('/:id',getmovieDetail)
router.post('/:id/rate',protect,rateMovie)
export default router