import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'
import movieRouter from './routers/moviesRouter.js'
import followRouter from './routers/followRouter.js'
import activityRouter from './routers/activityRouter.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Backend is running!')
})

app.use('/api/auth', authRouter)
app.use('/api/user',userRouter)
app.use('/api/movies',movieRouter)
app.use('/api/movies',movieRouter)
app.use('/api/movies',movieRouter)
app.use('/api/movies',movieRouter)
app.use('/api/movies',movieRouter)
app.use('/api/movies',movieRouter)
app.use('/api/users',followRouter)
app.use('/api/activity',activityRouter)

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.error(err))

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))