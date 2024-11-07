const express=require("express");
const connectDB=require('./config/database.js');
const User=require("./modules/user.js");
const app=express();

app.use(express.json());

app.post('/signup',async(req,res)=>{
  const user=new User(req.body);
    try{
   await  user.save();
    res.send("data saved successfully");
    }catch(err)
    {
      res.status(400).send("Something went wrong"+err.message);
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







