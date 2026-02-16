import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success: true,
            message: 'User successfully created!'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email does not exist'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: 'strict',
            secure: false
        })

        res.status(200).json({
            success: true,
            message: 'Login successful'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}

export const getProfile = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(404).json({
            success:false,
            message:'User not found!'
        })
        res.status(201).json({
            success:true,
            profile:user.profile,
            email:user.email,
            username:user.username
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const updateProfile = async(req,res)=>{
    try{
        const {avatar , bio } = req.body
        const updatedData = {}
        if(avatar !== undefined) updatedData['avatar'] = avatar
        if(bio !== undefined) updatedData['bio'] = bio
        const user = await User.findByIdAndUpdate(req.user.id,updatedData,{new:true}).select('-password')
        if(!user) return res.status(404).json({
            success:false,
            message:'User not Found'
        })
        res.status(200).json({
            success:true,
            message:'Profile successfully Updated',
            profile:user.profile
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
