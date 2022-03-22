const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
   name:{
       type:String, required:[true,"please enter the username"],trim:true,MaxLength:[50,"name cannot exceed 50 characters"],minLength:[4,"name should have more than 4 characters"]
   } ,
   email:{type:String, required:[true,"please enter the email address"],unique:true,validate:[validator.isEmail,"please enter valid email"]},
   password:{type:String, required:[true,"please enter the password"],minLength:[8,"password should be greater then 8 character"],select:false},
   avatar:{
    
    public_id:{type: String},
    url:{type: String}
     
    },

role:{type:String, default:"user"},
resetPasswordToken:String,
resetPasswoedExpires:Date
})
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);

}
);
userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}
userSchema.methods.compPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports =mongoose.model("User",userSchema);