import { likeReview } from "../controller/activityController.js";
import express from 'express'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()
router.patch('/review/:userId/:movieId/like',protect,likeReview)

export default router