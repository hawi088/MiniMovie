import {searchMovie , getmovieDetail} from '../controller/movieController.js'
import express from 'express'
const router = express.Router()

router.get('/search',searchMovie)
router.get('/:id',getmovieDetail)
export default router