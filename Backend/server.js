const express = require('express')
const mongoose = require('mongoose')
const app =express()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(cookieParser())
app.use(cors({
        origin:'http://localhost:5173/',
        credentials:true
}
))
app.use(express.json())

app.get('/',(req,res)=>{
    res.json('Backend is running!')
})
mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log('MongoDB successfully connected'))
.catch(err=>console.error(err))



app.listen(PORT ,()=>console.log(`Server is running on ${PORT}`))