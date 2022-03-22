const errorHandler=require('../utils/errorHandler');

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"internal server error"
    if(err.name=="castError"){
        const message=`resource not found invalid ${err.path}`;
        err=new errorHandler(message,400)
    }
    res.status(err.statusCode).json({
        success: false,
        error:err.message
    })
}