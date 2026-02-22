import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const token = req.cookies?.token
    console.log('Token in middleware:', token)
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Decoded:', decoded)
        req.user = decoded
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ success: false, message: 'Invalid token' })
    }
  }