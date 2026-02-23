import express from 'express'
import { signup, login, logout , getProfile , getUserMovie , updateProfile } from '../controller/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile/activity',protect , getUserMovie)
router.put('/profile',protect,updateProfile)
router.get('/profile',protect,getProfile)

export default router