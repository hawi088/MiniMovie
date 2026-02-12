const mongoose  = require('mongoose')
const express = require('express')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
export const signup = async (req,res)=>{
    try{
    const {username , email , password} = req.body
    if(!username || !email || !password) return res.status(400).json({
        success:false,
        message:'All fields are requires'
    })
    const usernameExists = await User.findOne({email})
    if(usernameExists) return res.status(400).json({
        success:false,
        message:'Email already exists'
    })
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })
    res.status(200).json({
        success:true,
        message:'User successfully created!'
    })
}catch(err){
    res.status(500).json({
        success:false,
        message:'Internal Server Error'
    })
}
}
export const login =async(req,res)=>{
    try{
        const {username , email ,password} = req.body
        if(!username || !email || !password) return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({
            success:false,
            message:'Email does not exist'
        })
        const isMatch = await bcrypt.compare(password, user.hasshedPassword)
        if(!isMatch) return res.status(400).json({
            success:false,
            message:'Incorrect Password'
        })
        const token = jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )
        res.cookie('token',token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:'strict',
            secure:'false'
        })
        res.status(200).json({
             success:true,
             message:'Login Successfull'
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Interal Server Error'
        })
    }
}
export const logout = async (req,res)=>{
    res.cookie('token',"",{
        httpOnly:true,
        expiresIn:new Date(0)
    })
    res.status(201).json({
        success:true,
        message:'Logged out successfully'
    })
}
