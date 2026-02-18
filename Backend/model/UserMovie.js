import mongoose from "mongoose";
const userMovieSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    movieId:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:{
        type:String
    },
    favorite:{
        type:Boolean,
        default:false
    },
    wathclist:{
        type:Boolean,
        default:false
    },

},{timestamps:true})
userMovieSchema.index({ user: 1, movieId: 1 }, { unique: true });

const UserMovie = mongoose.model('UserMovie', userMovieSchema);

export default UserMovie;