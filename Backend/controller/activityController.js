import Activity from '../model/Activity.js'
import User from '../model/User.js'
import UserMovie from '../model/UserMovie.js'
export const likeReview = async(req,res)=>{
    try{
        const{movieId} = req.params
        const userId = req.params.userId
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({
            success:false,
            message:"User not found"
        })
        const userReview = await UserMovie.findOne({
            user:userId,
            movieId,
            review:{$exists:true,$ne:""}
        })
        if(!userReview) return res.status(404).json({
            success:false,
            message:'This person did not review this movie'
        })
        let activity = await Activity.findOne({
            type:"review",
            actor5:userId,
            movieId
        }) 
        if(!activity){
            activity = await Activity.create({
                actor:userId,
                type:"review",
                movieId,
                metadata:{
                    reviewText:userReview.review,
                    rating:userReview.rating
                }
            })
        }
        activity.likes = activity.likes||[]
        const index = activity.likes.indexOf(req.user.id)
        if(index === -1){
            activity.likes.push(req.user.id)
            await activity
            .save()
            res.status(201).json({
                success:true,
                message:'Review liked.'
            })
        }
        else{
            activity.likes.pull(req.user.id)
            await activity.save()
            res.status(201).json({
                success:true,
                message:'Review unliked'
            })
        }
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:'Failed to like review'
        })
    }
}