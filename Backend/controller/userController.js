const errorHandler=require('../utils/errorHandler');
const catchAsyncError=require('../middleware/catchAsyncError');
const Users=require('../model/userModel');
const sendToken=require('../utils/jwtToken')


exports.RegisterUser= catchAsyncError(async (req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await Users.create({name,email,password,avatar:{
        public_id:"sample image",
    url:"sampleUrl/sartrdy"
   
    }
});
const token=user.getJWTToken();
res.status(200).json({sucess:true,user,token});

})
exports.LoginUser= catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        next(new errorHandler('enter user and email id ',400))
    }
    const user=await Users.findOne({email}).select('+password');
    if(!user){
        next(new errorHandler('user not found',404));
    }
    const isPasswordValid=user.compPassword(password);
    if(!isPasswordValid){
        next(new errorHandler('enter valid email or password',400))
    }
    sendToken(user,200,res);
})

exports.LogoutUser=catchAsyncError(async (req,res,next)=>{
   res.cookie("token",null,{ expires:new Date(Date.now()),httpOnly:true})
    
    res.status(200).json({success:true,message:"logged out successfully"})
})