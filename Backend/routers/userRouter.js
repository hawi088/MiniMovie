import { getProfile, updateProfile } from "../controller/authController.js";
import express from 'express'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()

router.put('/profile',protect,updateProfile)
router.get('/profile',protect,getProfile)

export default router