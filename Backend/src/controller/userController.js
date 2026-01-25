const userModel = require("../model/userModel");
const bcrypt = require("bcrypt")
// const expenseModel = require("../model/expenseModel");
const jwt=require('jsonwebtoken')
const userRegister = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const salt =10
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "email already exist" });
    }
const HashPassword =await bcrypt.hash(password,salt)
// console.log("hashhhhhhhhhhhh----   ",HashPassword)
    await userModel.create({ name, email, mobile,password: HashPassword });
    return res
      .status(201)
      .json({ success: true, message: " registered sucessfully" });
  } catch (error) {
    console.log("error",error);
    res.status(500).json({ success: false, message: "somethig went wrong" });
    
  }
};
const userLogin = async (req,res)=>{
    try {
        const { email,password }=req.body;
        const user=await userModel.findOne({email})
        if(!user){
            return res
                    .status(401)
                    .json({message :" Invalid user"});
        }
        const checkpassword = await bcrypt.compare(password,user.password)
        if( !checkpassword){
            return res
                    .status(401)
                    .json({message :"invalid password"})
        }
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        return res
                .status(200)
                .json({message:"login successful",token : token})
        
    } catch (error) {
        console.log("error",error);
        res.status(500).json({ success: false, message: "somethig went wrong" });
        
    }
}

module.exports={ userRegister,userLogin }