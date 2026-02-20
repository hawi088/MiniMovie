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
    }
},{timestamps:true})

const Activity = mongoose.model('Activity',activitySchema)
export default Activity