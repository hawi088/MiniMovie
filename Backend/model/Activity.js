import mongoose, { Schema } from "mongoose"
import User from "./User.js"
const activitySchema = new Schema({
    actor:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:['review','favorite','watchlist','rate','follow'],
        required:true        
    },
    movieId:{
        type:Number
    },
    targetUser:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    metadata:{
        rating:Number,
        reviewText:String
    },
    likes:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    comments:
        [
            {
                user:{
                   type: mongoose.Schema.ObjectId,
                ref:"User",
                },
                text:{
                    type:String,
                    required:true
                },
                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
},{timestamps:true})

const Activity = mongoose.model('Activity',activitySchema)
export default Activity