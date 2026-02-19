import User from '../model/User.js'
export const toggleFollow = async(req,res)=>{
    try{
        console.log("Current User:", req.user);
console.log("Target User ID:", req.params.id);

        const userIdToFollow = req.params.userIdToFollow
        const currentUserId  = req.user.id
        if(currentUserId === userIdToFollow) return res.status(400).json({
            success:false,
            message:'You cannot follow yourself'
        })
        const currentUser  = await User.findById(currentUserId)
        const userToFollow = await User.findById(userIdToFollow)
        if(!userToFollow) return res.status(404).json({
            success:false,
            message:'User not found'
        })
        const isFollowing = await currentUser.following.includes(userIdToFollow)
        if(isFollowing){
            currentUser.following.pull(userIdToFollow)
            userToFollow.follower.pull(currentUserId)
            await currentUser.save()
            await userToFollow.save()
            res.status(201).json({
                success:true,
                message:'Unfollowed User'
            })
        }
        else{
            currentUser.following.push(userIdToFollow)
            userToFollow.follower.push(currentUserId)
            await currentUser.save()
            await userToFollow.save()
        }
        res.status(201).json({
            success:true,
            message:'Followed User'
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:'Failed to toggle follow'
        })
    }
}