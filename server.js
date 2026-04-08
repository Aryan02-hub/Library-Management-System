const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const User = require("./models/User");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/authDB")
.then(()=>console.log("Database Connected"));


// REGISTER
app.post("/register", async (req,res)=>{
try{

const {username,email,password} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){
return res.json({message:"User already registered"});
}

const hashPassword = await bcrypt.hash(password,10);

const user = new User({
username,
email,
password:hashPassword
});

await user.save();

res.json({message:"User Registered Successfully"});

}catch(error){

if(error.code === 11000){
return res.json({message:"User already registered"});
}

console.log(error);
res.status(500).json({message:"Server error"});
}
});


// LOGIN
app.post("/login", async(req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.json({message:"User not found"});
}

const match = await bcrypt.compare(password,user.password);

if(!match){
return res.json({message:"Wrong Password"});
}

const token = jwt.sign({id:user._id},"secretkey");

res.json({message:"Login success",token});
});


// TEST ROUTE
app.get("/", (req,res)=>{
res.send("Server working");
});


app.listen(5000,()=>{
console.log("Server running on port 5000");
});