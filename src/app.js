const express=require("express");
const connectDB=require('./config/database.js');
const User=require("./modules/user.js");
const app=express();

app.post('/signup',async(req,res)=>{
  const user=new User(
    {
      firstName:"kavya",
      lastName:"praba",
      emailId:"kavya@gmail.com",
      password:"kavya@123"

    });
    try{
    user.save();
    res.send("data saved successfully")
    }catch(err)
    {
      res.status(400).send("Something went wrong");
    }
})




connectDB()
.then(()=>{
  console.log("Database connected succesfully");
   app.listen(7777,()=>console.log("server is running on 7777 port"));
}
)
.catch(()=>
   console.log("Database is not connected")
 )







