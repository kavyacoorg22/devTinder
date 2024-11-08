const express=require("express");
const connectDB=require('./config/database.js');
const User=require("./modules/user.js");
const validateSignUpData=require("./util/validation.js")
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const app=express();
const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post('/signup',async(req,res)=>{
  
  try{
  // whatever the request come validate the request
  // it is a helper function this function is created inside autil folder 
  // all the validations are performed in that field so code will look clean
    validateSignUpData(req);
  //we have write like this otherwise all the data will came  
    const  {firstName,lastName,emailId, password}=req.body;
  //encrypt the password
    const passwordHash=await bcrypt.hash(password,10);// 10 means salting
    console.log(passwordHash);

    const user=new User({firstName,lastName,emailId,password:passwordHash});
     await  user.save();
    res.send("data saved successfully");
    }
    
    catch(err)
    {
      res.status(400).send("ERROR:"+err.message);
    }
})
app.post('/login',async(req,res)=>
{
  try{
     const {emailId,password}=req.body;
     const user=await User.findOne({emailId:emailId});
     if(!user)
     {
      throw new Error('Invalid crediential');
     }

     const isPasswordValid=await bcrypt.compare(password,user.password);

     if(isPasswordValid){

      //create a JWT token first parameter that hides the id of the user
      // second is secret key
      const token=await jwt.sign({_id:user._id},"KAVYA@23");
      console.log(token);

      //add token to cookie and send response back to user
      res.cookie("token",token)
      res.send("Login succesful");
     }
    else{
      throw new Error("invalid creadiential");
    }
}
  catch(err){
    res.status(400).send("Error"+err.message);
  }
})
  
app.get('/profile',async (req,res)=>
{
  try{
  const cookies=req.cookies;

   const {token}=cookies;
   if(!token)
   {
    throw new Error('invalid token');
   }
    //validate cookies
   const decodedMessage=await jwt.verify(token,"KAVYA@23")
   const {_id}=decodedMessage;

   console.log("Logged in user is:"+_id);

   const user=await User.findById(_id);
   if(!user)
   {
    throw new Error("User not found");
   }

   res.send(user);
  }
  catch(err)
  {
    res.status(400).send('Error'+err.message);
  }
  
})

app.get('/user',async(req,res)=>{
   try
   {
     const user=await User.findOne({firstName:req.body.firstname});
     if(!user)
     {
      res.status(404).send('user is not fund')
     }else
     {
      res.send(user);
     }
   }
   catch(err)
   {
   console.log("Something went wrong");
   }
})

app.delete('/user',async(req,res)=>
{
  const userId=req.body.userId;
  
  try{
   const user= await User.findByIdAndDelete({userId});
    
      res.send("User deleted succesfully");
    
  }
  catch(err)
  {
    res.status(400).send("Something went wrong");
  }
})

app.patch('/user/:userId',async(req,res)=>
{

  const userId=req.params?.userId;
  const data=req.body;
  try{
    const ALLOWED_UPDATES=["about",'gender','age',"skill","photourl"];
    const isUpdateAllowed=Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed)
    {
      throw new Error('update not possible');
    }
    if(data?.skill.length>10)
    {
      throw new Error("Skill can't be more than 10");
    }
    const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:'after',runValidators:true});
    console.log(user);
res.send("User updated successfully");

  }catch(err)
  {
    res.status(400).send('Something went wrong'+err.message);
  }
});


connectDB()
.then(()=>{
  console.log("Database connected succesfully");
   app.listen(7777,()=>console.log("server is running on 7777 port"));
}
)
.catch(()=>
   console.log("Database is not connected")
 )







