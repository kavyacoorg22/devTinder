const express=require("express");
const app=express();

app.use((req,res)=>
{
  res.send("hiii helloo sangeetha")
})

app.listen(7777,()=>console.log("server is running on 7777 port"))
