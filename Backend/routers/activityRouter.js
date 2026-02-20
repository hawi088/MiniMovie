import { likeReview,commentReview } from "../controller/activityController.js";
import express from 'express'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()
router.patch('/review/:userId/:movieId/like',protect,likeReview)
router.post('/review/:userId/:movieId/comment',protect,commentReview)
export default router