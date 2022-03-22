const Products=require('../model/productModel');
const catchAsyncError=require('../middleware/catchAsyncError');
const ApiFeature=require('../utils/apiFeature')
const errorHandler=require('../utils/errorHandler');
const mongoose=require('mongoose');

exports.getAllProducts = catchAsyncError(async (req,res,next)=>{
  const resultPerPage=5;
    
  const productCount=await Products.countDocuments()
   const apifeature=new ApiFeature(Products.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await apifeature.query;
     console.log("running")
     res.status(200).json({sucess:true,
         products,productCount}).end();

})
exports.createProduct=catchAsyncError(async (req,res,next)=>{
  const product=await Products.create(req.body);
  res.status(200).json({
    sucess:true,
    product
  })
})

exports.updateProduct=catchAsyncError(async (req,res,next)=>{
  let products=Products.findById(req.params.id);
  if(!products){
    return next(new errorHandler('product not found',404))
  }
  products=await Products.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
  res.status(200).json({sucess:true,products});
})
exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
  const products=await Products.findById(req.params.id);
    if(!products){
      return next(new errorHandler('product not found',404))
    }
    products.remove();
    res.status(200).json({status:true,message:'product delete sucesfull',products});
})
exports.getProductDetails= catchAsyncError(async (req,res,next)=>{
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    const products=await Products.findById(req.params.id);
 if(!products){
      
      return next(new errorHandler('product not found',404));
 }
 res.status(200).json({status:true,products});

}else{
    return res.status(404).json({sucess:false,message:'invalid id'});
}
})
