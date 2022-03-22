const express=require('express');
const bodyParser=require('body-parser');
const productRout=require('./Router/productRout')

const app=express();
const errorMiddlware=require('./middleware/error');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/v1',productRout)

app.use(errorMiddlware);



module.exports=app;