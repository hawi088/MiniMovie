import { getProfile, updateProfile , getUserMovie} from "../controller/authController.js";
import express from 'express'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()
router.get('/profile/activity',protect , getUserMovie)
router.put('/profile',protect,updateProfile)
router.get('/profile',protect,getProfile)


export default router