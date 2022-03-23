const catchAsyncError=require('../middleware/catchAsyncError')
const errorHandler=require('../utils/errorHandler')
const Users=require('../model/userModel');
const jwt=require('jsonwebtoken')
exports.isAuthenticated=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    
    if(!token){
        next(new errorHandler('please login before using this service ',404))
    }
    const decodeData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await Users.findById(decodeData.id);
    next();
})

