import { toggleFollow } from "../controller/followController.js";
import express from 'express'
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()
router.patch('/:userIdToFollow/follow',protect,toggleFollow)
export default router