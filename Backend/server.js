require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const userRouter=require('./src/routes/userRouter')
const bodyparser=require('body-parser')
const cors=require('cors')
const app=express();

app.use(bodyparser.json());
app.use(cors())

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server was connected run in ${port}!`);
 })

console.log("--------")


const DB_Connection = async()=>{
  try {
   await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected successfully!")
  } catch (error) {
    console.log("mongo Db connection faild !");
    
  }
 } 
 DB_Connection()

 app.use('/api/user',userRouter)
 app.use("/uploads", express.static("uploads"));

 