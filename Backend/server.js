const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');

process.on('uncaughtException', (err)=>{
    console.log(`uncaughteception${err}`);
    console.log('server shutting down ')
    process.exit(1);
})

dotenv.config({path:'Backend/config/con.env'});
const port=process.env.PORT
console.log(port)
connectDatabase();
const Server=app.listen(port,()=>{
    console.log(`server is running onthe port ${process.env.PORT}`)
})


process.on("unhandledRejection",(err)=>{
    console.log(`unhandled rejection ${err.stack}`);
    Server.close(()=>{
        process.exit(1);
    })
})