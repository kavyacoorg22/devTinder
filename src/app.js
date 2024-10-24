const express=require("express");
const app=express();



app.use("/admin",(req,res,next)=>
{
  console.log("middleware is checked");
  const token="xyz";
  const isAuthorized=token==="xyz";
  if(!isAuthorized)
  {
    res.send("UnAuthorized");
  }
  else{
    next();
  }
});
  app.use("/admin/userdata",(req,res,next)=>
  {
    res.send("user data");
  })
    
app.use("/admin/deleteuser",(req,res,next)=>{
  res.send("user data deleted");
 
})
app.listen(7777,()=>console.log("server is running on 7777 port"))
