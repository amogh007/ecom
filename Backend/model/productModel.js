const mongoose=require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"please enter product name"],
        trim: true

    },
    description:{
        type: String,
        required: [true,"please enter description"]
    },
    price:{
        type: Number,
        required: [true,"please enter price"],
        maxLength:[8,"price must not exceed 8 characters"],
    },
    rating:{
        type: Number,
        default: 0

    },
    images:[{
        public_id:{type: String, required: true},
        url:{type: String}
    }],
    catagories:{
        type:String, required:[true,"please enter catagories"]
    },
    stock:{
        type:Number, required:[true,"please enter stock"],maxLength:[4,'stock cannot exceed 4 characters'],default:1
    },
    NumberOfRiviews:{
        type:Number,default:0
    },
    riviews:[
        {
            name:{type:String,required:true},
            rating:{type:String,required:true},
            comment:{type:String}
        }
    ]

})
module.exports =mongoose.model('Product',ProductSchema);