const mongoose = require('mongoose');

const connectDatabase=async ()=>{
    await mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
   
    useUnifiedTopology: true
  }).then((data)=>{
      console.log(`connecting to the database: ${data.Connection.length}`);
  }).catch((error)=>{
      console.log(`error connecting to the database: ${error}`)
  })
}

module.exports = connectDatabase;
