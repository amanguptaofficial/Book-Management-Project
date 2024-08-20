const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./src/routers/route");


//reading dotenv file
dotenv.config();

//use middleware
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));



//forwarding request...
app.use("/",router);


//mongodb connection
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("mongo db connected succesfully...");
}).catch((error)=>{
 console.log("error occured ", error.message);
})


// server creation
app.listen(process.env.PORT,()=>{
  console.log(`🚀 The Backend Server listening at port ${process.env.PORT} 🚀`);
})


module.exports=router;