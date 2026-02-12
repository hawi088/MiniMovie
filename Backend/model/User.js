const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required,
        unique:true,
        trim:true,
        lowercase:truw
    },
    password:{
        type:String,
        required,
        minlength:8
    },
},
    {timestamps:true}
    )
module.exports= mongoose.model(User,'userSchema')