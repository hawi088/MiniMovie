import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
        avatar:{
            type:String,
            default:""
        },
        bio:{
            type:String,
            default:""
        },
        follower:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        following:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
}, { timestamps: true })

export default mongoose.model('User', userSchema)