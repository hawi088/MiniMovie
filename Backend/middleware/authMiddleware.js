const jwt = require('jsonwebtoken')
export const protect = (req,res,next)=>{
    const token = req.cookies.token
    if(!token) return res.status(401).json({
        success:false,
        message:'Unauthorized'
    })
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRRT)
        req.user= decode
        next()
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Intenal Server Errror"
        })
    }
}